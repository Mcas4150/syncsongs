import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import NumberButton from "./NumberButton";
import {
  checkAnswer,
  getRandNumbers,
  getCorrectAnswer,
} from "../../helpers/gameplay";
import Counter from "./Counter";
import Timer from "./Timer";
import "../../Animate.css";
import { Tween } from "gsap/gsap-core";

const GameOne = () => {
  //   const [count, setCount] = useState(1);

  const TIME_LIMIT = 30000;
  const POINTS_MULTIPLIER = 0.9;
  const AnswerPoints = 25;
  const operation = "+";
  const maxNumber = 25;
  let newRandNums = getRandNumbers(operation, 0, maxNumber);

  const [boxProblem, setBoxProblem] = useState(
    Math.floor(Math.random() * 90) + 10
  );

  const [playing, setPlaying] = useState(false);

  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [operands, setOperands] = useState({ num1: 1, num2: 1 });
  const [keyEntry, setKeyEntry] = useState("");
  const [freqSubmit, setFreqSubmit] = useState(0);
  const [newCount, setNewCount] = useState(0);

  // const [correctAnswer, setCorrectAnswer] = useState((getCorrectAnswer(operation,newRandNums.num1,newRandNums.num2)));
  const [correctAnswer, setCorrectAnswer] = useState(2);
  const [equation, setEquation] = useState([]);
  const [xposition, setXposition] = useState(0);
  const [solution, setSolution] = useState(
    checkAnswer(keyEntry, correctAnswer)
  );

  const [counter, setCounter] = useState(60);
  const boxRef = useRef();

  const keyRef = useRef(0);

  const containerRef = useRef();
  const q = gsap.utils.selector(containerRef);

  var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });

  // const [keyEntry, setKeyEntry] = useState("");
  // const [freqSubmit, setFreqSubmit] = useState("");

  // initialize state for OscillatorNodes

  const handleKeyboardInput = (e) => {
    console.log(e.target.value);
    console.log(keyRef.current.value);
    console.log(e.key);
    if (e.key === "Enter") {
      console.log("Enter");
      setFreqSubmit(keyRef.current.value);
      document.getElementById("inputField").value = "";
    }
    // else if (e.key === "Backspace") {
    //   // setKeyEntry(keyEntry.slice(0, -1));
    // } else if (isFinite(e.key)) {
    //   // setKeyEntry(keyEntry.concat(e.key));
    // }
  };
  // useEffect(() => {
  //   gsap.to(boxRef.current, {
  //     x: +5,
  //   });
  //   // const animation1 = gsap.to(q(".box"), {
  //   //   y: 5,
  //   // rotation: "+=360",
  //   // });

  //   // return () => {
  //   //   animation1.kill();
  //   // };
  // }, [counter]);
  // let newCorrectAnswer = getCorrectAnswer(operation,newRandNums.num1,newRandNums.num2);

  const onAnswer = (points) => setScore(score + points);
  // const [correctAnswer, setCorrectAnswer] = useState(getCorrectAnswer(props.operation,operands.num1,operands.num2));

  // let displayAnswer = checkAnswer(input, correctAnswer);

  let displayAnswer = checkAnswer(freqSubmit, correctAnswer);

  if (displayAnswer === "correct") {
    setInput("");
    //setUserAnswer('');
    setScore(score + 1);
    setCounter(counter + 5);

    let newRandNums = getRandNumbers(operation, 0, maxNumber);

    setOperands(newRandNums);

    // setOperands(newRandNums);

    let newCorrectAnswer = getCorrectAnswer(
      operation,
      newRandNums.num1,
      newRandNums.num2
    );

    setCorrectAnswer(newCorrectAnswer);
  }

  function Box({ points }) {
    // const boxRef = useRef();
    const pointsRef = useRef(points);
    // run when `endX` changes
    useEffect(() => {
      // let moveRightTween = gsap.to(boxRef.current, {
      //   x: 100,
      //   duration: 10,
      // });
      // setXposition(xposition + 25);
      tl.set(boxRef.current, {
        // yPercent: 100,
        scale: 0.1,
      });
      tl.to(boxRef.current, {
        // yPercent: 0,
        scale: 1.25,
        duration: 3,
        yoyo: true,
        repeat: -1,
        onRepeat: () => {
          pointsRef.current = Math.floor(
            Math.max(pointsRef.current * POINTS_MULTIPLIER, 10)
          );
        },
      });
      // return () => {
      //   boxRef.current.kill();
      // };
      // tl.to(boxRef.current, { x: 75, duration: 0.25 });

      // setXposition(xposition + 5);
      // let newX = xposition;
      // moveRightTween.progress(0.1);
      // gsap.to(boxRef.current, {
      //   x: 300,
      // });
    }, []);

    useEffect(() => {
      // moveRightTween.play();
    }, []);

    return (
      <div className="box color-maroon" ref={boxRef}>
        {operands.num1}
        {operation}
        {operands.num2}
      </div>
    );
  }

  //   if (e.key === "Enter") {
  //       // setFreqSubmit(keyEntry);
  //       // const freq = parseInt(freqSubmit);

  //     setKeyEntry("");
  //     document.getElementById("inputField").value = "";
  //   } else if (e.key === "Backspace") {
  //     setKeyEntry(keyEntry.slice(0, -1));
  //   } else {
  //     setKeyEntry(keyEntry.concat(e.key));
  //   }
  //   // else if (isFinite(e.key)) {
  //   //   setKeyEntry(keyEntry.concat(e.key));
  //   // }
  //   setSolution(checkAnswer(keyEntry, correctAnswer));
  //   checkSolution();
  // };

  // // initialize game on pageLoad
  // //   useEffect(() => {
  // //     setBoxProblem(Math.floor(Math.random() * 90) + 10);
  // //   }, []);

  // useEffect(() => {
  //   //   setBoxProblem(Math.floor(Math.random() * 90) + 10);

  //   // checkSolution();
  // }, [keyEntry]);

  // const checkSolution = () => {

  // //  let displayAnswer = checkAnswer(keyEntry, correctAnswer);

  //   if(solution==="correct"){
  //   setKeyEntry("");
  //   setScore(score+1);

  //   let newRandNums = getRandNumbers(operation,0, maxNumber)

  //   let newCorrectAnswer = getCorrectAnswer(operation, newRandNums.num1,newRandNums.num2);

  //   setCorrectAnswer(newCorrectAnswer);
  // }
  // };

  // const updateScore = () => {};
  // useEffect(() => {
  //   // gsap.to(boxRef.current, { duration: 1, y: 15 });
  // });

  //

  //numbers

  return (
    <div className="GameOne">
      {!playing && <h1>Math Game</h1>}
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Stop" : "Start"}
      </button>
      {playing && (
        <React.Fragment>
          <Box points={AnswerPoints} onAnswer={onAnswer} />

          <div className="boxContainer">
            {/* <div className="boxx">box: {boxProblem}</div> */}
            <div className="boxx">solution: {solution}</div>
            <div className="boxx">solution: {xposition}</div>
            <div className="boxx">input: {input}</div>
            {/* <div className="boxx">box: </div> */}
            <div className="boxx">answer: {correctAnswer}</div>
            <div className="boxx">score: {score}</div>
            {/* <div className="boxx">keyEntry: {keyEntry}</div> */}
            <div className="boxx">keyRef: {keyRef.current.value}</div>
            <div className="boxx">freqsubmit: {freqSubmit}</div>{" "}
            {/* <div>Countdown: {counter}</div>
            <div className="boxx">newcount: {newCount}</div> */}
            <Timer time={TIME_LIMIT} onEnd={() => setPlaying(false)} />
          </div>

          <div className="Keyboard">
            <input
              type="text"
              id="inputField"
              ref={keyRef}
              // onKeyDown={(e) => setKeyEntry(keyEntry.concat(e.key))}
              onKeyDown={handleKeyboardInput}
            />
            {/* <button onClick={handleKeyboardInput} /> */}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default GameOne;
