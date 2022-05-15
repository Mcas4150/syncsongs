import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import "../../Animate.css";
import AnimateOne from "./animateOne.jsx";

const AnimationMain = () => {
  const [count, setCount] = useState(1);
  const boxRef = useRef();
  const containerRef = useRef();
  const q = gsap.utils.selector(containerRef);

  useEffect(() => {
    // gsap.to(boxRef.current, {
    //   duration: 3,
    //   y: -100,
    //   // rotation: "+=360",
    // });
    const animation1 = gsap.to(q(".box"), {
      y: -100,
      // rotation: "+=360",
    });

    return () => {
      animation1.kill();
    };
  }, [count]);

  // useEffect(() => {
  //   // gsap.to(boxRef.current, { duration: 1, y: 15 });
  // });

  return (
    <div className="AnimationMain" ref={containerRef}>
      <div className="waterfallContainer">
        <div className="box color-brown" ref={boxRef}>
          x 2
        </div>
        <div className="box color-maroon" ref={boxRef}>
          x 3
        </div>
        <div className="box color-blue" ref={boxRef}>
          x 4
        </div>
        <div className="box color-green" ref={boxRef}>
          x 5
        </div>
      </div>
      {count}
      <button
        style={{ width: "25px", height: "15px" }}
        onClick={() => {
          setCount(count + 1);
        }}
      />
      {/* <AnimateOne size="200" repeat="2" color="#578266" /> */}
    </div>
  );
};

export default AnimationMain;

// const WaterfallContainer
