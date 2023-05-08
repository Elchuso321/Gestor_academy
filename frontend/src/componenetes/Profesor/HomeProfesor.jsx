
import React from 'react'
import { NavbarProfesor } from './NavbarProfesor'
import { LoginForm } from '../conexion/login/LoginComponente'
// import SignUp from '../register'

export const HomeProfesor=()=>{
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
