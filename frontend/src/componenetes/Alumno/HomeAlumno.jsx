import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { NavbarAlumnos } from './NavbarAlumno'
import { Tabla } from '../Generico/Tabla'
import { LogOut } from '../conexion/logout/logout'
import jwt_decode from "jwt-decode";
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';
import { MostrarAlumnos } from '../Datos/MostrarAlumnos'
import { ChatComponent } from '../Chat/ComponenteChat'
import { ComponenteChanel1 } from '../Chat2/ComponenteChat2'
import { MostrarCursosCaja } from '../Datos/MostrarCursosCajas'
import { PerfilUsuario } from '../Datos/PerfilUsuario'
import { HorarioTable } from '../Datos/TablaHorarios'
import { DetalleAlumno } from './DatosAlum.jsx/DetalleAlumno'
import { useParams } from 'react-router-dom';


const URL_API = import.meta.env.VITE_API_URL
export const HomeAlumno = () => {
  
  const id=JSON.parse(localStorage.getItem('id'))
  const navigate = useNavigate()
  let { authTokens } = useContext(AuthContext)
  const usuario=JSON.parse(localStorage.getItem('usuario'))
  useEffect(() => {


    if (authTokens) {
      console.log("authTokens_HomeAlumno:", authTokens)
      let decodedToken = jwt_decode(authTokens.access)
      if (decodedToken.group !== 'Alumnos') {
        navigate("/")
      }
    } else {
      navigate("/")

    }

  }, [authTokens])


  return (
  //   <>
  //   <NavbarAlumnos />

  //   <div className="d-flex flex-wrap">
  //     <div className="flex-grow-1">
  //       <PerfilUsuario />
  //     </div>
  //     <div className="w-100 mt-3 mt-md-0 ml-md-3">
  //       <MostrarCursosCaja />
  //     </div>
  //   </div>
  // </>
    <>
    
      <div>
        <NavbarAlumnos />
      </div>

      <DetalleAlumno id={id}/>
      {/* <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 50%' }}>
        <PerfilUsuario/>

       </div> */}
      {/* <div style={{ width: '15%' }} className="ml-10">
        <div className="">
          <MostrarCursosCaja />
        </div>
      </div>
      */}
      
    </>
  )
}





// const diccionario = [
//   {
//     src: "https://via.placeholder.com/800x500",
//     alt: "First slide",
//     title: "First slide label",
//     description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
//   },
//   {
//     src: "https://via.placeholder.com/800x500",
//     alt: "Second slide",
//     title: "Second slide label",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     src: "https://via.placeholder.com/800x500",
//     alt: "Third slide",
//     title: "Third slide label",
//     description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
//   },
// ];