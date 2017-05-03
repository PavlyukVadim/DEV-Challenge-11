import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import './Grid.scss';

class Grid extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.width = 50;
    this.height = 50;
    this.gridStyle = {
      width: this.width * 14 + 'px',
      height: this.height * 14 + 'px'
    };
  }

  getCellGrid(config) {
    let grid = [];
    let i, j;
    for (i = 0; i < this.width; i++) {
      for (j = 0; j < this.height; j++) {
        let alive = false;
        if (config.random) {
          alive = Math.random() > 0.8;
        }
        grid.push(<Cell key={i * this.width + j} alive={alive}/>);
      }
    }
    return grid;
  }

  render() {
    let grid = this.getCellGrid({random: true});
    return (
      <div id="grid" style={this.gridStyle}>
        {grid}
      </div>
    );
  }
}

export default Grid;
