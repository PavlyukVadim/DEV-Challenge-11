import React, { Component } from 'react';
import './index.scss';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
		  pointerTop: 0,
      pointerLeft: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    let body = document.body;
    let html = document.documentElement;
    let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    window.documentHeight = height;
    this.setState(() => {
      return {
        pointerTop: (window.innerHeight / 2) / window.documentHeight * window.innerHeight * 0.07,
        pointerLeft: (window.innerWidth / 2) / window.documentHeight * window.innerWidth * 0.07,
      }
    });
  }

  handleScroll(event) {
    window.scrollObj = {
      scrollTop: event.srcElement.body.scrollTop,
      scrollLeft: event.srcElement.body.scrollLeft,
    }
    this.setState(() => {
      return {
        pointerTop: (window.scrollObj.scrollTop + window.innerHeight / 2) / window.documentHeight * window.innerHeight * 0.07,
        pointerLeft: (window.scrollObj.scrollLeft + window.innerWidth / 2) / window.documentHeight * window.innerWidth * 0.07
      };
    });
  }

  render() {
    let mapStyle = {
      top: this.state.pointerTop + 'px',
      left: this.state.pointerLeft + 'px',
    };
    return (
      <div id="map">
        <div id="pointer"
          ref={(div) => {this.mapPointer = div;}}
          style={mapStyle}
        />
      </div> 
    );
  }
}

export default Map;
