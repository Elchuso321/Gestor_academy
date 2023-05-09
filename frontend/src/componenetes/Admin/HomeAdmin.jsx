import { NavbarAdmin } from './NavbarAdmin'
import { RegisterForm } from '../conexion/register/RegisterComponente'
import jwt_decode from "jwt-decode";
import React, { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';


export const HomeAdmin=()=>{

    const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    useEffect(() => {
    console.log(authTokens)
    if(authTokens){
        let decodedToken = jwt_decode(authTokens.access)
        if (decodedToken.group !== 'Admin') {
          navigate("/")
        }
    }else{
        navigate("/")
   
    }
        
	},[])
    return(
        <>
        <div>
            <NavbarAdmin/>
        </div>
        <div>
        <h4>hola</h4>
        <RegisterForm/>
        </div>


        </>
    )
}
