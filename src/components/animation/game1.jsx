import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import {
  checkAnswer,
  getRandNumbers,
  getCorrectAnswer,
} from "../../helpers/gameplay";
import Keyboard from "../game/keyboard";
import Box from "./box";
import Timer from "./Timer";
import "../../Animate.css";

const GameOne = () => {
  const TIME_LIMIT = 30000;

  const AnswerPoints = 25;
  const operation = "+";
  const maxNumber = 25;

  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [operands, setOperands] = useState({ num1: 1, num2: 1 });
  const [freqSubmit, setFreqSubmit] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(2);

  // GSAP Timeline
  var tl = gsap.timeline({ repeat: 2 });

  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
  };

  const endGame = () => {
    setPlaying(false);
    setFinished(true);
  };

  // const onAnswer = (points) => setScore(score + points);

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

  let displayAnswer = checkAnswer(freqSubmit, correctAnswer);

  if (displayAnswer === "correct") {
    setScore(score + 1);
    GenerateNewEquation();
  }

  return (
    <div className="GameOne">
      {playing && (
        <React.Fragment>
          <div className="boxContainer">
            <Box points={AnswerPoints} operands={operands} tl={tl} />
            <Box points={AnswerPoints} operands={operands} tl={tl} />
            <Box points={AnswerPoints} operands={operands} tl={tl} />
            <Box points={AnswerPoints} operands={operands} tl={tl} />
          </div>
          <div className="boxx">answer: {correctAnswer}</div>
          <div className="boxx">score: {score}</div>
          <Timer time={TIME_LIMIT} onEnd={endGame} score={score} />

          <Keyboard setFreqSubmit={setFreqSubmit} />
        </React.Fragment>
      )}
      {!playing && !finished && (
        <React.Fragment>
          <h1>Math Game</h1>
          <button onClick={startGame}>Start Game</button>
        </React.Fragment>
      )}
      {finished && (
        <React.Fragment>
          <h1>Final Score: {score}</h1>
          <button onClick={startGame}>Play Again</button>
        </React.Fragment>
      )}
    </div>
  );
};

export default GameOne;
