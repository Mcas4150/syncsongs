import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
// import "../../Animate.css";

const Box = ({ points, operands, index }) => {
  const boxRef = useRef();
  const pointsRef = useRef(points);
  const durationRef = useRef(Math.random() * 6 + 2);

  const [color, setColor] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const POINTS_MULTIPLIER = 0.9;

  // GSAP Timeline
  var tl = gsap.timeline({ repeat: 2 });

  const generateColor = () => {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  //

  const boxColor = {
    backgroundColor: "#" + color,
  };

  useEffect(() => {
    tl.set(boxRef.current, {
      y: -400,
      scale: 1,
    });
    tl.to(boxRef.current, {
      y: 0,
      scale: 0.7,
      duration: gsap.utils.random(2, 6),
      //   opacity: 0,
      repeat: -1,

      onRepeat: () => {
        pointsRef.current = Math.floor(
          Math.max(pointsRef.current * POINTS_MULTIPLIER, 10)
        );
        // generateColor();

        // setColor(randomColor);
        // GenerateNewEquation();
      },
    });
  }, []);

  return (
    <div className="box " ref={boxRef} style={boxColor}>
      {/* {operands.num1}
      +{operands.num2} */}
      {index}
    </div>
  );
};

export default Box;
