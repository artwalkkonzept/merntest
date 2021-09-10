import React, { Component } from 'react';
import logo from '../content/ArtWalk_Logo final_ww.png';
export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="logo">
          <img alt="" src={logo} width="270" />
        </div>
      </div>
    );
  }
} 

/*import React from 'react';

let urlm = {
  imageUrl1:"http://www.png"
}

function Gallery(props) {
  return (
    <div className="background-blue">
     

<div className="img-with-text">
      <img alt="" height="270" src={urlm.imageUrl1} />
        </div>
  </div>
);
}

export default Gallery;*/