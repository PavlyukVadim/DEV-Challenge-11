import React, { Component } from 'react';
import './Cell.scss';

class Cell extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
			alive: this.props.alive
    };
    this.switchCellState = this.switchCellState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  	if (this.state.alive !== nextProps.alive) {
	  	this.setState(() => {
	      return {
	      	alive: nextProps.alive
	      }
	    });
  	}
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.alive === nextProps.alive) {
			return false;
    } else {
    	return true;
    }
  }


  switchCellState() {
		this.setState((prevState) => {
  		return {
  			alive: !prevState.alive
  		};
		});
  }

  render() {
  	let alive = this.state.alive;
    return (
      <div className={"cell " + (alive ? "alive" : "")}
           onClick={this.switchCellState}
           ref={(input) => { this.textInput = input; }}>
      </div>
    );
  }
}

export default Cell;
