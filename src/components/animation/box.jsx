import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
// import "../../Animate.css";

const Box = ({ points, operands, tl }) => {
  const boxRef = useRef();
  const pointsRef = useRef(points);
  const durationRef = useRef(Math.random() * 4 + 1);

  const POINTS_MULTIPLIER = 0.9;

  useEffect(() => {});

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
      duration: Math.random() * 4 + 1,
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
      {/* {operation} */}+{operands.num2}
    </div>
  );
};

export default Box;
