import React from "react";
import { TickCounter } from "./features/tickCounter/TickCounter";
import "./App.css";
import "antd/dist/antd.css";
import { GameManager } from "./app/game";
function App() {
  return (
    <div className="App">
      <GameManager />
    </div>
  );
}

export default App;
