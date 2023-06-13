
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { ComponenteChanel1 } from '../Chat2/ComponenteChat2';
import { HorarioTable } from './TablaHorarios';
import { useParams } from 'react-router-dom';
import { NavbarAdminAcademia } from '../Admin/NavbarAdmin_Academia';
import "../estilos/boton.css"
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { CrearEvento } from './CrearEvento';
import { UpdateFormClase } from '../conexion/update/UpdateClase';
const URL_API = import.meta.env.VITE_API_URL
const enlace=URL_API
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
        <button onClick={onClose}>Cerrar</button>
      </ModalContent>
    </ModalWrapper>
  );
};


export const VistaDetalleClase = ({ id = 0 }) => {
  const { numId } = useParams();
  if (numId) {
    id = numId;
  }
  const [profesores, setProfesores] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [isModalOpenCrear, setIsModalOpenCrear] = useState(false);
  const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);

  const [alumnos, setAlumnos] = useState([]);
  const [profesor, setProfesor] = useState([]);

  const handleTextClick = () => {
    setIsModalOpenCrear(true);
  };
  const handleTextClickEditar = () => {
    setIsModalOpenEditar(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenCrear(false);
    setIsModalOpenEditar(false);

  };

  // const handleCloseModalEditar = () => {
  // };
  console.log("id:", id)
  const [curso, setCurso] = useState("");
  const [usuario, setUsuario] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [notes, setNotes] = useState([])
  useEffect(() => {
    const obtenerDetalleCurso = async () => {
      console.log("id:", id)
      try {
        const response = await fetch(`${URL_API}/api/clase/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:", data)
          setCurso(data);
          console.log("profe:", curso)
        } else {
          console.error('Error al obtener el detalle del curso');
        }
      } catch (error) {
        console.error('Error de red', error);
      }

    }



    obtenerDetalleCurso();

  }, [id]);





  useEffect(() => {
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
        console.log("curso1:", curso)
        // filtrar eventos por aquellos que tengan el id del curso
        const eventosFiltrados = data.filter((evento) => evento.curso.id == curso.id)
        console.log("eventos filtrados:", eventosFiltrados)
        setNotes(eventosFiltrados)


      } else if (response.statusText === 'Unauthorized') {
        console.log("fallo")
        logoutUser()
      }
    }
    getNotes()
  }, [curso])



  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch(`${URL_API}/api/profesores/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfesor(data);
        } else if (response.statusText === 'Unauthorized') {
          console.log('Fallo');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
    };

    getNotes();
  }, [])

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch(`${URL_API}/api/alumnos/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("alumnos:", data)
          setAlumnos(data);
        } else if (response.statusText === 'Unauthorized') {
          console.log('Fallo');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
    };

    getNotes();
  }, [])



  return (
    <>
      <NavbarAdminAcademia />
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Primer div con el 70% de ancho */}
            {curso ? (
              <div>
                 <div className="d-flex justify-content-center align-items-center">
                    <Image
                      src={`${enlace}${curso.imagen}`}
                      alt={`${enlace}${curso.imagen}`}
                      className="img-fluid rounded-circle border border-3 border-primary"
                      style={{ width: '250px', height: '250px' }}
                    />
                  </div>
                <h2>
                  <h2>&#10060;</h2>
                  


                  nombre: {curso.nombre} apellido {curso.descripcion}
                </h2>
                <p>academia: {curso.academia.nombre}</p>
                {/* <HorarioTable eventos={notes} /> */}
              </div>
            ) : (
              <p>Cargando información del curso...</p>
            )}
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
                Editar
              </button>
              <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
                hola
                <UpdateFormClase  id={curso.id}/>

              </Modal>
              <p className='invisible'>-----  -</p>
              <button className="custom-button" onClick={handleTextClick}>
                Crear
              </button>
              <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
               
                <CrearEvento />
              </Modal>
            </div>
            {/* Segundo div con el 30% de ancho */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="rectangle border border-dark text-center p-3 mb-4">
                  <h3>Profesores</h3>
                  <hr />
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {/* Rectángulo más grande */}

                    {profesor.map((note) => (
                      <p key={note.id}>{note.usuario.nombre}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="rectangle border border-dark text-center p-3 mb-4">
                  <h3>Alumnos</h3>
                  <hr />
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {/* Rectángulo más grande */}

                    {alumnos.map((note) => (
                    <p key={note.id}>{note.usuario.nombre}</p>
                  ))}
                  </div>
                </div>
              </div>
             </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-12">
            {/* Primer div con el 100% de ancho */}
            <HorarioTable eventos={notes} />
            {/* <HorarioTableCrear eventos={eventosFiltrados} /> */}
          </div>
        </div>
      </div>
    </>

    //     <>
    //   <NavbarAdminAcademia />
    //   <div className="container mt-5 pt-5">
    //     <div className="row">
    //       <div className="col-lg-8">
    //         {/* Primer div con el 70% de ancho */}
    //         {curso ? (
    //           <div>
    //             <h2>
    //               nombre: {curso.nombre} apellido {curso.descripcion}
    //             </h2>
    //             <p>academia: {curso.academia.nombre}</p>
    //             {/* <HorarioTable eventos={notes} /> */}
    //           </div>
    //         ) : (
    //           <p>Cargando información del curso...</p>
    //         )}
    //       </div>
    //       <div className="col-lg-4 mt-4 mt-lg-0">
    //         <div className="d-flex justify-content-center">
    //           <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
    //             Editar
    //           </button>
    //           <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
    //             {/* <CrearCurso/> */}
    //             editar
    //           </Modal>
    //           <button className="custom-button" onClick={handleTextClick}>
    //             Crear
    //           </button>
    //           <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
    //             {/* <CrearCurso/> */}
    //             <CrearEvento />
    //           </Modal>
    //         </div>
    //         {/* Segundo div con el 30% de ancho */}
    //         <div className="row mt-4">
    //           <div className="col-md-6">
    //             <div className="rectangle border border-dark text-center p-3 mb-4">
    //               {/* Rectángulo más pequeño */}
    //               <h3>Profesores</h3>
    //               <hr />
    //               {profesor.map((note) => (
    //                 <p key={note.id}>{note.usuario.nombre}</p>
    //               ))}
    //             </div>
    //           </div>
    //           <div className="col-md-6">
    //             <div className="rectangle border border-dark text-center p-3">
    //               {/* Rectángulo más pequeño */}
    //               <h3>Alumnos</h3>
    //               <hr />
    //               {alumnos.map((note) => (
    //                 <p key={note.id}>{note.usuario.nombre}</p>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row mt-4">
    //       <div className="col-lg-12">
    //         {/* Primer div con el 100% de ancho */}
    //         <HorarioTable eventos={notes} />
    //         {/* <HorarioTableCrear eventos={eventosFiltrados} /> */}
    //       </div>
    //     </div>
    //   </div>
    // </>

    //     <>
    //   <NavbarAdminAcademia />
    //   {/* <br /><br /> */}
    //   <div className="container mt-5 pt-5">
    //     <div className="row">
    //       <div className="col-lg-8">
    //         {/* Primer div con el 70% de ancho */}
    //         {curso ? (
    //           <div>
    //             <h2>
    //               nombre: {curso.nombre} apellido {curso.descripcion}
    //             </h2>
    //             <p>academia: {curso.academia.nombre}</p>
    //             {/* <HorarioTable eventos={notes} /> */}
    //           </div>
    //         ) : (
    //           <p>Cargando información del curso...</p>
    //         )}
    //       </div>
    //       <div className="col-lg-4 mt-4 mt-lg-0">

    //         <div className="d-flex justify-content-center">
    //           <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
    //             Editar
    //           </button>
    //           <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
    //             {/* <CrearCurso/> */}
    //             editar
    //           </Modal>
    //           <button className="custom-button" onClick={handleTextClick}>
    //             Crear
    //           </button>
    //           <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
    //             {/* <CrearCurso/> */}
    //             <CrearEvento />
    //           </Modal>

    //         {/* Segundo div con el 30% de ancho */}
    //         <div className="rectangle border border-dark text-center p-3 mb-4">
    //           {/* Rectángulo más pequeño */}
    //           <h3>Profesores</h3>
    //           <hr />
    //           {profesor.map((note) => (
    //             <p key={note.id}>{note.usuario.nombre}</p>
    //           ))}
    //         </div>
    //         <div className="rectangle border border-dark text-center p-3">
    //           {/* Rectángulo más pequeño */}
    //           <h3>Alumnos</h3>
    //           <hr />
    //           {alumnos.map((note) => (
    //             <p key={note.id}>{note.usuario.nombre}</p>
    //           ))}
    //         </div>
    //       </div>

    //     <div className="row mt-4">

    //       <div className="col-lg-8">
    //         {/* Primer div con el 70% de ancho */}
    //         <HorarioTable eventos={notes} />
    //         {/* <HorarioTableCrear eventos={eventosFiltrados} /> */}
    //       </div>


    //       </div>
    //     </div>
    //   </div>

    //   </div>
    // </>

    //     <>
    //      <NavbarAdminAcademia/>
    //         <br /><br /><br /><br />

    //         {curso 
    //         ? <div>
    //           <h2>nombre:{curso.nombre} apellido {curso.descripcion}</h2>
    //           <p>academia: {curso.academia.nombre}</p>

    //           {/* <HorarioTable eventos={notes}/> */}
    //         </div>
    //         : <p>Cargando información del curso...</p>
    //         }
    //         <div className="container">
    //       <div className="row">
    //         <div className="col-9">
    //           {/* Primer div con el 70% de ancho */}
    //           <HorarioTable eventos={notes}/>
    //           {/* <HorarioTableCrear eventos={eventosFiltrados}/> */}
    //         </div>
    //         <div className="col-1"></div>
    //         <div className="col-2 ">
    //           <br />
    //           <div className="  d-flex justify-content-center ">
    //           <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
    //             Editar
    //     </button>
    //     <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
    //       {/* <CrearCurso/> */}
    //         editar
    //       </Modal>
    //       <p className='invisible'>-</p>
    //           <button className="custom-button" onClick={handleTextClick}>
    //             Crear
    //     </button>
    //     <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
    //       {/* <CrearCurso/> */}
    //       <CrearEvento/>
    //       </Modal>
    // <br />
    // </div>
    // <br />

    //           <br />

    //           <div className=" rectangle border border-dark text-center">

    //             <br />

    //             <h3>Profesores</h3>
    //             <hr />
    //             {profesor.map((note) => (
    //             <p key={note.id}>
    //              {note.usuario.nombre}
    //             </p>
    //           ))}
    //             {/* <MostrarCursos cursoPasado={cursoFiltrado}/> */}
    //           </div>
    //           <br /><br />
    //           <div className=" rectangle border border-dark text-center">
    //             {/* Rectángulo más pequeño */}
    //             <br />

    //             <h3>Alumnos</h3>
    //             <hr />
    //             {alumnos.map((note) => (
    //             <p key={note.id}>
    //              {note.usuario.nombre}
    //             </p>
    //           ))}
    //             {/* <MostrarCursos cursoPasado={cursoFiltrado}/> */}
    //           </div>
    //         </div>
    //       </div>
    //     </div>


    //     </>
  );
};
