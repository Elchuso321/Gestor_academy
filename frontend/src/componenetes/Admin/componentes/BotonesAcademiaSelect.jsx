import React from 'react';

const ColorSquareComponent = ({ color,handleClick, texto,disposicion=6 }) => {

    return (
      <div className={`col-lg-${disposicion} col-md-6 mt-5`}>
      <div className="card shadow-lg rounded-lg text-center" style={{ backgroundColor: color, height: '200px' }} onClick={handleClick}>
        <div className="card-body d-flex align-items-center justify-content-center">
          <h1 className="text-white display-4">{texto}</h1>
        </div>
      </div>
    </div>
  
  );
};

export default ColorSquareComponent;
