import React from "react";
import styled from "styled-components";
import background from "../assets/login.jpg";
const BackgroundImage = () => {
  return (
    <Container>
      <img src={background} alt="" />
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
  @media (max-width: 768px) {
    height: 100vh;
    img {
      height: 100vh;
      width: 100%;
    }
  }
`;
export default BackgroundImage;
