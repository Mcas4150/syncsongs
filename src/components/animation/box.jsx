import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
// import "../../Animate.css";

const Box = ({ points, operands, index, GenerateNewEquation }) => {
  const boxRef = useRef();
  const pointsRef = useRef(points);

  const [color, setColor] = useState(Math.random().toString(16).substr(-6));

  //   let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const POINTS_MULTIPLIER = 0.9;

  // GSAP Timeline
  var tl = gsap.timeline();

  //   const generateColor = () => {
  //     randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //     setColor(randomColor);
  //   };

  const boxColor = {
    backgroundColor: "#" + color,
  };

  useEffect(() => {
    tl.set(boxRef.current, {
      scale: 1,
    });
    tl.to(boxRef.current, {
      y: "60vh",
      scale: 0.7,
      duration: gsap.utils.random(3, 8),
      force3D: true,
      repeat: -1,

      onRepeat: () => {
        pointsRef.current = Math.floor(
          Math.max(pointsRef.current * POINTS_MULTIPLIER, 10)
        );
        // generateColor();

        // setColor(randomColor);
        // GenerateNewEquation(index);
      },
    });
  }, []);

  return (
    <BoxShape id="box" ref={boxRef} style={boxColor}>
      {operands.num1}+{operands.num2}
    </BoxShape>
  );
};

export default Box;

const BoxShape = styled.div`
  width: 150px;
  height: 150px;
  max-width: 15vw;
  max-height: 15vw;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  font-family: bubbleFont;
  color: black;
`;
