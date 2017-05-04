import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import './Grid.scss';

class Grid extends Component {
  
  constructor(props) {
    super(props);
    this.width = 200;
    this.height = 200;
    this.state = {
      grid: this.getCellGrid()
    };
    this.gridStyle = {
      width: this.width * 14 + 'px',
      height: this.height * 14 + 'px'
    };
  }

  componentWillReceiveProps() {
    this.updateCellGrid();
  }

  getCellGrid() {
    let grid = [];
    let i, j;
    for (i = 0; i < this.width; i++) {
      for (j = 0; j < this.height; j++) {
        let alive = Math.random() > 0.8;
        grid.push(<Cell key={i * this.width + j} alive={alive}/>);
      }
    }
    return grid;
  }

  updateCellGrid() {
    let grid = [].concat(this.state.grid);
    let i, j;
    for (i = 0; i < this.width; i++) {
      for (j = 0; j < this.height; j++) {
        let currCellState = grid[i * this.width + j].props.alive;
        let newCellState = this.updateCell(i, j, currCellState);
        if (currCellState != newCellState) {
          grid[i * this.width + j] = (<Cell key={i * this.width + j} alive={newCellState}/>);  
        }
      }
    }
    
    this.setState(() => {
      return {
        grid: grid
      }
    });

  }
  
  updateCell(row, col, currCellState) {
    let grid = this.state.grid;
    let neighborhood = [];
    neighborhood.push(grid[(row - 1) * this.width + col - 1]);
    neighborhood.push(grid[(row - 1) * this.width + col]);
    neighborhood.push(grid[(row - 1) * this.width + col + 1]);
    neighborhood.push(grid[(row) * this.width + col - 1]);
    neighborhood.push(grid[(row) * this.width + col + 1]);
    neighborhood.push(grid[(row + 1) * this.width + col - 1]);
    neighborhood.push(grid[(row + 1) * this.width + col]);
    neighborhood.push(grid[(row + 1) * this.width + col + 1]);
    neighborhood = neighborhood.filter((cell) => cell && cell.props.alive);
    if (neighborhood.length <= 1 || neighborhood.length >= 4) {
      return false;
    }

    return true;
  }

  render() {
    let grid = this.state.grid;
    return (
      <div id="grid" style={this.gridStyle}>
        {grid}
      </div>
    );
  }
}

export default Grid;
