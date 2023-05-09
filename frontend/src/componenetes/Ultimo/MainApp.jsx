import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import React, { useEffect,useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { Home } from '../Basico/Home'
import { MainAlumno } from '../Alumno/MainAlumno'
import { HomeProfesor } from '../Profesor/HomeProfesor'
import { HomeAdmin } from '../Admin/HomeAdmin'
import jwt_decode from "jwt-decode";
import { Nosotros } from '../Basico/Nosotros';
import { Contacto } from '../Basico/Contacto';

export const App=()=> {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={<Home />} path="/"/>
            <Route element={<MainAlumno />} path="/alumno/*"/>
            <Route element={< HomeProfesor/>} path="/profesor/*"/>
            <Route element={< HomeAdmin/>} path="/admin/*"/>
            <Route element={< Nosotros/>} path="/nosotros"/>
            <Route element={< Contacto/>} path="/contacto"/>

            {/* <Route element={<LoginPage />} path="/login/"/> */}
            {/* <Route element={<MainProfesor/>} path="/profesor"/> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
