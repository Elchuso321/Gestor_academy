// componente para capturar el token y llamar al fetcg para validar el correo
import { Button  } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import "../estilos/boton.css"
import styled from 'styled-components';
const URL_API = import.meta.env.VITE_API_URL

const ModalWrapper = styled.div`
  /* Estilos para el modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  /* Estilos para el contenido del modal */
  background-color: white;
  padding: 30px;
`;


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        
      </ModalContent>
    </ModalWrapper>
  );
};



export const LoginConfirmation = () => {
    // const { token } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    console.log("NUMID",token)
    // const { token } = props.match.params;
    // console.log("TOKEN",token)
    console.log("GOLAAAAAAAAAAAAAAAAAAAAAAAAAA")
    const enlace=URL_API; 
    const navigate = useNavigate()
    let {authTokens,setAuthTokens,setUser} = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false); 
    const [isModalOpenCrear, setIsModalOpenCrear] = useState(true);
    const handleCloseModal = () => setIsModalOpenCrear(false);
    const [menseaje, setMensaje] = useState("");
    console.log(token)
    const clickOkeyBoton = () => {
        setIsModalOpenCrear(false);
        navigate("/")
    }

    useEffect(() => {
        let getNotes = async() =>{
            console.log("Hola")
            let response = await fetch(`${URL_API}/api/user/email-verify/?token=${token}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()
           
            if(response.status === 200){
                console.log("FUNCIONO:",data)
                console.log(`${URL_API}/api/user/email-verify/?token=${token}`)
                setMensaje("Email verificado correctamente")
                
        
            }else if(response.statusText === 'Unauthorized'){
                setMensaje("Ha surgido algun tipo de error, ponte en contacto con el administrador")
                console.log("fallo")
                // logoutUser()
            }
            
        }
        getNotes()

    },[])
    return (
        <>
        
        <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
            <h2>{menseaje}</h2>
            <br />
            <button onClick={clickOkeyBoton} style={{ display: 'block', margin: '0 auto', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}>Ok</button>

        </Modal>
        </>
    );
    };
