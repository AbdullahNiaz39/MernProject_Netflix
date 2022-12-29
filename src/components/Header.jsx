import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Header = (props) => {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" style={{ marginTop: "10px" }} />
      </div>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => navigate(props.login ? "/login" : "/signup")}
      >
        {props.login ? "Log in" : "Sign up"}
      </Button>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 4.4rem;
      margin-top: "10px";
    }
  }
  Button {
    padding: 0.3rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1rem;
  }
`;

export default Header;
