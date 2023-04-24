import React from 'react'
import { Navbar1 } from './NavbarBasic'
import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { FooterBasic } from './Footer'
import { Footer } from './FooterBasic'

export const Home=()=>{
    return(
        <>
        <Navbar1/>
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
