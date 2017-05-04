import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import Generation from '../Generation/Generation';
import './App.scss';

class App extends Component {

	constructor(props) {
    super(props);
    this.state = {
			generation: 0
    };
    this.nextGeneration = this.nextGeneration.bind(this);
  }

  nextGeneration() {
    this.setState((prevState) => {
      return {
        generation: prevState.generation + 1
      };
    });
  }

  render() {
  	console.log(this.state.generation);
    return (
    	<div>
    		<Grid />
				<Generation nextGeneration={this.nextGeneration}/>
    	</div>
    );
  }
}

export default App;
