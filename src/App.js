import logo from "./logo.svg";
import "./App.css";
import AnimationMain from "./components/animation/animationMain.jsx";
import AudioMain from "./components/audio/audioMain.jsx";
import Keyboard from "./components/keyboard/keyboard.jsx";

function App() {
  return (
    <div className="App">
      <AnimationMain />
      <AudioMain />
      <Keyboard />
    </div>
  );
}

export default App;
