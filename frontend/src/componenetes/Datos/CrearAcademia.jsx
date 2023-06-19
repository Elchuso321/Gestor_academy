import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import "./estilos/ModalCrearAcademia.css";
const URL_API = import.meta.env.VITE_API_URL
// import "../estilos/boton.css"
import styled from 'styled-components';
const ModalWrapper = styled.div`
  /* Estilos para el modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  /* Estilos para el contenido del modal */
  background-color: white;
  padding: 30px;
`;


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <button onClick={onClose} className="btn btn-danger" style={{ float: 'right' }}>
          Cerrar
        </button>
      </ModalContent>
    </ModalWrapper>
  );
};
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
  const [isModalOpenCrear, setIsModalOpenCrear] = useState(false);
  const handleCloseModal = () => setIsModalOpenCrear(false);
  const handleOpenModal = () => setIsModalOpenCrear(true);
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
        window.location.reload();
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
      <div className='row'>
    <div className='col'>

        <button className="m-3 custom-button" style={{ float: 'right' }} onClick={handleOpenModal} >
          NUEVA
        </button>
        <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
          <form onSubmit={(e) => crearAcademia(e)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="nombre" style={{ marginBottom: "0.5rem" }}>
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                value={academiaNombre}
                onChange={handleNombreChange}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Crear
              </button>
            </div>
          </form>

        </Modal>
      </div>
      <br />
      {/* {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Nueva Academia</h2>
            <form onSubmit={(e) => crearAcademia(e)}>
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
      )} */}
    </div>
  );
};







