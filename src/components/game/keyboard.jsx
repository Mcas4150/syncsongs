import React, { useRef } from "react";
import styled from "@emotion/styled";

const Keyboard = ({ setSolutionSubmit }) => {
  const keyRef = useRef(0);

  const handleKeyboardInput = (e) => {
      let solutions = [
          keyRef.current.value.slice(-1),
          keyRef.current.value.slice(-2),
          keyRef.current.value.slice(-3)
      ]
      setSolutionSubmit(solutions);
  };

  return (
    <div className="Keyboard">
      <Input
        type="text"
        id="inputField"
        ref={keyRef}
        onChange={handleKeyboardInput}
        placeholder={"solve"}
      />
    </div>
  );
};

export default Keyboard;

const Input = styled.input`
  height: 30px;
  font-size: 18px;
`;
