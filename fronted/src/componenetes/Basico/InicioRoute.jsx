import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import AddProfesor from '../AddProfesor'
import { Inicio } from './Inicio'
import { Home } from './Home'
import { HomeAlumno } from '../Alumno/HomeAlumno'
import { HomeProfesor } from '../Profesor/HomeProfesor'
import { HomeAdmin } from '../Admin/HomeAdmin'

export const InicioRoute=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/alumnos" element={<HomeAlumno/>}/>
            <Route path="/profesores" element={<HomeProfesor/>}/>
            <Route path="/admin" element={<HomeAdmin/>}/>
            {/* <Route path="/login" element={<LoginPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/*" element={<Navigate to="/about"/>}/> */}
        </Routes>
        </>
    )
}

// import React, { useState } from 'react';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import './App.css';

// function App() {
//   const [selectedOption, setSelectedOption] = useState('inicio');

//   const handleMenuClick = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className="App">
//       <Navbar bg="light" expand="lg">
//         <Navbar.Brand href="#">Academia de Clases Particulares de Inglés</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link onClick={() => handleMenuClick('inicio')}>Inicio</Nav.Link>
//             <Nav.Link onClick={() => handleMenuClick('nosotros')}>Sobre nosotros</Nav.Link>
//             <Nav.Link onClick={() => handleMenuClick('contacto')}>Contáctanos</Nav.Link>
//           </Nav>
//           <Nav>
//             <Nav.Link href="#">Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <Container>
//         {selectedOption === 'inicio' && <Inicio />}
//         {selectedOption === 'nosotros' && <SobreNosotros />}
//         {selectedOption === 'contacto' && <Contacto />}
//       </Container>
//     </div>
//   );
// }

// function Inicio() {
//   return (
//     <div>
//       <h1>Bienvenido a la Academia de Clases Particulares de Inglés</h1>
//       <p>Aquí encontrarás los mejores profesores para aprender inglés de forma personalizada.</p>
//       <img src="https://via.placeholder.com/800x400" alt="clase de inglés" />
//     </div>
//   );
// }

// function SobreNosotros() {
//   return (
//     <div>
//       <h1>Sobre nosotros</h1>
//       <p>En la Academia de Clases Particulares de Inglés nos dedicamos a brindar una enseñanza personalizada y de calidad para que puedas alcanzar tus objetivos de aprendizaje.</p>
//       <img src="https://via.placeholder.com/800x400" alt="academia" />
//     </div>
//   );
// }

// function Contacto() {
//   return (
//     <div>
//       <h1>Contáctanos</h1>
//       <p>Para más información o para reservar una clase, puedes escribirnos a nuestro correo electrónico o llamarnos a nuestro teléfono:</p>
//       <ul>
//         <li>Correo electrónico: academia@clasesdeingles.com</li>
//         <li>Teléfono: +1 234 567 8901</li>
//       </ul>
//       </div>
//   )}
