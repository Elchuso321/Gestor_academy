
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';

export const NavbarAlumnos = () => {
  
  let {setAuthTokens,setUser} = useContext(AuthContext)
  const navigate=useNavigate()
  let logoutUser = () => {
    
    setAuthTokens(null)
    setUser(null)
    console.log("setAuthTokens y user a null")
    localStorage.removeItem('authTokens')
    // esto para redirigir en caso de que no este logeado
    navigate('/')
}

    return (
        <>
        <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid">
            <Navbar.Brand href="#">
                <img src="https://oxford-academy.es/wp-content/uploads/2018/05/oxford.jpg" alt="Oxford Academy" id="logo" className="navbar-brand" style={{maxHeight: '100%', margin: '0px 15px', padding: '0px'}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav>
                <Nav.Link as={Link} to="/" style={{color: 'blue'}}>
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/alumnos" style={{color: 'blue'}}>
                  Alumnos
                </Nav.Link>
                <Nav.Link as={Link} to="/profesores" style={{color: 'blue'}}>
                  Profesores
                </Nav.Link>
                <Nav.Link as={Link} to="/admin" style={{color: 'blue'}}>
                  Admin
                </Nav.Link>
              </Nav>
              <Nav>
                Alumno:<strong>Nombre</strong>
                </Nav>
              <Button variant="secondary" onClick={logoutUser}>
                Log Out
              </Button>
            </Navbar.Collapse>
    </Navbar>
    </>
      
  );
}
