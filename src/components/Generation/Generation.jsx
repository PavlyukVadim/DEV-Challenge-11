import React, { Component } from 'react';
import './Generation.scss';

class Generation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
			generation: 0,
      generationTime: 0,
      mode: this.props.currMode 
    };
    if (this.state.mode === 'start') {
      this.autoChangeGeneration();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.currMode);
    if (nextProps.currMode === 'start') {
      this.autoChangeGeneration(); 
    } else if (nextProps.currMode === 'pause') {
      this.removeAutoChangeInterval(); 
    }
  }

  nextGeneration() {
    this.setState((prevState) => {
      return {
        generation: prevState.generation + 1
      };
    });
    this.props.nextGeneration();
  }

  autoChangeGeneration() {
    if (!this.interval) {
      let intervalTime = this.state.generationTime;
      this.interval = setInterval(() => this.nextGeneration(), intervalTime);  
    }
  }
  
  removeAutoChangeInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  render() {
  	let generation = this.state.generation;
    return (
      <div id="generation">
        <p>{'generation: ' + generation}</p>
      </div> 
    );
  }
}

export default Generation;
