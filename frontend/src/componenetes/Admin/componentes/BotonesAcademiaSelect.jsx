import React from 'react';

const ColorSquareComponent = ({ color,handleClick, texto,disposicion=6 ,height=200,letra=3 }) => {

    return (
      <div className={`col-lg-${disposicion} col-md-2 mt-5 `}  style={{ borderRadius: '30px' }}>
      <div className="card shadow-lg rounded-lg text-center" style={{ backgroundColor: color, height: height ,borderRadius: '20px'}} onClick={handleClick}>
        <div className="card-body d-flex align-items-center justify-content-center">
          <h5 className={`col text-white display-${letra}`}>{texto}</h5>
        </div>
      </div>
    </div>
  
  );
};

export default ColorSquareComponent;
