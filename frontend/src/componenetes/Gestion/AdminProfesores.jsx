import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { NavbarAdminAcademia } from "../Admin/NavbarAdmin_Academia"
import { MostrarProfesores } from '../Datos/MostrarProfesores';
import { RegisterFormProfe } from '../conexion/register/RegisterComponenteProfe';

export const AdminProfesores = () => {
  const [mostrarLista, setMostrarLista] = useState(true);

  const toggleMostrarLista = () => {
    setMostrarLista(!mostrarLista);
  }

  return (
    <>
      <NavbarAdminAcademia />
      <br /><br /><br /><br />
      {mostrarLista ? (
        <>
         
          <h2>Lista</h2>
          <MostrarProfesores mostrar={toggleMostrarLista}/>
        </>
      ) : (
        <>
        
          <h2>Crear Profesor</h2>
          <RegisterFormProfe mostrar={toggleMostrarLista}/>
        </>
      )}
    </>
  );
};


// import { Button, Modal } from 'react-bootstrap';
// import AuthContext from '../Ultimo/AuthContext';
// import jwt_decode from "jwt-decode";
// import React, { useState,useEffect,useContext } from 'react';
// import {useNavigate} from 'react-router-dom'
// import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"
// import { MostrarProfesores } from '../Datos/MostrarProfesores';
// import { RegisterFormProfe } from '../conexion/register/RegisterComponenteProfe';


// export const AdminProfesores = () => {
 
//   return (
//     <>
//       <NavbarAdminAcademia/>
//       <br /><br /><br /><br />
//       <button className="primaey">Crear</button>
//       <h2>Lista</h2>
//       <MostrarProfesores/>
//       <RegisterFormProfe/>
//     </>
//   );
// };
