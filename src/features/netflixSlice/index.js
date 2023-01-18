import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_KEY, TMBD_BASE_URL } from "../../utils/constants";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

///get Genres
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

//fetch movie
/// we get movie through genres if gernes id matches then we get movies names and image(backdrop_path bosster) is avialable they show
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name
          ? movie?.original_name
          : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

//first call this Method
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

//first call this Genres Method
export const fetchDataByGenres = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

//Get liked Movies Method
export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (user) => {
    try {
      const {
        data: { movies },
      } = await axios.get("http://localhost:5000/api/users/liked", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return movies;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      toast.error(message);
    }
  }
);

//Get liked Movies Method
export const removeLikedMovies = createAsyncThunk(
  "netflix/removeLiked",
  async ({ user, movieId }) => {
    try {
      const {
        data: { movies, message },
      } = await axios.put(
        "http://localhost:5000/api/users/liked",
        {
          movieId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(message);
      return movies;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      toast.error(message);
    }
  }
);

///Store Functionality using createSlice
export const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenres.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export default NetflixSlice.reducer;
