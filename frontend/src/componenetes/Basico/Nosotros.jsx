import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { Footer } from './FooterBasic'
import { NavbarBasic } from './NavbarBasic'
import jwt_decode from "jwt-decode";
import React, { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';

export const Nosotros=()=>{
    const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
   
    return(
        <>
        <NavbarBasic/>
        <div>
          <h2>Nosotros</h2>
        </div>
        <Footer/>

        </>
    )
}
