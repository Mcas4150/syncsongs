import React, { useState, useEffect } from "react";

const Keyboard = () => {
  // set state to represent initial value of masterGainNode
  const [keyEntry, setKeyEntry] = useState("");
  const [freqSubmit, setFreqSubmit] = useState("");

  // initialize state for OscillatorNodes

  const handleKeyboardInput = (e) => {
    if (e.key === "Enter") {
      setFreqSubmit(keyEntry);
      setKeyEntry("");
      document.getElementById("inputField").value = "";
    } else if (e.key === "Backspace") {
      setKeyEntry(keyEntry.slice(0, -1));
    } else if (isFinite(e.key)) {
      setKeyEntry(keyEntry.concat(e.key));
    }
  };

  return (
    <div className="Keyboard">
      <div>{keyEntry}</div>
      <input
        type="text"
        id="inputField"
        // onKeyDown={(e) => setKeyEntry(keyEntry.concat(e.key))}
        onKeyDown={handleKeyboardInput}
      />
    </div>
  );
};

export default Keyboard;
