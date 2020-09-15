import React from 'react'
import './App.css'

function getComputedStyleNoPx($ele, cssProperty) {
  const cssPropertyVal = window.getComputedStyle(document.querySelector('.c1'))[cssProperty]
  return parseFloat(cssPropertyVal.match(/[0-9]+/g)[0])
}

function getWidth($ele) {
  return $ele.offsetWidth /*+ getComputedStyleNoPx($ele, 'borderWidth') * 2*/
}

function getHeight($ele) {
  return $ele.offsetHeight /*+ getComputedStyleNoPx($ele, 'borderWidth') * 2*/
}

function getHalfWidth($ele) {
  return getWidth($ele) / 2
}

function getHalfHeight($ele) {
  return getHeight($ele) / 2
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.selectedControl = undefined
    this.canvasRef = React.createRef()
    this.inputCopy = React.createRef()
    this.state = {
      pointer: {
        x: 0,
        y: 0,
        x1: 0,
        y1: 0,
      },
    }
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
    this.calculatePercent()
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
        const halfW = getHalfWidth(this.$obj.c1)
        const halfH = getHalfHeight(this.$obj.c1)
        // 修正坐标
        pageX = pageX - offsetLeft - DValX
        pageY = pageY - offsetTop - DValY

        if (this.selectedControl) {
          this.$obj[this.selectedControl].style = `left:${pageX + DValX - halfW}px;top:${pageY + DValY - halfH}px`

          this.ctx.clearRect(0, 0, 500, 500)
          this.drawSegment()
          this.drawBezierCurveTo()
          this.calculatePercent()
        }
      },
      false
    )

    document.querySelector('.canvas').addEventListener(
      'mousedown',
      e => {
        e.preventDefault()
        const type = e.target.getAttribute('contr-type')
        if (type == 'c2' || type == 'c4') {
          return
        }
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
    const halfWidth = getHalfWidth($obj.c1)
    const halfHeight = getHalfHeight($obj.c1)
    ctx.beginPath()
    ctx.moveTo($obj.c2.offsetLeft + halfWidth, $obj.c2.offsetTop + halfHeight)
    ctx.bezierCurveTo(
      $obj.c1.offsetLeft + halfWidth,
      $obj.c1.offsetTop + halfHeight,
      $obj.c3.offsetLeft + halfWidth,
      $obj.c3.offsetTop + halfHeight,
      $obj.c4.offsetLeft + halfWidth,
      $obj.c4.offsetTop + halfHeight
    )
    ctx.lineWidth = 5 //线条的宽度
    ctx.strokeStyle = '#ff89ac' //线条的颜色
    ctx.stroke()
    // todo 这里需要根据坐标计算贝塞尔值
  }
  drawLine(x, y, x2, y2, color) {
    if (!color) {
      color = '#FCE811'
    }
    const { ctx } = this
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = 3 //线条的宽度
    ctx.strokeStyle = color //线条的颜色
    ctx.stroke()
  }
  drawSegment() {
    const { $obj, ctx } = this
    const halfWidth = getHalfWidth($obj.c1)
    const halfHeight = getHalfHeight($obj.c1)

    this.drawLine(
      $obj.c2.offsetLeft + halfWidth,
      $obj.c2.offsetTop + halfHeight,
      $obj.c1.offsetLeft + halfWidth,
      $obj.c1.offsetTop + halfHeight
    )
    // 画另外一条控制线
    this.drawLine(
      $obj.c3.offsetLeft + halfWidth,
      $obj.c3.offsetTop + halfHeight,
      $obj.c4.offsetLeft + halfWidth,
      $obj.c4.offsetTop + halfHeight,
      '#31BEED'
    )
  }

  calculatePercent() {
    const { $obj } = this
    const coordinateW = getHalfWidth(this.$canvas)
    const coordinateH = getHalfHeight(this.$canvas)

    const DValX = coordinateW / 2
    const DValY = coordinateH / 2

    const pointHalfWidth = getHalfWidth($obj.c1)
    const pointHalfHeight = getHalfWidth($obj.c1)

    // 坐标采用数学坐标系，获取真实的 x,y，因为网页中y轴和数学中的 y 轴是逆向关系，所以 y 需要转换为数学坐标系的 y
    const { c3RealX, c3RealY, c1RealX, c1RealY } = {
      c3RealX: $obj.c3.offsetLeft - DValX + pointHalfWidth,
      c3RealY: coordinateH - ($obj.c3.offsetTop - DValY + pointHalfHeight),
      c1RealX: $obj.c1.offsetLeft - DValX + pointHalfWidth,
      c1RealY: coordinateH - ($obj.c1.offsetTop - DValY + pointHalfHeight),
    }
    this.setState({
      pointer: {
        x: c3RealX / coordinateW,
        y: c3RealY / coordinateH,
        x1: c1RealX / coordinateW,
        y1: c1RealY / coordinateH,
      },
    })
  }

  handleCopy = () => {
    const copystatement = this.inputCopy.current
    copystatement.select()
    copystatement.setSelectionRange(0, 99999)
    document.execCommand('copy')
    alert('copy!')
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <div className="output">
            <span className="output-span">
              <code>cubic-bezier(
              <em>{this.state.pointer.x.toFixed(2)}</em>,<em>{this.state.pointer.y.toFixed(2)}</em>,
              <span>{this.state.pointer.x1.toFixed(2)}</span>,<span>{this.state.pointer.y1.toFixed(2)}</span>)</code>
            </span>
            <input
              ref={this.inputCopy}
              type="text"
              id="copyInput"
              value={`cubic-bezier(${this.state.pointer.x.toFixed(2)},${this.state.pointer.y.toFixed(
                2
              )},${this.state.pointer.x1.toFixed(2)},${this.state.pointer.y1.toFixed(2)})`}
            />
            <em className="btn" onClick={this.handleCopy}>
              复制
            </em>
          </div>
          {/*<div className="preset">
            <div className="title">
              <span>预设</span>
              <em className="btn" onClick={this.handleCopy}>
                复制
              </em>
            </div>
            <ul className="preset-ul">
              <li className="preset-item">
                <em className="is-checked"></em>
              </li>
            </ul>
          </div>*/}
          <div className="stage">
            <div className="title">
              <span>控制器</span>
              <em className="btn" onClick={this.handleCopy}>
                复制
              </em>
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
        <div className="animation-stage">
            <div className="water" style={{transition: `transform cubic-bezier(${this.state.pointer.x.toFixed(2)},${this.state.pointer.y.toFixed(2)},${this.state.pointer.x1.toFixed(2)},${this.state.pointer.y1.toFixed(2)}) 3s`}}></div>
        </div>
      </div>
    )
  }
}

export default App
