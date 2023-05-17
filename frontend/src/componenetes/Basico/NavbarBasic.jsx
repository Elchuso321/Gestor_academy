import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button,NavDropdown } from "react-bootstrap";
import { LoginBotonBasic } from "./BotonLogin";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export const NavbarBasic = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const style = {
    backgroundColor: '#fff',
    color: '#333',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999
  };

  return (
    <div className="container-fluid" style={style}>
      <div className="container py-3">
        <Navbar expand="md" variant="light" className="px-0">
          <Navbar.Brand href="#">
            <img
              src=""
              alt="Academy"
              id="logo"
              className="navbar-brand"
              style={{ maxHeight: '100%', margin: '0px 15px', padding: '0px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav>
            
              <Nav.Link as={Link} to="/" className="mx-3">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/nosotros" className="mx-3">
                Nosotros
              </Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="mx-3">
                Contacto
              </Nav.Link>
              <NavDropdown className="mx-3" title="Productos" id="basic-nav-dropdown" onClick={handleSubMenu} show={showSubMenu}>
                <NavDropdown.Item href="/productos/producto-1">Producto 1</NavDropdown.Item>
                <NavDropdown.Item href="/productos/producto-2">Producto 2</NavDropdown.Item>
                <NavDropdown.Item href="/productos/producto-3">Producto 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="align-items-center">
              {/* <div className="d-flex justify-content-center align-items-center mx-3">
                <FaPhoneAlt className="me-2" />
                <p className="mb-0">123-456-7890</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mx-3">
                <FaEnvelope className="me-2" />
                <p className="mb-0">info@ejemplo.com</p>
              </div> */}
              <LoginBotonBasic />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};


// import React from 'react';
// import { Link } from 'react-router-dom';

// export const NavbarBasic = () => {
//   const style = {
//     backgroundColor: '#333',
//     color: '#fff',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     zIndex: 9999
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark" style={style}>
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">Ejemplo Academy</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Inicio</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/cursos">Cursos</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contacto">Contacto</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };


// import React from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import { LoginBotonBasic } from "./BotonLogin";
// import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// export const NavbarBasic = () => {
//   const style = {
//     backgroundColor: '#f5f5f5',
//     color: '#333'
//   };

//   return (
//     <div className="container-fluid" style={style}>
//       <div className="container py-3">
//         <Navbar expand="md" variant="light" sticky="top" className="px-0">
//           <Navbar.Brand href="#">
//             <img
//               src=""
//               alt="Academy"
//               id="logo"
//               className="navbar-brand"
//               style={{ maxHeight: '100%', margin: '0px 15px', padding: '0px' }}
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
//             <Nav>
//               <Nav.Link as={Link} to="/" className="mx-3">
//                 Inicio
//               </Nav.Link>
//               <Nav.Link as={Link} to="/nosotros" className="mx-3">
//                 Nosotros
//               </Nav.Link>
//               <Nav.Link as={Link} to="/contacto" className="mx-3">
//                 Contacto
//               </Nav.Link>
//             </Nav>
//             <Nav className="align-items-center">
//               {/* <div className="d-flex justify-content-center align-items-center mx-3">
//                 <FaPhoneAlt className="me-2" />
//                 <p className="mb-0">123-456-7890</p>
//               </div>
//               <div className="d-flex justify-content-center align-items-center mx-3">
//                 <FaEnvelope className="me-2" />
//                 <p className="mb-0">info@ejemplo.com</p>
//               </div> */}
//               <LoginBotonBasic />
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>
//       </div>
//     </div>
//   );
// };

// // // import React from "react";
// // // import { Link } from "react-router-dom";
// // // import { Navbar, Nav, Button } from "react-bootstrap";
// // // import { LoginBotonBasic } from "./BotonLogin";

// // // export const NavbarBasic = () => {
    
// // //     return (
// // //         <>
// // //           <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid">
// // //             <Navbar.Brand href="#">
// // //             {/* https://oxford-academy.es/wp-content/uploads/2018/05/oxford.jpg */}
// // //               <img src="" alt="Academy" id="logo" className="navbar-brand" style={{maxHeight: '100%', margin: '0px 15px', padding: '0px'}} />
// // //             </Navbar.Brand>
// // //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
// // //             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
// // //               <Nav>
// // //                 <Nav.Link  as={Link} to="/" style={{color: 'blue'}}>
// // //                   Inicio
// // //                 </Nav.Link>
// // //                 <Nav.Link as={Link} to="/nosotros" style={{color: 'blue'}}>
// // //                   Nosotros
// // //                 </Nav.Link>
// // //                 <Nav.Link as={Link} to="/contacto" style={{color: 'blue'}}>
// // //                   Contacto
// // //                 </Nav.Link>
// // //                 {/* <Nav.Link as={Link} to="/admin" style={{color: 'blue'}}>
// // //                   Admin
// // //                 </Nav.Link> */}
// // //               </Nav>
// // //               <Nav>
// // //                 <LoginBotonBasic/>                
// // //               </Nav>
// // //             </Navbar.Collapse>
// // //           </Navbar>
// // //     </>
      
// // //   );
// // // }
