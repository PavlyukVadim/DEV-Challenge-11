import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './ControlPanel.scss';

class ControlPanel extends Component {

	constructor(props) {
    super(props);
    this.state = {
      speed: this.props.speed
    }
    this.scrollStep = 200;
    this.stopUpdate = this.stopUpdate.bind(this);
    this.pauseUpdate = this.pauseUpdate.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.toTop = this.toTop.bind(this);
    this.toLeft = this.toLeft.bind(this);
    this.toRight = this.toRight.bind(this);
    this.toBottom = this.toBottom.bind(this);
  }
  
  stopUpdate() {
    this.props.changeMode('stop');
  }

  pauseUpdate() {
    this.props.changeMode('pause');
  }

  startUpdate() {
    this.props.changeMode('start');
  }

  clearGrid() {
    this.props.changeMode('clear'); 
  }

  changeSpeed(speed) {
    this.props.changeMode('pause');
    this.setState({speed});
    this.props.changeSpeed(speed);
  }

  toTop() {
    if (window.scrollObj) {
      window.scrollTo(window.scrollObj.scrollLeft, window.scrollObj.scrollTop - this.scrollStep);
    }
  }

  toLeft() {
    if (window.scrollObj) {
      window.scrollTo(window.scrollObj.scrollLeft - this.scrollStep, window.scrollObj.scrollTop);
    }
  }

  toRight() {
    if (window.scrollObj) {
      window.scrollTo(window.scrollObj.scrollLeft + this.scrollStep, window.scrollObj.scrollTop);
    }
  }

  toBottom() {
    if (window.scrollObj) {
      window.scrollTo(window.scrollObj.scrollLeft, window.scrollObj.scrollTop + this.scrollStep);
    }
  }

  render() {
    return (
    	<div id="control-panel">
        <div className="position-control">
          <div className="up">
            <div onClick={this.toTop}>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </div>
          </div>
          <div className="left-right">
            <div onClick={this.toLeft}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </div>
            <div onClick={this.toRight}>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
          <div className="down">
            <div onClick={this.toBottom}>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="buttons">
          <div>
            <input type="button" value="Start" onClick={this.startUpdate}/>
            <input type="button" value="Pause" onClick={this.pauseUpdate}/>  
          </div>
          <div>
            <input type="button" value="Stop" onClick={this.stopUpdate}/>
            <input type="button" value="Clear" onClick={this.clearGrid}/>
          </div>
        </div>
        <p className="speed-title">Speed: </p>
        <InputRange
          minValue={1}
          maxValue={10}
          value={this.state.speed}
          onChange={speed => {this.changeSpeed(speed)}}/>
    	</div>
    );
  }
}

export default ControlPanel;
