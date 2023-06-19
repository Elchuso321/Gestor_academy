import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"
import axios from 'axios';
import { MostrarAlumnos } from '../Datos/MostrarAlumnos';
import { RegisterFormAlumno } from '../conexion/register/RegisterComponenteAlumno';
// import { RegisterFormAlumno1 } from '../conexion/register/RegisterAlumnos';

export const AdminAlumnos = () => {
  

  return (
    <>
    <NavbarAdminAcademia/>
    <MostrarAlumnos/>
    {/* <RegisterFormAlumno/> */}
    {/* <RegisterFormAlumno1/> */}
    </>
  );
};
