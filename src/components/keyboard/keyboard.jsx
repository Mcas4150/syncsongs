import React, { useState, useEffect } from "react";

const Keyboard = () => {
  // set state to represent initial value of masterGainNode
  const [keyEntry, setKeyEntry] = useState("");

  // initialize state for OscillatorNodes

  return (
    <div className="Keyboard">
      <div>{keyEntry}</div>
      <input
        type="text"
        id="one"
        onKeyDown={(e) => setKeyEntry(keyEntry.concat(e.key))}
      />
    </div>
  );
};

export default Keyboard;
