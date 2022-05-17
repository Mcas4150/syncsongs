import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";

const TitleText = ({ text }) => {
  const animRef = useRef(null);
  const charRef = useRef();
  const titleRef = useRef();
  const q = gsap.utils.selector(charRef);

  // GSAP Timeline
  var tl = gsap.timeline();

  useEffect(() => {
    animRef.current = tl.set(titleRef.current, {
      y: "0",
      top: 0,
      opacity: 1,
      scale: 1,
    });
    tl.to(titleRef.current, {
      top: "50%",
      y: "-100",
      ease: "elastic.out",
      duration: gsap.utils.random(1, 3),
    });
  }, []);

  return (
    <Title ref={titleRef}>
      {text.split("").map(function (char, index) {
        let randomColor = Math.random().toString(16).substr(-6);
        let style = {
          color: `#${randomColor}`,
        };
        return (
          <Char
            aria-hidden="true"
            id={"char"}
            key={index}
            style={style}
            ref={charRef}
          >
            {char}
          </Char>
        );
      })}
    </Title>
  );
};

export default TitleText;

const Title = styled.div`
  font-size: 150px;
  font-family: bubbleFont;
  display: flex;
  max-width: 85vw;
  //   @media (max-width: 768px) {
  //     display: grid;
  //     grid-template-columns: repeat(auto-fill, 62px);
  //   }
`;

const Char = styled.div`
  display: block;
  margin: 5px;
`;
