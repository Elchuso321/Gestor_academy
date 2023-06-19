import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { ModificarProfesor } from './ModificarProfesor';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { NavbarAdminAcademia } from '../Admin/NavbarAdmin_Academia';
import { Image } from 'react-bootstrap';
import { UpdateFormProfe } from '../conexion/update/UpdateComponenteProfe';

import "../estilos/boton.css"
import styled from 'styled-components';
import { HorarioTableNoModificaciones } from './TablaHorariosNoModificaciones';
import { EmailForm } from '../conexion/EnviarCorreo';
  const URL_API = import.meta.env.VITE_API_URL

  const ModalWrapper = styled.div`
    /* Estilos para el modal */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
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
        <button onClick={onClose} className ="btn btn-danger" style={{ float: 'right'}}>
        Cerrar
      </button>
        </ModalContent>
    </ModalWrapper>
  );
};

export const DetalleProfesor = ({ id = 1 }) => {
  const { numId } = useParams();
  if (numId) {
    id = numId;
  }
  console.log("id:", id);
  const [eventos, setEventos] = useState([]);
  const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);
  const [isModalOpenCrear, setIsModalOpenCrear] = useState(false);
  
  const handleTextClick = () => {
    setIsModalOpenCrear(true);
  };
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);

  const handleTextClickEmail = () => {
    setIsModalOpenEmail(true);
  };

  const handleTextClickEditar = () => {
    setIsModalOpenEditar(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenCrear(false);
    setIsModalOpenEditar(false);
    setIsModalOpenEmail(false);

  };
  const [profesor, setProfesor] = useState("");
  const [usuario, setUsuario] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);

  const URL_API = import.meta.env.VITE_API_URL;
  const enlace = URL_API;
  useEffect(() => {
    const obtenerDetalleProfesor = async () => {
      console.log("id:", id);
      try {
        const response = await fetch(enlace + `/api/profesor/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:", data);
          setProfesor(data);
          const foto=enlace + `${data.foto_perfil}`
          console.log("foto:", foto);
          console.log("profe:", profesor);
        } else {
          console.error('Error al obtener el detalle del profesor');
        }
      } catch (error) {
        console.error('Error de red', error);
      }

    };
    obtenerDetalleProfesor();

  }, [id]);


  useEffect(() => {
    console.log("profesor:", profesor);
    let getNotes = async () => {
      let response = await fetch(`${URL_API}/api/eventos/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      let data = await response.json()

      if (response.status === 200) {
        console.log("eventos1:", data)
        // console.log("curso1:", curso)
        // filtrar eventos por aquellos que tengan el id del curso
        const eventosFiltrados = data.filter((evento) => evento.profesor == profesor.id)
        console.log("eventos filtrados:", eventosFiltrados)
        // setNotes(eventosFiltrados)
        setEventos(eventosFiltrados)

      } else if (response.statusText === 'Unauthorized') {
        console.log("fallo")
        logoutUser()
      }
    }
    getNotes()
  }, [profesor])


  return (
    <div>
      <NavbarAdminAcademia />
      <br /><br /><br /><br /><br /><br />
      {profesor ? (
        
        <div className="container">
        
          <div className="row">
            <div className="col-sm-6" style={{ height: '290px'}}>
              <div className="profile-picture"> 

              <Image
          src={`${enlace}${profesor.foto_perfil}`}
          alt="Foto de perfil"
          className="img-fluid rounded-circle border border-3 border-secondary"
          style={{ width: '250px', height: '250px' }}
        />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="profile-details"> 
                <div className='row'>
                <div className='col-6'>
                <span><strong className='h3'>{profesor.usuario.nombre} {profesor.usuario.primer_apellido} {profesor.usuario.segundo_apellido}</strong>  </span> 
                </div>
                <div className='col-3'>
                <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
                    Editar
                  </button>
                  <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
                    {/* <CrearCurso/> */}
                    <UpdateFormProfe id={profesor.id} />
                  </Modal>
                  </div>
                  <div className='col-3'>
                <button className="btn btn-primary btn-floating" onClick={handleTextClickEmail}>
                ✉
                  </button>
                  <Modal isOpen={isModalOpenEmail} onClose={handleCloseModal}>
                    {/* <CrearCurso/> */}
                    <EmailForm idUser={profesor.usuario.id} />
                  </Modal>
                  </div>
                  
                  </div>

                  

                {/* Nombre en grande del niño */}
                <div className="m-2 rectangle border border-dark text-center p-3" style={{ background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} > {/* Estilo para el cuadro de la biografía */}
                  <div  style={{ height: '200px', overflowY: 'auto' }}>
                    <h2 className="text-lg font-bold mb-4">Info</h2>
                    <hr />
                    <div>
                     {profesor.descripcion}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="column"> {/* Estilo para la primera columna debajo */}
              <div className="rectangle border border-dark text-center p-3" style={{ background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} >
                  <div className="border-b-2 border-black mb-4">
                    <h2 className="text-xl font-bold">Contacto</h2>
                    <hr />
                  </div>
                  <div>
                    <p className="mb-2">
                      <p><strong>Correo:</strong></p><p>{profesor.usuario.email}</p>
                      <p><strong>Telefono:</strong></p>
                      {profesor.telefono ? (
                        <>
                          {profesor.telefono}
                        </>
                      ) : (
                        <p>No hay datos</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
<br />
<div className="rectangle border border-dark text-center p-3" style={{ background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} >
                  <div className="border-b-2 border-black mb-4">
                    <h2 className="text-xl font-bold">Conexion</h2>
                    <hr />
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong>Estado:</strong>
                      {profesor.usuario.is_active ? <span className="text-success">Activo</span> : <span className="text-danger">Inactivo</span>}
                    </p>
                    <p><strong>Verificado:</strong>
                    {profesor.usuario.is_verified ? <span className="text-success">Verificado</span> : <span className="text-danger">No verificado</span>}
                    </p>
                   
                  </div>
                </div>
            </div>
            <div className="col-sm-9">
              <div className="column"> {/* Estilo para la segunda columna debajo */}
                <HorarioTableNoModificaciones eventos={eventos} />
              </div>
            </div>
          </div>
        </div>



) : (
  <p>Cargando información del profesor...</p>
  )}
    </div>
  );
};


//   return (
//     <div>
//       <NavbarAdminAcademia />
//       <br /><br />
//       {profesor ? (
//         <div className="container pt-5">
//         <div className="row">
//           <div className="col-md-1"></div>
//           <div className="col-md-3 d-flex justify-content-center align-items-center">

//           <div className="d-flex justify-content-center align-items-center">
//       <Image
//         src={`${enlace}${profesor.foto_perfil}`}
//         alt="Foto de perfil"
//         className="img-fluid rounded-circle border border-3 border-primary"
//         style={{ width: '250px', height: '250px' }}
//       />
//     </div>
//             {/* <img src={enlace + profesor.foto_perfil} alt="Foto de perfil" className="img-fluid rounded-circle" style={{ width: '250px', height: '250px' }} /> */}
//           </div>
//           <div className="col-md-1"></div>
//           <div className="col-md-5">
//             <div className="p-3">
//               <h2 className="mb-4">{profesor.usuario.nombre} {profesor.usuario.primer_apellido} {profesor.usuario.segundo_apellido}
//               </h2>

            
            

//               <hr className="mb-4" />
//               {/* <h4 className="mb-2"><strong>Nombre:</strong> {profesor.usuario.nombre} {profesor.usuario.primer_apellido} {profesor.usuario.segundo_apellido}</h4> */}
//               <p className="mb-2"><strong>Teléfono:</strong> {profesor.telefono}</p>
//               <p className="mb-2" style={{ maxHeight: '200px', overflow: 'auto' }}> <br />
//               <strong>Descripción:</strong> {profesor.descripcion}              </p> <br />
//               <p className="mb-2"><strong>Email:</strong> {profesor.usuario.email}</p><br />
//               {profesor.usuario.academia && (
//               <p className="mb-2" style={{ marginBottom: '1rem' }}>
//                 <p><strong>Academia:</strong> {profesor.usuario.academia.nombre}</p> <br />
//               </p>
//             )}
//               <p className="mb-2">
//                 <strong>Estado:</strong> 
//                 {profesor.usuario.is_active ? <span className="text-success">Activo</span> : <span className="text-danger">Inactivo</span>}
//               </p> <br />
//               <p className="mb-2">
//                 <strong>Verificado:</strong> 
//                 {profesor.usuario.is_verified ? <span className="text-success">Verificado</span> : <span className="text-danger">No verificado</span>}
//               </p>
            
//             </div>
//           </div>
//           <div className="col-md-2">

//           <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
//                 Editar
//               </button>
//               <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
//                 {/* <CrearCurso/> */}
//                 <UpdateFormProfe id={profesor.id} />
//               </Modal>
//               <p className='invisible'>-----  -</p>
              
//           </div>
//         </div>
//       </div>
      
//       ) : (
//           <p>Cargando información del profesor...</p>
//         )}
//     </div>
//   );
// };
    