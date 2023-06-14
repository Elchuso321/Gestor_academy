import { Button } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"
import { MostrarAulas } from '../Datos/MostrarAula';
import { CrearCurso } from '../Datos/CrearCurso';
import { MostrarCursos } from '../Datos/MostrarCursos';
import { HorarioTable } from '../Datos/TablaHorarios';
import { HorarioTableCrear } from '../Datos/TablaDatosCrear';
import "../estilos/boton.css"
import styled from 'styled-components';
import { VistaDetalleClase } from '../Datos/VistaDetalleClase';
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
  padding: 20px;
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
        <button onClick={onClose} className ="btn btn-danger" style={{ float: 'right'}}>
        Cerrar
      </button>
      </button>
      </ModalContent>
    </ModalWrapper>
  );
};

export const AdminClases = () => {
  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)
  const [cursoFiltrado, setCursoFiltrado] = useState("");
  const [filtro, setFiltro] = useState("");
  
  const [eventos, setEventos] = useState("");
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTextClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      
    };
    useEffect(()=> {
        let getNotes = async() =>{
          let response = await fetch(`${URL_API}/api/eventos/`, {
              method:'GET',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(authTokens.access)
              }
          })
          let data = await response.json()
          
          if(response.status === 200){
              console.log("eventos:",data)
            // filtrar eventos por aquellos que tengan el id del curso
            //   const eventosFiltrados=data.filter((evento)=>evento.curso==curso.id)
            //   console.log("eventos filtrados:",eventosFiltrados)
              setEventos(data)
              setEventosFiltrados(data)
              
    
          }else if(response.statusText === 'Unauthorized'){
              console.log("fallo")
              logoutUser()
          }
      }
        getNotes()
      },[])
    
  
  let getNotes = async() =>{
      let response = await fetch(`${URL_API}/api/cursos/`, {
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      })
      let data = await response.json()
      
      if(response.status === 200){
          console.log("cursos",data)
          setNotes(data)
         

      }else if(response.statusText === 'Unauthorized'){
          console.log("fallo")
          // logoutUser()
      }
  }
  const onChangeFiltro = (e) => {
    console.log("Cambio filtro")
    setFiltro(e.target.value);
  };
  const sumbitFiltroChange = (e) => {
    e.preventDefault();
    setCursoFiltrado(notes.filter((note)=>note.nombre.toLowerCase().includes(filtro.toLowerCase())))
    setEventosFiltrados(eventos.filter((evento)=>evento.curso.nombre.toLowerCase().includes(filtro.toLowerCase())))
    console.log("eventos2",eventosFiltrados)
    console.log("notes",notes)
    console.log("sumbit",notes.filter((note)=>note.nombre.toLowerCase().includes(filtro.toLowerCase())))
  };
  useEffect(()=> {
        
    getNotes()
       
  },[])
  // useEffect(()=> {
  //   // quiero filtrar los cursos por aquellos que tengan contenido los caracteres que se ingresen en filtro
  //   setNotes(notes.filter((note)=>note.nombre.toLowerCase().includes(filtro.toLowerCase())))
  //   console.log()
  // },[filtro])
  return (


    <>
  <NavbarAdminAcademia />
  <div className="container mt-5 pt-5">
    <div className="row">
      <div className="col-lg-9">
        {/* Primer div con el 70% de ancho */}
        <HorarioTableCrear eventos={eventosFiltrados} />
      </div>
      <div className="col-lg-3 mt-4 mt-lg-0">
        {/* Segundo div con el 30% de ancho */}
        <div className="rectangle border border-dark text-center p-3">
          {/* Rectángulo más pequeño */}
          <h3>Clases</h3>
          <hr />
          <MostrarCursos cursoPasado={cursoFiltrado} />
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-center">
            <button className="custom-button" onClick={handleTextClick}>
              Crear
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <CrearCurso />
            </Modal>
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-center">
            <form action="submit" onSubmit={sumbitFiltroChange}>
              <input
                type="text"
                placeholder="Buscar"
                value={filtro}
                onChange={onChangeFiltro}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  );
};
