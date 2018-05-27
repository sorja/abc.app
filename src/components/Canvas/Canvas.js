import React, { Component } from 'react';
import './styles.css';
const OFFSET = 20;
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      color: props.color || "black",
      drawing: false,
      context: null,
      history: []
    }
  }

  componentDidMount() {
    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    this.canvas.addEventListener('mouseout', this.onMouseUp, false);
    this.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false);
    window.addEventListener('resize', this.onResize, false);
    this.props.socket.registerHandler(this.onDrawingEvent);
    this.onResize();
    this.setState({ context: this.canvas.getContext('2d') });
  }

  componentWillUnmount() {
    this.props.socket.unregisterHandler();
  }

  drawLine = (x0, y0, x1, y1, color, emit) => {
    const { context} = this.state
    context.beginPath();
    context.moveTo(x0, y0-OFFSET);
    context.lineTo(x1, y1-OFFSET);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!this.canvas) { return; }

     const w = this.canvas.width;
     const h = this.canvas.height;

    const point = {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    };

    if (emit) {
      this.props.socket.socket.emit('drawing', point);
    }

    // if (!fromHistory){
    //   this.setState({ history: history.concat([point]) });
    // }
  }

  onMouseDown = (e) => {
    this.setState({ drawing: true });
    this.setState({ x: e.clientX, y: e.clientY });
  }

  onMouseUp = (e) => {
    if (!this.state.drawing) { return; }
    this.setState({ drawing: false });
    this.drawLine(this.state.x, this.state.y, e.clientX, e.clientY, this.props.color, true);
  }

  onMouseMove = (e) => {
    if (!this.state.drawing) { return; }
    this.drawLine(this.state.x, this.state.y, e.clientX, e.clientY, this.props.color, true);
    this.setState({ x: e.clientX, y: e.clientY });
  }

  // limit the number of events per second
  throttle = (callback, delay) => {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  onResize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - OFFSET;
    // this.state.history.forEach(v => this.drawLine({ ...v, emit: null, fromHistory: true }))
  }

  onDrawingEvent = (data) => {
    if (!this.canvas) { return; }
    var w = this.canvas.width;
    var h = this.canvas.height;

    this.drawLine(
      data.x0 * w,
      data.y0 * h,
      data.x1 * w,
      data.y1 * h,
      data.color
    );
  }

  render() {
    return (
      <canvas ref={el => this.canvas = el} className="whiteboard" />
    );
  }
}
