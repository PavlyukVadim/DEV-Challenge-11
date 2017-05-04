import React, { Component } from 'react';
import './Generation.scss';

class Generation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
			generation: 0,
      generationTime: 0 
    };
    this.autoChangeGeneration();
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
    let intervalTime = this.state.generationTime;
    this.interval = setInterval(() => this.nextGeneration(), intervalTime * 5);
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
