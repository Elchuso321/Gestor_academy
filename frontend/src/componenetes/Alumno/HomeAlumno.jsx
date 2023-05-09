import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { NavbarAlumnos } from './NavbarAlumno'
import { Tabla } from '../Generico/Tabla'
import { LogOut } from '../conexion/logout/logout'
import { DatosAlumno } from '../conexion/datos/AlumnoDatos'
// import { MiCalendario } from '../Generico/CalendarioMuestra'
import jwt_decode from "jwt-decode";
import React, { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';


export const HomeAlumno=()=>{


  const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    useEffect(() => {
    
    
    if(authTokens){
      console.log("authTokens_HomeAlumno:",authTokens)
      let decodedToken = jwt_decode(authTokens.access)
        if (decodedToken.group !== 'Alumnos') {
          navigate("/")
        }
    }else{
        navigate("/")
   
    }
        
	},[])
    const diccionario = [
        {
          src: "https://via.placeholder.com/800x500",
          alt: "First slide",
          title: "First slide label",
          description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
        },
        {
          src: "https://via.placeholder.com/800x500",
          alt: "Second slide",
          title: "Second slide label",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          src: "https://via.placeholder.com/800x500",
          alt: "Third slide",
          title: "Third slide label",
          description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
        },
      ];
    return(
        <>

        <div>
          <NavbarAlumnos/>
        </div>
        <div>
        <h4>ALUMNO</h4>
        {/* <DatosAlumno/> */}
        {/* <Tabla props={diccionario}/> */}
        {/* <MiCalendario/> */}
        </div>
        {/* <LogOut/> */}


        </>
    )
}
