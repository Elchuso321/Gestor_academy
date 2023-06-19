import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import React, { useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { Home } from '../Basico/Home'
import { MainAlumno } from '../Alumno/MainAlumno'
import { HomeProfesor } from '../Profesor/HomeProfesor'
import { HomeAdmin } from '../Admin/HomeAdmin'
import jwt_decode from "jwt-decode";
import { Nosotros } from '../Basico/Nosotros';

import { MainAdmin } from '../Admin/MainAdmin';
import { MainProfesor } from '../Profesor/MainProfesor';
import "../estilos/estilosGenericos.css"
import { Contacto } from '../Basico/Contacto';
export const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>


          <Routes>

            <Route element={<Home />} path="/" />
            <Route element={<MainAlumno />} path="/alumno/*" />
            <Route element={< MainProfesor />} path="/profesor/*" />
            <Route element={< MainAdmin />} path="/admin/*" />
            <Route element={< Nosotros />} path="/nosotros" />
            <Route element={< Contacto />} path="/contacto" />

            {/* <Route element={<LoginPage />} path="/login/"/> */}
            {/* <Route element={<MainProfesor/>} path="/profesor"/> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
