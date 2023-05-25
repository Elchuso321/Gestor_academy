import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"
import axios from 'axios';
import { MostrarAlumnos } from '../Datos/MostrarAlumnos';
import { RegisterFormAlumno } from '../conexion/register/RegisterComponenteAlumno';

export const AdminAlumnos = () => {
  // const getCursoImagen = (cursoId) => {
  //   return fetch(`'http://127.0.0.1:8000/api/cursos/${cursoId}/imagen/`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Error al obtener la imagen del curso');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       return data.imagen;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  
  // Obtener la URL de la imagen de un curso
  // getCursoImagen(1).then(url => {
  //   console.log(url);
  // });
  // const getCursoImagen = (cursoId) => {
  //   return axios.get(`/api/cursos/${cursoId}/imagen/`)
  //     .then(response => {
  //       return response.data.imagen;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  // getCursoImagen(1).then(url => {
  //   console.log(url);
  // });

  return (
    <>
    <NavbarAdminAcademia/>
    <MostrarAlumnos/>
    <RegisterFormAlumno/>
    </>
  );
};
