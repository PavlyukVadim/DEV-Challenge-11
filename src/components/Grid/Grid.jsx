import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import './Grid.scss';

class Grid extends Component {
  
  constructor(props) {
    super(props);
    this.width = 200;
    this.height = 200;
    this.state = {
      grid: this.getCellGrid({random: true})
    };
    this.gridStyle = {
      width: this.width * 14 + 'px',
      height: this.height * 14 + 'px'
    };
    this.generation = this.props.generation;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currMode === 'clear') {
      this.setState(() => {
        return {
          grid: this.getCellGrid({clear: true})
        }
      });
    } else if (this.generation !== nextProps.generation) {
      this.updateCellGrid();
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.generation === nextProps.generation && 
        nextProps.currMode !== 'clear' && 
        !this.changedCellState) {
      return false;
    }
    if(this.changedCellState) {
      this.changedCellState = false;
    }
    this.generation = nextProps.generation;
    return true;
  }

  getCellGrid(config) {
    let grid = [];
    let i, j;
    for (i = 0; i < this.width; i++) {
      for (j = 0; j < this.height; j++) {
        let alive;
        if (config.random) {
          alive = Math.random() > 0.8;
        } else if (config.clear) {
          alive = false;
        }
        
        grid.push(<Cell key={i * this.width + j} 
                        alive={alive} 
                        row={i} 
                        col={j} 
                        changeCellState={(...arg) => this.changeCellState(...arg)}/>);
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
          grid[i * this.width + j] = (<Cell key={i * this.width + j} 
                                            alive={newCellState}
                                            row={i} 
                                            col={j}
                                            changeCellState={(...arg) => this.changeCellState(...arg)}/>);  
        }
      }
    }
    this.setState(() => {
      return {
        grid: grid
      }
    });
  }

  changeCellState(...arg) {
    let [alive, i, j] = arg;
    let grid = [].concat(this.state.grid);
    grid[i * this.width + j] = (<Cell key={i * this.width + j} 
                                      alive={alive}
                                      row={i}
                                      col={j}
                                      changeCellState={(...arg) => this.changeCellState(...arg)}/>);  
    this.setState(() => {
      return {
        grid: grid
      }
    });
    this.changedCellState = true;
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
    if (neighborhood.length === 2 || neighborhood.length === 3) {
      if(currCellState) {
        return true;
      }
    } 
    if (neighborhood.length === 3 && !currCellState) {
      return true;
    }
    return false;
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
