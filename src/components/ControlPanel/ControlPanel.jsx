import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './ControlPanel.scss';

class ControlPanel extends Component {

	constructor(props) {
    super(props);
    this.stopUpdate = this.stopUpdate.bind(this);
    this.pauseUpdate = this.pauseUpdate.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.state = {
      speed: 5
    }
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

  render() {
    return (
    	<div id="control-panel">
    	  <input type="button" value="Stop" onClick={this.stopUpdate}/>
        <input type="button" value="Pause" onClick={this.pauseUpdate}/>
        <input type="button" value="Start" onClick={this.startUpdate}/>
        <InputRange
          minValue={0}
          maxValue={10}
          value={this.state.speed}
          onChange={speed => {this.setState({speed})}}/>
    	</div>
    );
  }
}

export default ControlPanel;
