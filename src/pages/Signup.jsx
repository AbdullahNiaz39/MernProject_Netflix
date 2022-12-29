import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setformValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  ///HandleChange using set values
  const handleChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
    console.log(formValue);
  };

  //Store Data in firebase
  const handleSignUp = async () => {
    try {
      const { email, password } = formValue;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            {/* <input type="email"></input>
            <input type="password"></input> */}
            <TextField
              type="email"
              label="Email"
              variant="filled"
              name="email"
              required
              onChange={handleChange}
              value={formValue.email}
              style={{ backgroundColor: "white", marginBottom: "5px" }}
            />
            {showPassword && (
              <TextField
                type="password"
                label="Password"
                variant="filled"
                name="password"
                required
                onChange={handleChange}
                value={formValue.password}
                style={{ backgroundColor: "white", marginBottom: "5px" }}
              />
            )}
            {!showPassword && (
              <Button
                variant="contained"
                size="large"
                onClick={() => setShowPassword(true)}
              >
                Get Started
              </Button>
            )}
          </div>

          <Button variant="contained" size="large" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 1.3rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        width: 30%;
        TextField {
          color: black;
          border: none;
          padding: 1rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
