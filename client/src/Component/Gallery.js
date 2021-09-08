import React from 'react';

let urlm = {
  imageUrl1:"http://prfrankild.dk/ArtWalk_Logo%20final_ww.png"
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

export default Gallery;