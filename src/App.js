import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <div className="output">
          <span>cubic-bezier(0.5, 0.5, 0.5, 0.5)</span>
          <em className="btn">复制</em>
        </div>
        <div className="preset">
          <div className="title">预设</div>
          <ul className="preset-ul">
            <li className="preset-item"></li>
            <li className="preset-item"></li>
            <li className="preset-item"></li>
            <li className="preset-item"></li>
            <li className="preset-item"></li>
            <li className="preset-item"></li>
          </ul>
        </div>
      </div>

      <div className="stage">
        <div className="title">
          <span>控制器</span>
          <em className="btn">重置</em>
        </div>
        <div className="canvas">
          <span className="contr c1"></span>
          <span className="contr c2"></span>
          <span className="contr c3"></span>
          <span className="contr c4"></span>
          <canvas width="800" height="537" ></canvas>
        </div>
      </div>

    </div>
  );
}

export default App;
