import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const NavBar = ({ isScroll }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  ///Logout functionality
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
  }

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const links = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/movies" },
    { name: "TV Shows", link: "/tvShows" },
    { name: "My List", link: "/myList" },
  ];

  return (
    <Container>
      <nav className={`${isScroll ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>

          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <NavLink to={link}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => {
                setInputHover(true);
              }}
              onMouseLeave={() => {
                setInputHover(false);
              }}
              onBlur={() => {
                setInputHover(false);
                setShowSearch(false);
              }}
            ></input>
          </div>
          <button onClick={onLogout}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }

  @media (max-width: 600px) {
    nav {
      height: 4.5rem;
      padding: 0 2rem;
      .left {
        gap: 0.1rem;
        .brand {
          img {
            height: 2.1rem;
          }
        }
        .links {
          gap: 1rem;
        }
      }
      .right {
        gap: 0.5rem;
        
        svg {
          font-size: 1rem;
        }
        .search {
          button svg {
            font-size: 1rem;
          }
          input {
            font-size: 0.8rem;
          }
        }
      }
    }
`;
export default NavBar;
