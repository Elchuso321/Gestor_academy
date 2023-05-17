import React from 'react';

const ColorSquareComponent = ({ color,handleClick, texto }) => {

    return (
      <div className="col-lg-6 col-md-6 mt-5">
      <div className="card shadow-lg rounded-lg text-center" style={{ backgroundColor: color, height: '200px' }} onClick={handleClick}>
        <div className="card-body d-flex align-items-center justify-content-center">
          <h1 className="text-white display-4">{texto}</h1>
        </div>
      </div>
    </div>
  
  );
};

export default ColorSquareComponent;

//   <div className="col-lg-4 col-md-6 mt-5">
//   <div className="card shadow rounded text-center" style={{ backgroundColor: "#5CB3FC", height: '200px' }} onClick={handleClick}>
//     <div className="card-body d-flex align-items-center justify-content-center">
//       <h1 className="text-white">{texto}</h1>
//     </div>
//   </div>
// </div>




// import React, { useEffect, useState } from 'react';

// export const ButtonAcademiaSelect = () => {
//   const [buttons, setButtons] = useState([]);

//   useEffect(() => {
//     // Realiza la llamada Fetch para obtener los datos de los botones
//     fetch('http://127.0.0.1:8000/api/academias/')
//       .then(response => response.json())
//       .then(data => setButtons(data))
//       .catch(error => console.log(error));
//   }, []);

//   const renderButtons = () => {
//     const buttonCount = buttons.length;

//     if (buttonCount === 0) {
//       return <p>No hay academias disponibles.</p>;
//     }

//     const columns = buttonCount > 2 ? 'col-md-6' : `col-md-${12 / buttonCount}`;

//     return buttons.map((button, index) => (
//       <div key={index} className={columns}>
//         <button className="btn btn-primary btn-lg btn-block">{button.nombre}</button>
//       </div>
      

//     ));
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         {renderButtons()}
//         <div className="container">
//       <div className="row">
//         <div className="col text-center">
//           <button className="btn btn-primary btn-lg">Mi botón</button>
//         </div>
//       </div>
//     </div>
//       </div>
//     </div>
//   );
// };
