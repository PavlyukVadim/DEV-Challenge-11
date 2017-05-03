import React, { Component } from 'react';
import './Cell.scss';

class Cell extends Component {
  render() {
  	let alive = this.props.alive;
    return (
      <div className={"cell " + (alive ? "alive" : "")}>
        
      </div>
    );
  }
}

export default Cell;
