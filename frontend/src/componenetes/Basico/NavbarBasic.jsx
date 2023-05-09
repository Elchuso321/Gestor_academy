


import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LoginBotonBasic } from "./BotonLogin";

export const NavbarBasic = () => {
    
    return (
        <>
          <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid">
            <Navbar.Brand href="#">
              <img src="https://oxford-academy.es/wp-content/uploads/2018/05/oxford.jpg" alt="Oxford Academy" id="logo" className="navbar-brand" style={{maxHeight: '100%', margin: '0px 15px', padding: '0px'}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
              <Nav>
                <Nav.Link  as={Link} to="/" style={{color: 'blue'}}>
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/nosotros" style={{color: 'blue'}}>
                  Nosotros
                </Nav.Link>
                <Nav.Link as={Link} to="/contacto" style={{color: 'blue'}}>
                  Contacto
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/admin" style={{color: 'blue'}}>
                  Admin
                </Nav.Link> */}
              </Nav>
              <Nav>
                <LoginBotonBasic/>                
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    </>
      
  );
}
