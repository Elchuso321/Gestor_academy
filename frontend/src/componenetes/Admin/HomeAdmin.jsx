import { NavbarAdminAcademia } from './NavbarAdmin_Academia'
import { RegisterForm } from '../conexion/register/RegisterComponente'
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';
import ColorSquareComponent from './componentes/BotonesAcademiaSelect';
import { Menu1 } from './MenuPrueba';
import { NavbarAdminHome } from './NavBarAdmin_Home';



export const HomeAdmin=()=>{
  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
  
  
  
  const [buttons, setButtons] = useState([]);  
  
    const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    useEffect(() => {
    console.log(authTokens)
    if(authTokens){
        let decodedToken = jwt_decode(authTokens.access)
        if (decodedToken.group !== 'Admin') {
          navigate("/")
        }else{
          fetch('http://127.0.0.1:8000/api/academias/')
          .then(response => response.json())
          .then(data => setButtons(data))
          .catch(error => console.log(error));
        }
    }else{
        navigate("/")
    }
        
	},[])
  
  const handleClickAcademia=()=>{
    localStorage.setItem('academia', JSON.stringify("Todo"))
    navigate("/admin/academia")
  }
  // --
  const handleClickGestionPagina=()=>{
    navigate("/addmin/gestionPagina")
  }
  const renderButtons = () => {
    const buttonCount = buttons.length;

    if (buttonCount === 0) {
      return <p>No hay academias disponibles.</p>;
    }

    const columns = buttonCount > 2 ? 'col-md-6' : `col-md-${12 / buttonCount}`;

    return buttons.map((button, index) => (
        
        <ColorSquareComponent key={index} color="#5CB3FC" handleClick={handleClickAcademia} texto={button.nombre} />

    ));
  };

  // --
  return(
        <>
        <NavbarAdminHome/>
        <br /> <br /> <br /> 

        {/* <ButtonAcademiaSelect/> */}
        <div className="container">
      <div className="row">
        <div className="col text-center">
          <div className="row">
          {renderButtons()}
        
          <ColorSquareComponent  color="#5CB3FC" handleClick={handleClickGestionPagina} texto="Gestionar pagina" />
          <ColorSquareComponent  color="#5CB3FC" handleClick={handleClickAcademia} texto="Todo" />
        
          </div>
        </div>
        
        
      </div>
    </div>

     
    {/* <RegisterForm/> */}
      


        </>
    )
}


// import React, { useEffect, useState } from 'react';

// export const ButtonAcademiaSelect = () => {
  // const [buttons, setButtons] = useState([]);

  // useEffect(() => {
  //   // Realiza la llamada Fetch para obtener los datos de los botones
  //   fetch('http://127.0.0.1:8000/api/academias/')
  //     .then(response => response.json())
  //     .then(data => setButtons(data))
  //     .catch(error => console.log(error));
  // }, []);

  // const renderButtons = () => {
  //   const buttonCount = buttons.length;

  //   if (buttonCount === 0) {
  //     return <p>No hay academias disponibles.</p>;
  //   }

  //   const columns = buttonCount > 2 ? 'col-md-6' : `col-md-${12 / buttonCount}`;

  //   return buttons.map((button, index) => (
  //     <div key={index} className={columns}>
  //       <button className="btn btn-primary btn-lg btn-block">{button.nombre}</button>
  //     </div>
      

  //   ));
  // };

//   return (
//     <div className="container">
//       <div className="row">
//         {renderButtons()}
//         <div className="container">
//       <div className="row">
//         <div className="col text-center">
//           <button className="btn btn-primary btn-lg">Mi botón</button>
//         </div>
//       </div>
//     </div>
//       </div>
//     </div>
//   );
// };
