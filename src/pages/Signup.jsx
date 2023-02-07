import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

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
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters or longer")
      .required("Password is required"),
  });

  //Store Data in firebase
  const handleSignUp = async (values) => {
    const userData = values;
    dispatch(register(userData));
  };

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
          <Formik
            initialValues={{ email: "", password: "", name: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSignUp(values)}
          >
            {({ errors, touched, isValidating }) => (
              <Form className="form">
                <Field
                  as={TextField}
                  type="email"
                  label="Email"
                  variant="filled"
                  name="email"
                  required
                  error={errors.email && touched.email}
                  helperText={errors.email}
                  style={{ backgroundColor: "white", marginBottom: "5px" }}
                />
                {showPassword && (
                  <>
                    <Field
                      as={TextField}
                      type="password"
                      label="Password"
                      variant="filled"
                      name="password"
                      required
                      error={errors.password && touched.password}
                      helperText={errors.password}
                      style={{
                        backgroundColor: "white",
                        marginBottom: "5px",
                      }}
                    />
                    <Field
                      as={TextField}
                      type="text"
                      label="Name"
                      variant="filled"
                      name="name"
                      required
                      error={errors.name && touched.name}
                      helperText={errors.name}
                      style={{
                        backgroundColor: "white",
                        marginBottom: "5px",
                      }}
                    />
                  </>
                )}
                {!showPassword && (
                  <Button
                    variant="contained"
                    size="large"
                    className="btn-started"
                    onClick={() => setShowPassword(true)}
                  >
                    Get Started
                  </Button>
                )}

                <Button
                  variant="contained"
                  size="large"
                  className="btn-signup"
                  disabled={isValidating}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
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
          @media (max-width: 950px) {
            padding: 1rem;
            text-align: center;
          }
        }
      }
      .form {
        display: grid;
        width: 20%;
        @media (max-width: 950px) {
          width: 40%;
          margin: 0 auto;
        }
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
        .btn-started {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          margin-bottom: 5px;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
        .btn-signup {
          padding: 0.3rem 1rem;
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
`;

export default Signup;
