// import { BiChevronDown } from "react-icons/bi";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeLikedMovies } from "../features/netflixSlice";
// const Card = ({ movieData, isLiked = false }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [video, setVideo] = useState('');
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTrailer();
//   }, []);

//   const fetchTrailer = async () => {
//     try {
//       const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=YOUR_API_KEY`);
//       setVideo(`https://www.youtube.com/watch?v=${res.data.results[0].key}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   ///handlPlay
//   const handlePlay = () => {
//     navigate("/player");
//   };

//   const addToList = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/liked",

//         {
//           data: movieData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       toast.success(res.data.message);
//     } catch (err) {
//       const message =
//         (err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         err.toString();
//       toast.error(message);
//     }
//   };
//   return (
//     <Container
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
//         alt="movie"
//       />
//       {isHovered && (
//         <div className="hover">
//           <div className="image-video-container">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
//               alt="movie"
//               onClick={handlePlay}
//             />
//             <video src={video} autoPlay loop muted onClick={handlePlay} />
//           </div>
//           <div className="info-container flex column">
