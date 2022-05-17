import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import Keyboard from "./keyboard";
import Box from "../animation/box";
import Score from "../animation/Score";
import Timer from "../animation/Timer";

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
  const [solutionSubmit, setSolutionSubmit] = useState(0);

  const ColorString = (word) => {};

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

  return (
    <GameContainer>
      {playing && (
        <React.Fragment>
          <PlayContainer id="boxContainer">
            {boxes.map(({ speed, points }, index) => (
              <Box
                operation={operation}
                maxNumber={maxNumber}
                key={index}
                points={points}
                speed={speed}
                solutionSubmit={solutionSubmit}
                score={score}
                setScore={setScore}
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
          <Button className="button" onClick={startGame}>
            <span className="buttonspan">Start</span>
          </Button>
        </Menu>
      )}
      {finished && (
        <Menu>
          <Title>Final Score: {score}</Title>
          <Button className="button" onClick={startGame}>
            <span className="buttonspan">Replay</span>
          </Button>

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

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
  font-size: 25px;
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
