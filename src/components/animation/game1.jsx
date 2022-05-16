import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import { gsap } from "gsap";
import {
  checkAnswers,
  getRandNumbers,
  getCorrectAnswer,
} from "../../helpers/gameplay";
import Keyboard from "../game/keyboard";
import Box from "./box";
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
  const [freqSubmit, setFreqSubmit] = useState(0);

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

  const GenerateNewEquation = ({ answerIndex }) => {
    //new operands at index
    console.dir("og operands:" + operandsArray);
    let newRandNums = getRandNumbers(operation, 0, maxNumber);
    const newOperands = [...operandsArray];
    newOperands[answerIndex] = newRandNums;
    setOperandsArray(newOperands);
    console.table("new randNums:" + JSON.stringify(newRandNums));
    console.table("new operands:" + JSON.stringify(operandsArray));

    // new answer at index
    console.table("og answers:" + correctAnswers);
    let newCorrectAnswer = getCorrectAnswer(
      operation,
      newRandNums.num1,
      newRandNums.num2
    );
    const newCorrentAnswers = [...correctAnswers];
    newCorrentAnswers[answerIndex] = newCorrectAnswer;
    setCorrectAnswers(newCorrentAnswers);
    console.table("new correctAnswer:" + JSON.stringify(newCorrectAnswer));
    console.table("new answers:" + correctAnswers);
  };

  useEffect(() => {
    let answerIndex = checkAnswers(freqSubmit, correctAnswers);
    if (answerIndex !== "incorrect") {
      console.log(answerIndex);
      GenerateNewEquation(answerIndex);
      setScore(score + 1);
    }
  }, [freqSubmit]);

  return (
    <div className="GameOne">
      {playing && (
        <React.Fragment>
          <div className="boxContainer">
            {boxes.map(({ speed, points }, index) => (
              <Box
                key={index}
                index={index}
                points={points}
                speed={speed}
                operands={operandsArray[index]}
              />
            ))}
          </div>

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
