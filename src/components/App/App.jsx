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
			mode: 'stop'
    };
    this.nextGeneration = this.nextGeneration.bind(this);
    this.changeMode = this.changeMode.bind(this);
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
			this.setState((prevState) => {
	      return {
	        mode: newMode
	      };
	    });
  	}
  }

  render() {
    return (
    	<div>
    		<Grid />
				<Generation 
				  nextGeneration={this.nextGeneration}
				  currMode={this.state.mode}/>
				<ControlPanel changeMode={this.changeMode}/>
    	</div>
    );
  }
}

export default App;
