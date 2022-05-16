import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import {
  checkAnswer,
  getRandNumbers,
  getCorrectAnswer,
} from "../../helpers/gameplay";
import Timer from "./Timer";
import "../../Animate.css";

const GameOne = () => {
  const TIME_LIMIT = 30000;
  const POINTS_MULTIPLIER = 0.9;
  const AnswerPoints = 25;
  const operation = "+";
  const maxNumber = 25;

  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [operands, setOperands] = useState({ num1: 1, num2: 1 });
  const [freqSubmit, setFreqSubmit] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(2);
  const boxRef = useRef();
  const keyRef = useRef(0);

  // GSAP Timeline
  var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });

  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
    keyRef.current.focus();
  };

  const endGame = () => {
    setPlaying(false);
    setFinished(true);
  };

  const handleKeyboardInput = (e) => {
    if (e.key === "Enter") {
      setFreqSubmit(keyRef.current.value);
      document.getElementById("inputField").value = "";
    }
  };

  const onAnswer = (points) => setScore(score + points);

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

  function Box({ points }) {
    // const boxRef = useRef();
    const pointsRef = useRef(points);
    useEffect(() => {
      tl.set(boxRef.current, {
        y: -200,
        // yPercent: 100,
        scale: 1,
      });
      tl.to(boxRef.current, {
        y: 0,
        // yPercent: 0,
        scale: 0.8,
        duration: 3,
        // yoyo: true,
        repeat: -1,

        onRepeat: () => {
          pointsRef.current = Math.floor(
            Math.max(pointsRef.current * POINTS_MULTIPLIER, 10)
          );
          //GenerateNewEquation();
        },
      });
    }, []);

    return (
      <div className="box color-maroon" ref={boxRef}>
        {operands.num1}
        {operation}
        {operands.num2}
      </div>
    );
  }

  return (
    <div className="GameOne">
      {playing && (
        <React.Fragment>
          <Box points={AnswerPoints} onAnswer={onAnswer} />
          <div className="boxContainer">
            <div className="boxx">answer: {correctAnswer}</div>
            <div className="boxx">score: {score}</div>
            <Timer time={TIME_LIMIT} onEnd={endGame} score={score} />
          </div>
          <div className="Keyboard">
            <input
              type="text"
              id="inputField"
              ref={keyRef}
              onKeyDown={handleKeyboardInput}
            />
          </div>
        </React.Fragment>
      )}
      {!playing && !finished && (
        <React.Fragment>
          <h1>Math Game</h1>
          <button onClick={startGame}>Start Game</button>
        </React.Fragment>
      )}
      {finished && <button onClick={startGame}>Play Again</button>}
    </div>
  );
};

export default GameOne;
