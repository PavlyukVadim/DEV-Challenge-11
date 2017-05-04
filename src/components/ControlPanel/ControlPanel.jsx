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
    this.stopUpdate = this.stopUpdate.bind(this);
    this.pauseUpdate = this.pauseUpdate.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
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
    this.setState({speed});
    this.props.changeSpeed(speed);
  }

  render() {
    return (
    	<div id="control-panel">
    	  <input type="button" value="Stop" onClick={this.stopUpdate}/>
        <input type="button" value="Pause" onClick={this.pauseUpdate}/>
        <input type="button" value="Start" onClick={this.startUpdate}/>
        <input type="button" value="Clear" onClick={this.clearGrid}/>
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
