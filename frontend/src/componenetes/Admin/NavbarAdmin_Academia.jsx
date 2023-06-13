// import { fallDown as SlideMenu } from 'react-burger-menu';
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../Ultimo/AuthContext';
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
// import ColorSquareComponent from './componentes/BotonesAcademiaSelect';

// export const NavbarAdminAcademia = () => {
//   const menuStyles = {
//     bmBurgerButton: {
//       position: 'fixed',
//       width: '36px',
//       height: '30px',
//       left: '20px',
//       top: '20px',
//     },
//     bmBurgerBars: {
//       background: '#373a47',
//     },
//     bmBurgerBarsHover: {
//       background: 'red',
//     },
//     bmCrossButton: {
//       height: '24px',
//       width: '24px',
//     },
//     bmCross: {
//       background: 'rgb(92, 179, 252',
//     },
//     bmMenuWrap: {
//       position: 'fixed',
//       height: '100%',
//       zIndex: 10000,
//     },
//     bmMenu: {
//       top:0,
//       position: "fixed",
//       background: 'rgb(92, 179, 252)',
//       padding: '2.5em 1.5em 0',
//       fontSize: '1.15em',
//     },
//     bmMorphShape: {
//       fill: '#373a47',
//     },
//     bmItemList: {
//       color: '#b8b7ad',
//       padding: '0.8em',
//     },
//     bmItem: {
//       display: 'inline-block',
//     },
//     bmOverlay: {
//       top:0,
//       position: "fixed",
//       background: 'rgba(0, 0, 0, 0.3)',
//     },
//   };
//   const navbarStyles = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '60px',
//     zIndex: 9999,
//   };
//   const academia = localStorage.getItem("academia") || "No se donde estas"
//   const { setAuthTokens, setUser } = useContext(AuthContext)
//   const navigate = useNavigate()
//   const usuario = localStorage.getItem('usuario') || 'Invitado';

//   const logoutUser = () => {
//     setAuthTokens(null)
//     setUser(null)
//     localStorage.removeItem('authTokens')
//     navigate('/')
//   };

//   const changeAcademia = () => {
//     console.log('Cambio de academia');
//     navigate("/admin")
//   };

//   const [showSubMenu, setShowSubMenu] = useState(false);

//   const handleSubMenu = () => {
//     setShowSubMenu(!showSubMenu);
//   };

//   return (
//     <Navbar expand="lg" variant="light" className="bg-white shadow-sm" style={navbarStyles}>
//       <Navbar.Brand>
//         <SlideMenu styles={menuStyles}>
//           <div className="d-flex flex-column justify-content-center align-items-center">
//             <ColorSquareComponent color="red" texto="Profesores" />
//             <ColorSquareComponent color="green" texto="Alumnos" />
//             <ColorSquareComponent color="blue" texto="Clases" />
//             <ColorSquareComponent color="purple" texto="Boletines" />
//             <ColorSquareComponent color="orange" texto="Pagos" />
//             <Button variant="link" className="text-white" onClick={logoutUser}>
//               Cerrar sesión
//             </Button>
//           </div>
//         </SlideMenu>
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//         <Nav>
//           <NavDropdown title="Productos" id="basic-nav-dropdown" onClick={handleSubMenu} show={showSubMenu}>
//             <NavDropdown.Item href="/productos/producto-1">Producto 1</NavDropdown.Item>
//             <NavDropdown.Item href="/productos/producto-2">Producto 2</NavDropdown.Item>
//             <NavDropdown.Item href="/productos/producto-3">Producto 3</NavDropdown.Item>
//           </NavDropdown>
//           <Nav.Link href="/nosotros">Nosotros</Nav.Link>
//           <Nav.Link href="/contacto">Contacto</Nav.Link>
//         </Nav>
//         <div className="d-flex align-items-center ml-3">
//           <p className="m-0 mr-3">Bienvenido {usuario}</p>
//           <Button variant="outline-primary" onClick={changeAcademia}>
//             Cambiar academia
//           </Button>
//           <Button variant="outline-secondary" className="ml-3" onClick={logoutUser}>
//             Cerrar sesión
//           </Button>
//         </div>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };
import { fallDown as SlideMenu } from 'react-burger-menu';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Ultimo/AuthContext';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Menu1 } from './MenuPrueba';
import { NavDropdown } from "react-bootstrap";
import ColorSquareComponent from './componentes/BotonesAcademiaSelect';

