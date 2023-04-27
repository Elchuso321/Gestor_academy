import React from 'react'
import { NavbarAdmin } from './NavbarAdmin'
import { RegisterForm } from '../conexion/register/RegisterComponente'

export const HomeAdmin=()=>{
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
