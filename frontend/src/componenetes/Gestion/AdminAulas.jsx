import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { NavbarAdminAcademia } from "../Admin/NavbarAdmin_Academia"
import { MostrarProfesores } from '../Datos/MostrarProfesores';
import { RegisterFormProfe } from '../conexion/register/RegisterComponenteProfe';
import { BotonCrearAula } from '../Datos/CrearAula';
import { MostrarAulas } from '../Datos/MostrarAula';

export const AdminAulas = () => {
  const [mostrarLista, setMostrarLista] = useState(true);

  const toggleMostrarLista = () => {
    setMostrarLista(!mostrarLista);
  }

  return (
    <>
      <NavbarAdminAcademia />
      <br /><br /><br /><br />
      <div style={{ display: "flex" }}>
      <div className="m-5" style={{ flex: "1", marginRight: "2rem" }}>
      <MostrarAulas/>
      </div>
      <div className="m-5" style={{ flex: "1" }}>
      <BotonCrearAula/>
      </div>
      </div>
    </>
  );
};