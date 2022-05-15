import React, { useState, useEffect } from "react";
import "../../SynthPad.css";
import Audio from "./audioContext";

const AudioMain = () => {
  const [keyEntry, setKeyEntry] = useState("");
  const [freqSubmit, setFreqSubmit] = useState("");
  const [oscillatorCount, setOscillatorCount] = useState(0);

  // initialize state for OscillatorNodes

  let mixerGainNode;

  const handleKeyboardInput = (e) => {
    if (e.key === "Enter") {
      setFreqSubmit(keyEntry);
      const freq = parseInt(freqSubmit);
      setOscillatorCount(oscillatorCount + 1);
      createOscillator();
      setKeyEntry("");
      document.getElementById("inputField").value = "";
    } else if (e.key === "Backspace") {
      setKeyEntry(keyEntry.slice(0, -1));
    } else if (isFinite(e.key)) {
      setKeyEntry(keyEntry.concat(e.key));
    }
  };

  const initializeMaster = () => {
    //initializes masterGain connection to audio context
    Audio.masterGainNode.connect(Audio.context.destination);
    Audio.masterGainNode.gain.setValueAtTime(1, Audio.context.currentTime);
  };

  //   const initializeMixer = () => {
  //     mixerGainNode = Audio.context.createGain();
  //     mixerGainNode.gain.setValueAtTime(0.85, Audio.context.currentTime);
  //     mixerGainNode.connect(Audio.masterGainNode);
  //   };

  // on page load
  useEffect(() => {
    initializeMaster();
    // initializeMixer();
    // createOscillator();
  }, []);

  const startAudio = () => {
    Audio.resume();
  };

  const createOscillator = (inputFrequency) => {
    // Create a GainNode for the oscillator, set it to 0 volume and connect it to masterGainNode
    // const inputFrequency = Math.random * 300;
    const oscillatorGainNode = Audio.context.createGain();
    oscillatorGainNode.gain.setValueAtTime(
      1 / oscillatorCount,
      Audio.context.currentTime
    );
    oscillatorGainNode.connect(Audio.masterGainNode);

    // Create OscillatorNode, connect it to its GainNode, and make it start playing.
    const oscillatorNode = Audio.context.createOscillator();
    // oscillatorNode.type.setValueAtTime("sine", Audio.context.currentTime);
    // oscillatorNode.frequency.setValueAtTime(200, Audio.context.currentTime);
    oscillatorNode.type = "sine";
    oscillatorNode.frequency.setValueAtTime(
      freqSubmit,
      Audio.context.currentTime
    );
    oscillatorNode.connect(oscillatorGainNode);
    oscillatorNode.start();

    // Store the nodes along with their values in state.
    // Note: When an oscillator is created, frequency is set to 440,
    // and type is set to 'sine' by default.
  };

  return (
    <div className="AudioMain">
      <button onClick={createOscillator} />
      <div className="Keyboard">
        <div>count :{oscillatorCount} </div> <div>{keyEntry}</div>
        <input
          type="text"
          id="inputField"
          // onKeyDown={(e) => setKeyEntry(keyEntry.concat(e.key))}
          onKeyDown={handleKeyboardInput}
        />
      </div>
    </div>
  );
};

export default AudioMain;
