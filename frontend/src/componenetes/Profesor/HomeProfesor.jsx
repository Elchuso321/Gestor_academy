import { NavbarProfesor } from './NavbarProfesor'
import { LoginForm } from '../conexion/login/LoginComponente'
// import SignUp from '../register'
import jwt_decode from "jwt-decode";
import React, { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';

export const HomeProfesor=()=>{
    const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    useEffect(() => {
    console.log(authTokens)
    if(authTokens){
        let decodedToken = jwt_decode(authTokens.access)
        if (decodedToken.group !== 'Profesores') {
          navigate("/")
        }
    }else{
        navigate("/")
   
    }
        
	},[])
    return(
        <>
        <div>
            <NavbarProfesor/>
        </div>
        <div>
        <h4>PROFESOR</h4>
         {/* <LoginForm/>  */}
        </div>


        </>
    )
}
