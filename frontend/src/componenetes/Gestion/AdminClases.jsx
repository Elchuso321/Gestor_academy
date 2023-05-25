import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"
import { MostrarAulas } from '../Datos/MostrarAula';
import { CrearCurso } from '../Datos/CrearGrupo';
import { MostrarCursos } from '../Datos/MostrarCursos';


export const AdminClases = () => {
 
  return (
    <>
        <NavbarAdminAcademia/>
        <MostrarCursos/>
        <CrearCurso/>

    </>
  );
};
