
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';

export const NavbarAlumnos = () => {
  
  let {setAuthTokens,setUser} = useContext(AuthContext)
  const navigate=useNavigate()
  let logoutUser = () => {
    setAuthTokens("")
    setUser("")
    console.log("setAuthTokens y user a null")
    // localStorage.removeItem('authTokens')
    // setTimeout(navigate('/'), 10000);

    
    
}

    return (
        <>
        <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid">
            <Navbar.Brand href="#">
            {/* https://oxford-academy.es/wp-content/uploads/2018/05/oxford.jpg */}
                <img src="" alt="Academy4321" id="logo" className="navbar-brand" style={{maxHeight: '100%', margin: '0px 15px', padding: '0px'}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav>
                <Nav.Link as={Link} to="/" style={{color: 'blue'}}>
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/alumno" style={{color: 'blue'}}>
                  Alumnos
                </Nav.Link>
                <Nav.Link as={Link} to="/alumno/muestra" style={{color: 'blue'}}>
                  Muestra
                </Nav.Link>
                
                {/* <Nav.Link as={Link} to="/admin" style={{color: 'blue'}}>
                  Admin
                </Nav.Link> */}
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
