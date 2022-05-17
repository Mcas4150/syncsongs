import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";

const Score = ({ score }) => {
  const scoreRef = useRef();

  return <ScoreBox ref={scoreRef}>score: {score}</ScoreBox>;
};
export default Score;

const ScoreBox = styled.div`
  margin: 15px;
  font-size: 25px;
`;
