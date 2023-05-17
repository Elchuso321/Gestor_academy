import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"
import { MostrarProfesores } from '../Datos/MostrarProfesores';


export const AdminProfesores = () => {
 
  return (
    <>
      <NavbarAdminAcademia/>
      <br /><br /><br /><br />
      <button class="primaey">Crear</button>
      <h2>Lista</h2>
      <MostrarProfesores/>
    </>
  );
};
