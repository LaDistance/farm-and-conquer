import React from 'react';
import logo from './logo.svg';
import { TickCounter } from './features/tickCounter/TickCounter';
import './App.css';
import 'antd/dist/antd.css';
function App() {

  const firstTimestamp = new Date();
  firstTimestamp.setSeconds(firstTimestamp.getSeconds() + 10);

  return (
    <div className="App">
      <header className="App-header">
        <TickCounter expiryTimestamp={firstTimestamp}/>
      </header>
    </div>
  );
}

export default App;
