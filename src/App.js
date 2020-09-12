import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const $canvas = document.querySelector("#canvas")
        const $c2 = document.querySelector(".c2")
        const $c4 = document.querySelector(".c4")

        const $c2w = $c2.offsetWidth
        const $c2h = $c2.offsetHeight

        const ctx = $canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo($c2.offsetLeft + $c2w/2, $c2.offsetTop + $c2h/2);
        ctx.lineTo($c4.offsetLeft + $c2w/2, $c4.offsetTop + $c2h/2);
        ctx.fill();
        ctx.lineWidth = 3;//线条的宽度
        ctx.strokeStyle = "rgba(0,0,0,.1)";//线条的颜色
        ctx.stroke();

        // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

        // 设置监听
        const $c1 = document.querySelector(".c1")
        const $c3 = document.querySelector(".c3")

        $canvas.addEventListener("mousemove",(e) => {
            console.log(e.target)
        }, false)
    }

    render() {
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
                        <canvas id="canvas" width="800" height="537"></canvas>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
