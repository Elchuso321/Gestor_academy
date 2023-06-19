import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'

const URL_API = import.meta.env.VITE_API_URL

export const LoginBotonBasic = () => {
  const enlace=URL_API; 
  const navigate = useNavigate()
  let {setAuthTokens,setUser} = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false); 
  
  let [email,setEmail]=useState("")
  let [passw,setPassw]=useState("")
  const changeEmail=(e)=> setEmail(e.target.value)
  const changePassw=(e)=> setPassw(e.target.value)

  const [errores, setErrores] = useState({});
  
  function validarErrores  () {
    let errores1 = {};
    if (email.trim()==="") {
      errores1.email="El email es obligatorio";
    }
    if (passw.trim()==="") {
      errores1.password="La contraseña es obligatoria";
    }
    setErrores(errores1);
    console.log("errores1",errores1)
    return errores1.length === 0;
  }


  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    console.log("Me meto en la funcion handleShow")
    let authTokensStorage=JSON.parse(localStorage.getItem('authTokens'))
    if(authTokensStorage){
        // console.log("authToken_Login:",authTokensStorage)
        let decodedToken = jwt_decode(authTokensStorage.access)
        // console.log(decodedToken.group)
        
        if (decodedToken.group === 'Alumnos') {
          localStorage.setItem('group',JSON.stringify(decodedToken.group))
          navigate("/alumno/")
              
        } else if (decodedToken.group === 'Profesores') {
          localStorage.setItem('group',JSON.stringify(decodedToken.group))
          navigate("/profesor/")
          
        } else if (decodedToken.group === 'Admin') {
          localStorage.setItem('group',JSON.stringify(decodedToken.group))
          console.log("HOLA")
          console.log("admin")
          navigate('/admin/')
        }else{
          location.reload();
        }
      }else{
    setShowModal(true);
    console.log("Muestro el modal")
  }}


  let loginUser = async (e)=> {
    e.preventDefault()
    const erroresValidacion = validarErrores();
   
    if (!erroresValidacion) {
    let response = await fetch(`${URL_API}/api/token/`, {
    
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({'email':email, 'password':passw})
    })
    let data = await response.json()
    if(response.status === 200){
        setAuthTokens(data)
        console.log('login',data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        let decodedToken = jwt_decode(data.access)
        setShowModal(false);
        localStorage.setItem('usuario', JSON.stringify(decodedToken.nombre))
        localStorage.setItem('id', JSON.stringify(decodedToken.id))
        if (decodedToken.group === 'Alumnos') { 
          // console.log(decodedToken.username)
          localStorage.setItem('group',JSON.stringify(decodedToken.group))
          navigate("/alumno/")
        
        } else if (decodedToken.group === 'Profesores') {
          localStorage.setItem('group',JSON.stringify(decodedToken.group))
          navigate("/profesor/")
          
        } else if (decodedToken.group === 'Admin') {
          localStorage.setItem('group',JSON.stringify(decodedToken.group))
          navigate('/admin/')
        } else {

            alert('Unknown group!')
            localStorage.clear()
            window.location.reload()
        } 
    }else{
      const errores = {};
      errores.password="Usuario o contraseña incorrectos"
      setErrores(errores)
    }
    errores.password="Usuario o contraseña incorrectos"
    setErrores(errores)
  }else{
    // alert('Something went wrong!')
    console.log("Formulario no VALIDO")
    errores.final="Usuario o contraseña incorrectos"
    setErrores(errores)


  }
}

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
          {/* <form onSubmit={loginUser}> */}
          <form onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input onChange={(e)=>changeEmail(e)} value={email} type="email" name="username" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
            </div>
              {errores.email && <p className="text-danger">{errores.email}</p>}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input onChange={(e)=>changePassw(e)} type="password" value={passw} name="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
            </div>
              {errores.password && <p className="text-danger">{errores.password}</p>}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="sumbit">
                Iniciar sesión
              </Button>
            </Modal.Footer>
          </form>
          
        </Modal.Body>
        
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
