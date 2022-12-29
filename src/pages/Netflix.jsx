import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Netflix = () => {
  const [isScroll, setIsScroll] = useState(false);
  window.scroll = () => {
    setIsScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <NavBar isScroll={isScroll} />
    </Container>
  );
};
const Container = styled.div``;
export default Netflix;
