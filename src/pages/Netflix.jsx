import React, { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../features/netflixSlice/index";
import Slider from "../components/Slider";

const Netflix = () => {
  // for Scrolling
  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To get Genres
  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
    // eslint-disable-next-line
  }, [genresLoaded]);

  //scroll for background
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <NavBar isScroll={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="backGround"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex a-center j-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
};
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: -10px;
      .logo {
        img {
          width: 83%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    .hero {
      img {
        height: 50vh;
      }
      .container {
        .logo {
          img {
            margin: 2rem;
            width: 50%;
          }
        }
        .buttons {
          margin: 2rem;
          button {
            font-size: 1.2rem;
            padding: 0.2rem 0.5rem;
            padding-left: 1.5rem;
            padding-right: 1.8rem;
            svg {
              font-size: 1.6rem;
            }
          }
        }
      }
    }
  }
  @media (max-width: 400px) {
    .hero .container .buttons button {
      font-size: 1rem;
      padding: 0.1rem 0.3rem;
      padding-left: 1rem;
      padding-right: 1.2rem;
      svg {
        font-size: 1.4rem;
      }
    }
  }
`;
export default Netflix;
