import React from 'react';

let urlm = {
  imageUrl1:"https://lh3.googleusercontent.com/d/1ZsRHQ_cl05QEypsodoCXQDADVndco0Cb=w686-h228-n?authuser=0"
}

function Gallery(props) {
  return (
    <div className="background-blue">
     

<div className="img-with-text">
      <img alt="" src={urlm.imageUrl1} />
        </div>
  </div>
);
}

export default Gallery;