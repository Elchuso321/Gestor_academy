// componente para capturar el token y llamar al fetcg para validar el correo
import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'

const URL_API = import.meta.env.VITE_API_URL

export const LoginConfirmation = () => {
    const { token } = props.match.params;
    console.log("TOKEN",token)
    const enlace=URL_API; 
    const navigate = useNavigate()
    let {setAuthTokens,setUser} = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false); 
    useEffect(() => {
        let getNotes = async() =>{
            console.log("Hola")
            let response = await fetch(`${URL_API}/email-verify/${token}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()
           
            if(response.status === 200){
                console.log("academias:",data)
                setButtons(data)
                
        
            }else if(response.statusText === 'Unauthorized'){
                console.log("fallo")
                // logoutUser()
            }
            
        }
      

    },[])
    return (
        <>
        hola
        </>
    );
    };
