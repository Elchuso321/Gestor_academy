
import React, { useState,useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoginPage from '../Ultimo/LoginPage';
import AuthContext from '../Ultimo/AuthContext';
// import { Redirect } from 'react-router-dom';
// import React, {useContext} from 'react'
// import AuthContext from './AuthContext'

export const LoginBotonBasic = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const onSumbitLogin=()=>{
    console.log("ESTOY AQUI")
    //   como redirigir
}
  let {loginUser,email,passw,setEmail,setPassw} = useContext(AuthContext)
  const changeEmail=(e)=> setEmail(e.target.value)
  const changePassw=(e)=> setPassw(e.target.value)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Iniciar sesión
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <form onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input onChange={(e)=>changeEmail(e)} value={email} type="email" name="username" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input onChange={(e)=>changePassw(e)} type="password" value={passw} name="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
            </div>
          </form>
          
          {/* <form onSubmit={onSumbitLogin}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
            </div>
          </form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={loginUser}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



// import React, { useState } from 'react';

// export const LoginBotonBasic=() =>{
//   const [isOpen, setIsOpen] = useState(false);
//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   return (
//     <>
      
//     <button onClick={handleOpen}>Iniciar sesión</button>
//     {isOpen && (
//       <div className="modal" style={{ display: "block" }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Iniciar sesión</h5>
//               <button
//                 type="button"
//                 className="close"
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 <span>&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//             <nav class="navbar bg-body-tertiary">
//             <div class="container-fluid">
//                 <form class="d-flex" role="search">
//                 <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//                 <button class="btn btn-outline-success" type="submit">Search</button>
//                 </form>
//             </div>
//             </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
      
//     </>
//   );
// }
