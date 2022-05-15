import React, { useState, useEffect, useRef } from "react";
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
  const [score, setScore] = useState(0);
  const [operands, setOperands] = useState({ num1: 1, num2: 1 });
  const [freqSubmit, setFreqSubmit] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(2);
  const [counter, setCounter] = useState(60);
  const boxRef = useRef();
  const keyRef = useRef(0);

  var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });

  const handleKeyboardInput = (e) => {
    if (e.key === "Enter") {
      setFreqSubmit(keyRef.current.value);
      document.getElementById("inputField").value = "";
    }
  };

  const onAnswer = (points) => setScore(score + points);
  // const [correctAnswer, setCorrectAnswer] = useState(getCorrectAnswer(props.operation,operands.num1,operands.num2));

  const generateNewEquation = () => {
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
    setCounter(counter + 5);
    generateNewEquation();
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
          // generateNewEquation();
        },
      });
      // return () => {
      //   boxRef.current.kill();
      // };
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
            {/* <div className="boxx">box: {boxProblem}</div> */}
            <div className="boxx">answer: {correctAnswer}</div>
            <div className="boxx">score: {score}</div>
            <div className="boxx">freqsubmit: {freqSubmit}</div>{" "}
            <Timer time={TIME_LIMIT} onEnd={() => setPlaying(false)} />
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
      )}{" "}
      {!playing && <h1>Math Game</h1>}
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default GameOne;
