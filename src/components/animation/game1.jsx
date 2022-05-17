import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import {
  checkAnswers,
  getRandNumbers,
  getCorrectAnswer,
} from "../../helpers/gameplay";
import Keyboard from "../game/keyboard";
import Box from "./box";
import Score from "./Score";
import Timer from "./Timer";
import "../../Animate.css";

const generateBoxes = (amount) =>
  new Array(amount).fill().map(() => ({
    speed: gsap.utils.random(2, 6),
    points: 100,
  }));

const GameOne = () => {
  const TIME_LIMIT = 30000;

  // const AnswerPoints = 25;
  const operation = "+";
  const maxNumber = 25;

  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [boxes, setBoxes] = useState(generateBoxes(5));
  const [operandsArray, setOperandsArray] = useState([
    { num1: 1, num2: 1 },
    { num1: 2, num2: 3 },
    { num1: 4, num2: 5 },
    { num1: 2, num2: 4 },
    { num1: 8, num2: 3 },
  ]);
  const [correctAnswers, setCorrectAnswers] = useState([2, 5, 9, 6, 11]);
  const [solutionSubmit, setSolutionSubmit] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(-1);

  //

  const startGame = () => {
    setScore(0);
    setBoxes(generateBoxes(5));
    setPlaying(true);
    setFinished(false);
  };

  const endGame = () => {
    setPlaying(false);
    setFinished(true);
  };

  // const onAnswer = (points) => setScore(score + points);

  const GenerateNewEquation = (newIndex) => {
    //new operands at index
    console.dir("og operands:" + operandsArray);

    let newRandNums = getRandNumbers(operation, 0, maxNumber);

    const newOperands = operandsArray.map((item, index) => {
      if (index === newIndex) {
        const updatedOperand = {
          ...item,
          num1: newRandNums.num1,
          num2: newRandNums.num2,
        };
        return updatedOperand;
      }
      return item;
    });

    console.table("new operands:" + JSON.stringify(newOperands));
    setOperandsArray(newOperands);

    // new answer at index
    console.table("og answers:" + correctAnswers);

    let newCorrectAnswer = getCorrectAnswer(
      operation,
      newRandNums.num1,
      newRandNums.num2
    );
    console.table("new correctAnswer:" + JSON.stringify(newCorrectAnswer));

    const newCorrectAnswers = correctAnswers.map((item, index) => {
      if (index === newIndex) {
        const updatedAnswer = newCorrectAnswer;
        return updatedAnswer;
      }
      return item;
    });

    console.table("new correctAnswers:" + JSON.stringify(newCorrectAnswers));
    setCorrectAnswers(newCorrectAnswers);
  };

  useEffect(() => {
    let answerIndex = checkAnswers(solutionSubmit, correctAnswers);
    if (answerIndex !== "incorrect") {
      console.dir("answerIndex1:" + answerIndex);
      GenerateNewEquation(answerIndex);
      setScore(score + 1);
    }
  }, [solutionSubmit]);

  return (
    <GameContainer>
      {playing && (
        <React.Fragment>
          <PlayContainer id="boxContainer">
            {boxes.map(({ speed, points }, index) => (
              <Box
                key={index}
                index={index}
                points={points}
                speed={speed}
                operands={operandsArray[index]}
                GenerateNewEquation={GenerateNewEquation}
                solutionSubmit={solutionSubmit}
              />
            ))}
          </PlayContainer>
          <ControlsContainer>
            {" "}
            <Timer time={TIME_LIMIT} onEnd={endGame} score={score} />
            <Keyboard setSolutionSubmit={setSolutionSubmit} />
            <Score score={score} />
          </ControlsContainer>
        </React.Fragment>
      )}
      {!playing && !finished && (
        <Menu>
          <Title>Math Game</Title>
          <Button onClick={startGame}>Start Game</Button>
        </Menu>
      )}
      {finished && (
        <Menu>
          <Title>Final Score: {score}</Title>
          <Button onClick={startGame}>Play Again</Button>

          <Credits>
            Credits:{" "}
            <Link href={"https://github.com/Mcas4150"}>Mike Cassidy</Link>
          </Credits>
        </Menu>
      )}
    </GameContainer>
  );
};

export default GameOne;

const Menu = styled.div``;

const Title = styled.div`
  font-size: 100px;
  font-family: bubbleFont;
`;

const Button = styled.button`
  margin: 25px;
`;

const Data = styled.div`
  margin: 0 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Credits = styled.div`
  margin: 25px;
  font-style: italic;
`;

const Link = styled.a`
  text-decoration: none;
  color: purple;
`;

const GameContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80vh;
`;

const ControlsContainer = styled.div`
  height: 20vh;
`;
