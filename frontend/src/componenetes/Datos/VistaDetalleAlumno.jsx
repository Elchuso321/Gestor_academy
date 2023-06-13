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
import { UpdateFormAlumnos } from '../conexion/update/UpdateComponenteAlumno';
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
    width: 600px; /* Establece el ancho máximo deseado */
    height: 80vh; /* Establece la altura máxima en relación a la altura de la ventana */
    overflow-y: auto; /* Habilita el desplazamiento vertical cuando se supere la altura máxima */
    `;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <button onClick={onClose} className ="btn btn-danger" style={{ float: 'right'}}>Cerrar</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export const DetalleAlumno = ({ id = 1 }) => {
  const { numId } = useParams();
  if (numId) {
    id = numId;
  }
  console.log("id:", id);
  
 

  const [fechaFormateada, setFechaFormateada] = useState("");
  const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);
  const [isModalOpenCrear, setIsModalOpenCrear] = useState(false);
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
  const [profesor, setProfesor] = useState("");
  const [usuario, setUsuario] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);

  const URL_API = import.meta.env.VITE_API_URL;
  const enlace = URL_API;
  useEffect(() => {
    const obtenerDetalleProfesor = async () => {
      console.log("id:", id);
      try {
        const response = await fetch(enlace + `/api/alumno/${id}/`, {
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
   // FECHA
   console.log("profesor:", profesor)
   if (profesor){
   if (profesor.usuario.last_login) {
   
  
  var fechaOriginal = profesor.usuario.last_login

  // Crear un objeto Date a partir de la cadena de fecha original
  var fecha = new Date(fechaOriginal);
  var fechaActual = new Date();

// Calcular la diferencia en milisegundos entre las dos fechas
var diferenciaMs = fechaActual - fecha;

// Calcular la diferencia en días redondeando hacia abajo
var diasTranscurridos = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

// Imprimir los días transcurridos
console.log("Días transcurridos: " + diasTranscurridos);
if (diasTranscurridos==0){
  diasTranscurridos="Hoy"
}else{
  diasTranscurridos="Hace "+diasTranscurridos+" días"
}

  fecha = new Date(fechaOriginal);
  // Obtener los componentes de fecha y hora de la fecha
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses en JavaScript están basados en cero, por lo que se suma 1
  var anio = fecha.getFullYear();
  var horas = fecha.getHours();
  var minutos = fecha.getMinutes();
  var segundos = fecha.getSeconds();
  
  // Formatear la fecha y hora con ceros a la izquierda si es necesario
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }
  
  // Crear la cadena de fecha en el formato deseado
  var fechaFormateada1 = dia + "/" + mes + "/" + anio + " ";
  var fechaSalida=diasTranscurridos+" - "+fechaFormateada1
  // Imprimir la fecha formateada
  console.log(fechaSalida);
  setFechaFormateada(fechaSalida);
}}
  // FIN FECHA
  }, [profesor]);

  return (
    <div>
      <NavbarAdminAcademia />
      <br /><br />
      {profesor ? (
        <div className="container pt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-3 d-flex justify-content-center align-items-center">

          <div className="d-flex justify-content-center align-items-center">
      <Image
        src={`${enlace}${profesor.foto_perfil}`}
        alt="Foto de perfil"
        className="img-fluid rounded-circle border border-3 border-primary"
        style={{ width: '250px', height: '250px' }}
      />
    </div>
            {/* <img src={enlace + profesor.foto_perfil} alt="Foto de perfil" className="img-fluid rounded-circle" style={{ width: '250px', height: '250px' }} /> */}
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="p-3">
              <h2 className="mb-4">{profesor.usuario.nombre} {profesor.usuario.primer_apellido} {profesor.usuario.segundo_apellido}
              </h2>

            
            

              <hr className="mb-4" />
              {/* <h4 className="mb-2"><strong>Nombre:</strong> {profesor.usuario.nombre} {profesor.usuario.primer_apellido} {profesor.usuario.segundo_apellido}</h4> */}
              
              <p className="mb-2" style={{ maxHeight: '200px', overflow: 'auto' }}> <br />
              <strong>Descripción:</strong> {profesor.descripcion}              </p> <br />
              <p className="mb-2"><strong>Email:</strong> {profesor.usuario.email}</p><br />
              <p className="mb-2"><strong>Madre:</strong> {profesor.nombre_madre}</p><br />
              <p className="mb-2"><strong>Teléfono Madre:</strong> {profesor.telefono_madre}</p><br />
              <p className="mb-2"><strong>Padre:</strong> {profesor.nombre_padre}</p><br />
              <p className="mb-2"><strong>Teléfono Padre:</strong> {profesor.telefono_padre}</p><br />
              {profesor.usuario.academia && (
              <p className="mb-2" style={{ marginBottom: '1rem' }}>
                <p><strong>Academia:</strong> {profesor.usuario.academia.nombre}</p> <br />
              </p>
            )}
            {profesor.usuario.last_login && (
              <p className="mb-2" style={{ marginBottom: '1rem' }}>
                <p><strong>Ultima conexion:</strong> {fechaFormateada}</p> <br />
              </p>
            )}
              <p className="mb-2">
                <strong>Estado:</strong> 
                {profesor.usuario.is_active ? <span className="text-success">Activo</span> : <span className="text-danger">Inactivo</span>}
              </p> <br />
              <p className="mb-2">
                <strong>Verificado:</strong> 
                {profesor.usuario.is_verified ? <span className="text-success">Verificado</span> : <span className="text-danger">No verificado</span>}
              </p>

              
            
            </div>
          </div>
          <div className="col-md-2">

          <button className="btn btn-primary btn-floating" onClick={handleTextClickEditar}>
                Editar
              </button>
              <Modal isOpen={isModalOpenEditar} onClose={handleCloseModal}>
                {/* <CrearCurso/> */}
                <UpdateFormAlumnos id={profesor.id} />
              </Modal>
              <p className='invisible'>-----  -</p>
              
          </div>
        </div>
      </div>
      
      ) : (
          <p>Cargando información del profesor...</p>
        )}
    </div>
  );
};

