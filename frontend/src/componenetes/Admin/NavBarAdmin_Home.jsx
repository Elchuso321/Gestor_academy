import { slide as SlideMenu } from 'react-burger-menu';

import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';

import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Menu1 } from './MenuPrueba';

export const NavbarAdminHome = () => {
  
  let {setAuthTokens,setUser} = useContext(AuthContext)
  const navigate=useNavigate()
  const usuario = localStorage.getItem('usuario') || 'desconocido';

  const logoutUser = () => {
      setAuthTokens(null)
      setUser(null)
      localStorage.removeItem('authTokens')
      // esto para redirigir en caso de que no este logeado
      navigate('/')
  };

  const changeAcademia = () => {
    console.log('Cambio de academia');
  };

  return (
    <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid">
      <Navbar.Brand>
        {/* <SlideMenu styles={menuStyles}>
          <ul>
          <li><a id="home" className="menu-item" href="/">
            Home
          </a></li>
          <li> <a id="about" className="menu-item" href="/about">
            About
          </a></li>
          <li><a id="contact" className="menu-item" href="/contact">
            Contact
          </a></li>
          <li> <a onClick={logoutUser} className="menu-item--small" href="/">
            Log Out
          </a></li>
            
          </ul>
        </SlideMenu> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <div className="d-flex align-items-center ml-3">
           <p className="m-3 mr-4" >Bienvenido {usuario}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
           
           <Button variant="outline-secondary" className="ml-3" onClick={logoutUser}>
             Cerrar sesión
           </Button>
         </div>
       </Navbar.Collapse>
    </Navbar>
  );
};

// ---------

// import React, { useState,useEffect,useContext } from 'react';
// import {useNavigate} from 'react-router-dom'
// import AuthContext from '../Ultimo/AuthContext';

// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import { Menu1 } from './MenuPrueba';

// export const NavbarAdminHome = () => {
//   let {setAuthTokens,setUser} = useContext(AuthContext)
//   const navigate=useNavigate()


//   let logoutUser = () => {
//     setAuthTokens(null)
//     setUser(null)
//     localStorage.removeItem('authTokens')
//     // esto para redirigir en caso de que no este logeado
//     navigate('/')
// }
// var styles = {
//   bmBurgerButton: {
//     position: 'fixed',
//     width: '36px',
//     height: '30px',
//     left: '36px',
//     top: '36px'
//   },
//   bmBurgerBars: {
//     background: '#373a47'
//   },
//   bmBurgerBarsHover: {
//     background: '#a90000'
//   },
//   bmCrossButton: {
//     height: '24px',
//     width: '24px'
//   },
//   bmCross: {
//     background: '#bdc3c7'
//   },
//   bmMenuWrap: {
//     position: 'fixed',
//     height: '100%'
//   },
//   bmMenu: {
//     background: '#373a47',
//     padding: '2.5em 1.5em 0',
//     fontSize: '1.15em'
//   },
//   bmMorphShape: {
//     fill: '#373a47'
//   },
//   bmItemList: {
//     color: '#b8b7ad',
//     padding: '0.8em'
//   },
//   bmItem: {
//     display: 'inline-block'
//   },
//   bmOverlay: {
//     background: 'rgba(0, 0, 0, 0.3)'
//   }
// }
//     return (
//         <>

//         <Navbar expand="md" variant="light" bg="white" sticky="top" className="fluid">
//             <Navbar.Brand href="#"> 
//             <Menu1 styles={ styles }/>
//             {/* https://oxford-academy.es/wp-content/uploads/2018/05/oxford.jpg */}
//                 {/* <img src="" alt="Academy" id="logo" className="navbar-brand" style={{maxHeight: '100%', margin: '0px 15px', padding: '0px'}} /> */}
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          
//                 <Button variant="secondary" onClick={logoutUser}>
//                 Log Out
//               </Button>
//             </Navbar.Collapse>
//     </Navbar>
//     </>
      
//   );
// }
