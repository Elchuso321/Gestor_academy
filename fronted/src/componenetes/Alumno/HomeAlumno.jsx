// import React from 'react'



// export const HomeAlumno=()=>{
//     <>
//     {/* <NavbarAlumnos/> */}
//     <p>HOla</p>
//     </>
// }

import React from 'react'
import ImageAndText from '../Generico/Image&Text'
import CarouselComponent from '../Generico/Carrousel'
import { NavbarAlumnos } from './NavbarAlumno'
import { Tabla } from '../Generico/Tabla'
export const HomeAlumno=()=>{

    const diccionario = [
        {
          src: "https://via.placeholder.com/800x500",
          alt: "First slide",
          title: "First slide label",
          description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
        },
        {
          src: "https://via.placeholder.com/800x500",
          alt: "Second slide",
          title: "Second slide label",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          src: "https://via.placeholder.com/800x500",
          alt: "Third slide",
          title: "Third slide label",
          description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
        },
      ];
    return(
        <>
        <div>
            <NavbarAlumnos/>
        </div>
        <div>
        <h4>hola</h4>
        {/* <Tabla props={diccionario}/> */}
        </div>


        </>
    )
}
