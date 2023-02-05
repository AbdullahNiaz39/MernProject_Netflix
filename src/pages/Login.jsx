import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  //Redux
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  /// Formik Validation ///
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  //login using Email
  const handleLogIn = async (values) => {
    const userData = values;
    dispatch(login(userData));
  };

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
            {/*  formik Valdiation */}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogIn(values)}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <div className="container flex column">
                    <Field
                      type="email"
                      label="Email Address"
                      variant="filled"
                      name="email"
                      className="txtField"
                      required
                      as={TextField}
                      error={errors.email && touched.email}
                      helperText={errors.email}
                      style={{ backgroundColor: "white", marginBottom: "5px" }}
                    />

                    <Field
                      type="password"
                      label="Password"
                      variant="filled"
                      name="password"
                      required
                      className="txtField"
                      as={TextField}
                      error={errors.password && touched.password}
                      helperText={errors.password}
                      style={{ backgroundColor: "white", marginBottom: "5px" }}
                    />

                    <Button
                      variant="contained"
                      size="medium"
                      type="submit"
                      disabled={isValidating}
                    >
                      Log In
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
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
