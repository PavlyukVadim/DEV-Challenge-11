import React, { Component } from 'react';
import './index.scss';

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
			generation: 0,
      generationTime: 3000,
      mode: this.props.currMode,
      speed: this.props.speed,
    };
    if (this.state.mode === 'start') {
      this.autoChangeGeneration();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.currMode === 'start' && this.props.currMode !== 'start') {
      this.autoChangeGeneration(); 
    } else if (nextProps.currMode === 'pause' || nextProps.currMode === 'stop') {
      this.removeAutoChangeInterval();
    }
    if (nextProps.speed !== this.props.speed) {
      this.setState(() => {
        return {
          speed: nextProps.speed,
        };
      });
      this.changeSpeed();
    }
  }

  nextGeneration() {
    this.setState((prevState) => {
      return {
        generation: prevState.generation + 1,
      };
    });
    this.props.nextGeneration();
  }

  autoChangeGeneration() {
    if (!this.interval) {
      let intervalTime = this.state.generationTime / this.props.speed;
      this.interval = setInterval(() => this.nextGeneration(), intervalTime);
    }
  }
  
  removeAutoChangeInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  changeSpeed() {
    if (this.interval) {
      this.removeAutoChangeInterval();
      this.autoChangeGeneration();
    }
  }

  render() {
  	let generation = this.state.generation;
    return (
      <div id="generation">
        <p>{'Generation: ' + generation}</p>
      </div> 
    );
  }
}

export default Generation;
