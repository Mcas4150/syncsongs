import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { gsap } from "gsap";

const Timer = ({ time, interval = 1000, onEnd, score }) => {
  const [internalTime, setInternalTime] = useState(time);
  const timerRef = useRef(time);
  const timeRef = useRef(time);
  const countdownRef = useRef();

  const countdownSeconds = internalTime / 1000;

  // GSAP Timeline
  var tl = gsap.timeline({});

  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd();
    }
  }, [internalTime, onEnd]);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setInternalTime((timeRef.current -= interval));
    }, interval);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [interval]);

  useEffect(() => {
    setInternalTime((timeRef.current += 2000));
  }, [score]);

  useEffect(() => {
    tl.to(countdownRef.current, {
      scale: 1.2,
      duration: 0.25,
      yoyo: 1,
      repeat: -1,
    });
  }, [countdownSeconds]);

  return <CountDown ref={countdownRef}>{countdownSeconds}</CountDown>;
};

export default Timer;

const CountDown = styled.div`
  font-size: 20px;
  margin: 15px;
`;
