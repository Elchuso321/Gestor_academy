import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { NavbarAlumnos } from './NavbarAlumno'
import { Tabla } from '../Generico/Tabla'
import { LogOut } from '../conexion/logout/logout'
// import { DatosAlumno } from '../conexion/datos/AlumnoDatos'
// import { MiCalendario } from '../Generico/CalendarioMuestra'
import jwt_decode from "jwt-decode";
import React, { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';
// import { MostrarAlumnos } from '../Datos/MostrarAlumnos'
import {MostrarAlumnos} from '../Datos/MostrarAlumnos'
import { MostrarAcademias } from '../Datos/MostrarAcademias'
import { MostrarProfesores } from '../Datos/MostrarProfesores'
import {MostrarCursos} from '../Datos/MostrarCursos'
import {MostrarEventos} from '../Datos/MostrarEventos'

export const Muestra=()=>{


    return(
        <>
        
         <div>
          <NavbarAlumnos/>
        </div>
        <div>
        
        <MostrarAlumnos/>
        <hr />
        <MostrarProfesores/>
        <hr />
        <MostrarAcademias/>
        <hr />
        <MostrarCursos/>
        <hr />
        <MostrarEventos/>
        {/* </> */}

        </div>
        


        </>
    )
}
