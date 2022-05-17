import React, { useRef } from "react";
import styled from "@emotion/styled";

const Keyboard = ({ setSolutionSubmit }) => {
  const keyRef = useRef(0);

  const handleKeyboardInput = (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      setSolutionSubmit(keyRef.current.value);
      document.getElementById("inputField").value = "";
    }
  };

  return (
    <div className="Keyboard">
      <Input
        type="text"
        id="inputField"
        ref={keyRef}
        onKeyDown={handleKeyboardInput}
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
