import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import {
  checkAnswers,
  getRandNumbers,
  getCorrectAnswer,
} from "../../helpers/gameplay";
import { gsap } from "gsap";
// import "../../Animate.css";

const Box = ({
  operation,
  maxNumber,
  points,
  solutionSubmit,
  score,
  setScore,
}) => {
  const boxRef = useRef();
  const animRef = useRef(null);
  const pointsRef = useRef(points);

  const [color, setColor] = useState(Math.random().toString(16).substr(-6));
  const [operands, setOperands] = useState([{ num1: 1, num2: 1 }]);
  const [correctAnswer, setCorrectAnswer] = useState(2);
  const [solved, setSolved] = useState(false);

  const POINTS_MULTIPLIER = 0.9;

  // GSAP Timeline
  var tl = gsap.timeline();

  const generateColor = () => {
    let randomColor = Math.random().toString(16).substr(-6);
    setColor(randomColor);
  };

  const boxColor = {
    backgroundColor: "#" + color,
  };

  useEffect(() => {
    GenerateNewEquation();
  }, []);

  useEffect(() => {
    if (parseInt(solutionSubmit) === correctAnswer) {
      setScore(score + 1);

      setSolved(true);
    }
  }, [solutionSubmit]);

  useEffect(() => {
    if (solved) {
      animRef.current.pause();
      gsap.to(boxRef.current, {
        y: "0vh",
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 2), () => {
            generateColor();
            GenerateNewEquation();
            setSolved(false);
            animRef.current
              .restart()
              .timeScale(animRef.current.timeScale() * 1.25);
          });
        },
      });
    }
  }, [solved]);

  const GenerateNewEquation = () => {
    let newRandNums = getRandNumbers(operation, 0, maxNumber);
    setOperands(newRandNums);
    let newCorrectAnswer = getCorrectAnswer(
      operation,
      newRandNums.num1,
      newRandNums.num2
    );
    setCorrectAnswer(newCorrectAnswer);
  };

  useEffect(() => {
    animRef.current = tl.set(boxRef.current, {
      opacity: 1,
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
