
import React, { useState, useEffect,useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { ComponenteChanel1 } from '../Chat2/ComponenteChat2';
import { NavbarAlumnos } from './NavbarAlumno';

export const DetalleClase = () => {

  
  return (
    <>
    <NavbarAlumnos/>
    <ComponenteChanel1/>
    
    </>
  );
};