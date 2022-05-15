import logo from "./logo.svg";
import "./App.css";
import AnimationMain from "./components/animation/animationMain.jsx";
import AnimateTwo from "./components/animation/animateTwo.jsx";
import AudioMain from "./components/audio/audioMain2.jsx";
import GameMain from "./components/game/gameMain";
import GameOne from "./components/animation/game1";

function App() {
  return (
    <div className="App">
      <GameOne />
      {/* <AnimateTwo/> */}
      {/* <AnimationMain />
      <AudioMain /> */}
      {/* <GameMain /> */}
    </div>
  );
}

export default App;
