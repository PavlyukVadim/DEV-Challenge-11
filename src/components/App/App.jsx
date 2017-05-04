import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import Generation from '../Generation/Generation';
import ControlPanel from '../ControlPanel/ControlPanel';
import './App.scss';

class App extends Component {

	constructor(props) {
    super(props);
    this.state = {
			generation: 0,
			mode: 'stop',
			speed: 5
    };
    this.nextGeneration = this.nextGeneration.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
  }

  nextGeneration() {
    this.setState((prevState) => {
      return {
        generation: prevState.generation + 1
      };
    });
  }

  changeMode(newMode) {
  	if (newMode !== this.state.mode) {
			this.setState(() => {
	      return {
	        mode: newMode
	      };
	    });
  	}
  }

  changeSpeed(newSpeed) {
    this.setState(() => {
      return {
        speed: newSpeed
      };
    });
  }

  render() {
    return (
    	<div>
    		<Grid generation={this.state.generation}/>
				<Generation 
				  nextGeneration={this.nextGeneration}
				  currMode={this.state.mode}
				  speed={this.state.speed}/>
				<ControlPanel 
				  changeMode={this.changeMode}
				  changeSpeed={this.changeSpeed}
				  speed={this.state.speed}/>
    	</div>
    );
  }
}

export default App;
