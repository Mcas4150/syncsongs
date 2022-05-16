import React, { useState, useRef } from "react";

const Keyboard = ({ setFreqSubmit }) => {
  const keyRef = useRef(0);

  const handleKeyboardInput = (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      setFreqSubmit(keyRef.current.value);
      document.getElementById("inputField").value = "";
    }
  };

  return (
    <div className="Keyboard">
      <input
        type="text"
        id="inputField"
        ref={keyRef}
        onKeyDown={handleKeyboardInput}
      />
    </div>
  );
};

export default Keyboard;