export const NavbarAdminAcademia = () => {
  
  const menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '20px',
      top: '20px',
    },
    bmBurgerBars: {
      background: '#373a47',
    },
    bmBurgerBarsHover: {
      background: 'red',
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
    },
    bmCross: {
      background: 'rgb(92, 179, 252',
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      zIndex: 10000,
    },
    bmMenu: {
      top:0,
      position: "fixed",
      background: '#dfdfdf',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
    },
    bmItem: {
      display: 'inline-block',
    },
    bmOverlay: {
      top:0,
      position: "fixed",
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };
  
  const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    zIndex: 9999,
  };
  
  const academia = localStorage.getItem("academia") || "No se donde estas";
  const { setAuthTokens, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario')) || 'Invitado';
  
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/');
  };

  const changeAcademia = () => {
    console.log('Cambio de academia');
    navigate("/admin");
  };
  
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <Navbar expand="lg" variant="light" className="" bg="white" style={navbarStyles}>
      <Navbar.Brand>
        <SlideMenu styles={menuStyles}>
          <div className="container py-5">
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link href="/admin/academia">MENU</Nav.Link>
              <br />
              <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem', border: 'none', borderTop: '1px solid #eee' }} />
              <br />
              <Nav.Link href="/admin/academia/profesores">Profesores</Nav.Link>
              <Nav.Link href="/admin/academia/alumnos">Alumnos</Nav.Link>
              <Nav.Link href="/admin/academia/clases">Clases</Nav.Link>
              <Nav.Link href="/admin/academia/boletines">Boletines</Nav.Link>
              <Nav.Link href="/admin/academia/pagos">Pagos</Nav.Link>
            </Nav>
          </div>
        </SlideMenu>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <div className="d-flex align-items-center ml-3">
          <p className="m-3 mr-4">Bienvenido {usuario} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <Button variant="outline-primary" onClick={changeAcademia}>
            Cambiar academia
          </Button>
          <Button variant="outline-secondary" className="ml-3" onClick={logoutUser}>
            Cerrar sesión
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
// import { fallDown as SlideMenu } from 'react-burger-menu';
// import React, { useState,useContext } from 'react';
// import {useNavigate} from 'react-router-dom'
// import AuthContext from '../Ultimo/AuthContext';
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import { Menu1 } from './MenuPrueba';
// import { NavDropdown } from "react-bootstrap";
// import ColorSquareComponent from './componentes/BotonesAcademiaSelect';

// export const NavbarAdminAcademia = () => {
  
//   const menuStyles = {
//     bmBurgerButton: {
//       position: 'fixed',
//       width: '36px',
//       height: '30px',
//       left: '20px',
//       top: '20px',
//     },
//     bmBurgerBars: {
//       background: '#373a47',
//     },
//         // color de boton para desplegar
//     bmBurgerBarsHover: {
//       background: 'red',
//     },
//     bmCrossButton: {
//       height: '24px',
//       width: '24px',
//     },
//     bmCross: {
//       background: 'rgb(92, 179, 252',
//     },
//     // color de la x para cerrar
//     bmMenuWrap: {
//       position: 'fixed',
//       height: '100%',
//       zIndex: 10000,
      
//     },
//     bmMenu: {
//       top:0,
//       position: "fixed",
//       // rgb(92, 179, 252)
//       background: '#dfdfdf',
//       padding: '2.5em 1.5em 0',
//       fontSize: '1.15em',
//     },
//     // color del fondo
//     bmMorphShape: {
//       fill: '#373a47',
//     },
//     bmItemList: {
//       color: '#b8b7ad',
//       padding: '0.8em',
//     },
//     // color de los puntos
//     bmItem: {
//       display: 'inline-block',
//     },
//     bmOverlay: {
//       top:0,
//       position: "fixed",
//       background: 'rgba(0, 0, 0, 0.3)',
//     },
//     // color de la parte de la derecha cuando le das click
//   };
//   const navbarStyles = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '60px',
//     zIndex: 9999,
//   };
//   const academia=localStorage.getItem("academia")||"No se donde estas"
//   const {setAuthTokens,setUser} = useContext(AuthContext)
//   const navigate = useNavigate()
//   const usuario = localStorage.getItem('usuario') || 'Invitado';
  
//   const logoutUser = () => {
//     setAuthTokens(null)
//     setUser(null)
//     localStorage.removeItem('authTokens')
//     navigate('/')
//   };

//   const changeAcademia = () => {
//     console.log('Cambio de academia');
//     navigate("/admin")
//   };
//   const [showSubMenu, setShowSubMenu] = useState(false);

//   const handleSubMenu = () => {
//     setShowSubMenu(!showSubMenu);
//   };

//   return (
//       <Navbar expand="lg" variant="light" className="" bg="white" >
//       {/* <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid"> */}
//       <Navbar.Brand>
//         <SlideMenu styles={menuStyles} >
         
//         {/* <ColorSquareComponent  color="red"  texto="Profesores" /> */}
//         {/* 1 FORMA DE HACERLO */}
//         <div className="container py-5">
//           <Nav defaultActiveKey="/" className="flex-column">
//             <Nav.Link href="/admin/academia">MENU</Nav.Link>
//             <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem', border: 'none', borderTop: '1px solid #eee' }} />
//             <Nav.Link href="/admin/academia/profesores">Profesores</Nav.Link>
//             <Nav.Link href="/admin/academia/alumnos">Alumnos</Nav.Link>
//             <Nav.Link href="/admin/academia/clases">Clases</Nav.Link>
//             <Nav.Link href="/admin/academia/boletines">Boletines</Nav.Link>
//             <Nav.Link href="/admin/academia/pagos">Pagos</Nav.Link>
//           </Nav>
//         </div>
//         </SlideMenu>
        
//       </Navbar.Brand>
      
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//       <div className="d-flex align-items-center ml-3">
//            <p className="m-3 mr-4" >Bienvenido {usuario}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
//            <Button variant="outline-primary" onClick={changeAcademia}>
//              Cambiar academia
//            </Button>
//            <Button variant="outline-secondary" className="ml-3" onClick={logoutUser}>
//              Cerrar sesión
//            </Button>
//          </div>
//        </Navbar.Collapse>
//     </Navbar>
//   );
// };



 {/* <div className="container py-5">
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/admin/academia">MENU</Nav.Link>
            <hr/>
            <Nav.Link href="/admin/academia/profesores">Profesores</Nav.Link>
            <Nav.Link href="/admin/academia/alumnos">Alumnos</Nav.Link>
            <Nav.Link href="/admin/academia/clases">Clases</Nav.Link>
            <Nav.Link href="/admin/academia/boletines">Boletines</Nav.Link>
            <Nav.Link href="/admin/academia/pagos">Pagos</Nav.Link>
          </Nav>
        </div> */}