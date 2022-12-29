import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formValue, setformValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  ///HandleChange using set values
  const handleChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //Store Data in firebase
  const handleLogIn = async () => {
    try {
      const { email, password } = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>

            <div className="container flex column">
              <TextField
                type="email"
                label="Email Address"
                variant="filled"
                name="email"
                className="txtField"
                required
                onChange={handleChange}
                value={formValue.email}
                style={{ backgroundColor: "white", marginBottom: "5px" }}
              />

              <TextField
                type="password"
                label="Password"
                variant="filled"
                name="password"
                required
                className="txtField"
                onChange={handleChange}
                value={formValue.password}
                style={{ backgroundColor: "white", marginBottom: "5px" }}
              />

              <Button variant="contained" size="large" onClick={handleLogIn}>
                Log In
              </Button>
            </div>
          </div>
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
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 30vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          .txtField {
            width: 17rem;
            color: white;
          }
          Button {
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
    }
  }
`;

export default Login;
