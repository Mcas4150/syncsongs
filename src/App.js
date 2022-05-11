import logo from "./logo.svg";
import "./App.css";
import AudioMain from "./components/audio/audioMain.jsx";
import Keyboard from "./components/keyboard/keyboard.jsx";

function App() {
  return (
    <div className="App">
      <AudioMain />
      <Keyboard />
    </div>
  );
}

export default App;
