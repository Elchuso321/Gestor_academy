import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { Footer } from './FooterBasic'
import { NavbarBasic } from './NavbarBasic'
import jwt_decode from "jwt-decode";
import React, { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../Ultimo/AuthContext';

export const Home=()=>{
    const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    
    return(
        <>
        {/* <Navbar1/> */}
        <NavbarBasic/>
        <div>
            <CarouselComponent />
        </div>
        <div>
            <ImageAndText
                imageUrl=""
                altText="Example Image"
                heading="Título del ejemplo"
                subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in magna eget sem maximus auctor non sit amet nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas bibendum pellentesque molestie. Pellentesque id euismod enim. Nulla non lacus at mauris facilisis aliquam. Morbi sapien nisl, euismod at porta ac, vestibulum nec nibh. Vestibulum sit amet purus et enim sodales venenatis ac eget dui. Maecenas sed ultricies arcu. Suspendisse porttitor cursus urna, eu elementum lacus sagittis sed. Quisque a elit in augue malesuada eleifend. Curabitur turpis ex, accumsan sit amet est et, tincidunt aliquet orci. Donec tortor felis, sodales quis risus et, tristique laoreet sapien. Vivamus pulvinar, dolor vitae accumsan mattis, metus eros dapibus risus, in efficitur diam mauris sit amet massa. Vivamus in volutpat mi, vitae maximus magna. Fusce vehicula rhoncus pellentesque. Vestibulum nec lectus et lacus gravida feugiat."
            />
        </div>
        <Footer/>

        </>
    )
}
