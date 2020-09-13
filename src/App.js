import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.selectedControl = undefined
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.$canvas = document.querySelector('#canvas')
    this.$obj = {
      c1: document.querySelector('.c1'),
      c2: document.querySelector('.c2'),
      c3: document.querySelector('.c3'),
      c4: document.querySelector('.c4'),
    }
    this.ctx = this.$canvas.getContext('2d')
    this.drawSegment()
    this.drawBezierCurveTo()
    this.$canvas.addEventListener(
      'mousemove',
      e => {
        let { pageX, pageY } = e
        const { offsetTop, offsetLeft } = this.canvasRef.current
        // 因为背景剧中了，所以需要减去背景缩进值来修正鼠标点，绘制控制点则需要加上缩进值，因为控制点相对与canvas定位
        const DValX = e.target.offsetWidth / 4
        const DValY = e.target.offsetHeight / 4
        const DvalW = this.$obj.c1.offsetWidth / 2
        const DvalH = this.$obj.c1.offsetHeight / 2
        pageX = pageX - offsetLeft - DValX
        pageY = pageY - offsetTop - DValY

        if (this.selectedControl) {
          this.$obj[this.selectedControl].style = `left:${pageX + DValX - DvalW}px;top:${pageY + DValY - DvalH}px`
          this.ctx.clearRect(0, 0, 500, 500)
          this.drawSegment()
          this.drawBezierCurveTo()
        }
      },
      false
    )

    document.querySelector('.canvas').addEventListener(
      'mousedown',
      e => {
        e.preventDefault()
        this.selectedControl = e.target.getAttribute('contr-type')
      },
      false
    )

    document.querySelector('.canvas').addEventListener(
      'mouseup',
      e => {
        e.preventDefault()
        this.selectedControl = undefined
      },
      false
    )
  }

  drawBezierCurveTo() {
    const { $obj, ctx } = this
    const { offsetWidth, offsetHeight } = $obj.c1

    ctx.beginPath()
    ctx.moveTo($obj.c2.offsetLeft + offsetWidth / 2, $obj.c2.offsetTop + offsetHeight / 2)
    ctx.bezierCurveTo(
      $obj.c1.offsetLeft + offsetWidth / 2,
      $obj.c1.offsetTop + offsetHeight / 2,
      $obj.c3.offsetLeft + offsetWidth / 2,
      $obj.c3.offsetTop + offsetHeight / 2,
      $obj.c4.offsetLeft + offsetWidth / 2,
      $obj.c4.offsetTop + offsetHeight / 2
    )
    ctx.lineWidth = 5 //线条的宽度
    ctx.strokeStyle = '#ff89ac' //线条的颜色
    ctx.stroke()
    // todo 这里需要根据坐标计算贝塞尔值
  }

  drawSegment() {
    const { $obj, ctx } = this
    const { offsetWidth, offsetHeight } = $obj.c1

    ctx.beginPath()
    ctx.moveTo($obj.c2.offsetLeft + offsetWidth / 2, $obj.c2.offsetTop + offsetHeight / 2)
    ctx.lineTo($obj.c1.offsetLeft + offsetWidth / 2, $obj.c1.offsetTop + offsetHeight / 2)
    ctx.lineWidth = 3 //线条的宽度
    ctx.strokeStyle = '#FCE811' //线条的颜色
    ctx.stroke()
    // 画另外一条控制线
    ctx.beginPath()
    ctx.moveTo($obj.c3.offsetLeft + offsetWidth / 2, $obj.c3.offsetTop + offsetHeight / 2)
    ctx.lineTo($obj.c4.offsetLeft + offsetWidth / 2, $obj.c4.offsetTop + offsetHeight / 2)
    ctx.lineWidth = 3 //线条的宽度
    ctx.strokeStyle = '#FCE811' //线条的颜色
    ctx.stroke()
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
            <div className="title">
              <span>预设</span>
              <em className="btn">复制</em>
            </div>
            <ul className="preset-ul">
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
            </ul>
          </div>
        </div>

        <div className="stage">
          <div className="title">
            <span>控制器</span>
            <em className="btn">复制</em>
            <em className="btn btn1">重置控制点(2,4)</em>
          </div>
          <div className="canvas-w">
            <div className="canvas" ref={this.canvasRef}>
              <button className="contr c1" contr-type="c1">
                1
              </button>
              <button className="contr c2" contr-type="c2">
                2
              </button>
              <button className="contr c3" contr-type="c3">
                3
              </button>
              <button className="contr c4" contr-type="c4">
                4
              </button>
              <canvas id="canvas" width="500" height="500"></canvas>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
