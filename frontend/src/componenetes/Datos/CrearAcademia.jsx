import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import "./estilos/ModalCrearAcademia.css";
const URL_API = import.meta.env.VITE_API_URL

export const BotonCrearAcademia = () => {
  const [showModal, setShowModal] = useState(false);
  const [academiaNombre, setAcademiaNombre] = useState('');
  const { authTokens, logoutUser } = useContext(AuthContext);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleNombreChange = (event) => {
    setAcademiaNombre(event.target.value);
  };

  const crearAcademia = async (e) => {
    e.preventDefault()
    const data = { nombre: academiaNombre };
    try {
      const response = await fetch(`${URL_API}/api/academias/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Academia creada:', responseData);
        // Realiza cualquier acción adicional que necesites con la respuesta de la API
      } else {
        console.log('Error al crear la academia:', response.status);
        // Maneja el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>CREAR ACADEMIA</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Nueva Academia</h2>
            <form onSubmit={(e)=>crearAcademia(e)}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={academiaNombre}
                onChange={handleNombreChange}
              />
              <button type="sumbit" >
                Crear
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};







