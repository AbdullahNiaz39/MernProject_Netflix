import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

import { getUserLikedMovies } from "../features/netflixSlice";

const MyList = () => {
  // for Scrolling
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //To get Genres
  useEffect(() => {
    if (user) {
      dispatch(getUserLikedMovies(user));
    }
    // eslint-disable-next-line
  }, []);

  //scroll for background
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <NavBar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>MyList</h1>
        <div className="grid flex">
          {movies != "" ? (
            movies.map((movie, index) => (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            ))
          ) : (
            <h2>No Moive in your Playlist</h2>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    h2 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
export default MyList;
