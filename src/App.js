import logo from "./logo.svg";
import "./App.css";
import AnimationMain from "./components/animation/animationMain.jsx";
import AudioMain from "./components/audio/audioMain.jsx";
import GameMain from "./components/game/gameMain";

function App() {
  return (
    <div className="App">
      <AnimationMain />
      <AudioMain />
      <GameMain />
    </div>
  );
}

export default App;
