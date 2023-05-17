import React, { useContext, useEffect, useState } from 'react';
import { NavbarAdminAcademia } from './NavbarAdmin_Academia';
import ColorSquareComponent from './componentes/BotonesAcademiaSelect';
import {useNavigate} from 'react-router-dom'

export const HomeAcademia=()=>{
  const navigate = useNavigate()

  const handleClickProfesores=()=>{
    navigate("/admin/academia/profesores")  }
  const handleClickAlumnos=()=>{
    navigate("/admin/academia/alumnos")  }
  const handleClickClases=()=>{
    navigate("/admin/academia/clases")  }
  const handleClickBoletines=()=>{
    navigate("/admin/academia/boletines")  }
  const handleClickPagos=()=>{
    navigate("/admin/academia/pagos")  }
  
    const handleClickTodo=()=>{
    navigate("")  }

    return(
        <>
  <NavbarAdminAcademia/>
  <br /> <br /> <br /> <br /> <br /> <br /> 
  <div className="container">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <ColorSquareComponent color="#5CB3FC" handleClick={handleClickProfesores} texto="Profesores" />
        <ColorSquareComponent color="#5CB3FC" handleClick={handleClickAlumnos} texto="Alumnos" />
        <ColorSquareComponent color="#5CB3FC" handleClick={handleClickClases} texto="Clases" />
        <ColorSquareComponent color="#5CB3FC" handleClick={handleClickBoletines} texto="Boletines" />
        <ColorSquareComponent color="#5CB3FC" handleClick={handleClickPagos} texto="Pagos" />
      </div>
    </div>
  </div>
</div>
{/*   
  <div className="container">
    <div className="row">
      <div className="col text-center">
        <div className="row">
          <ColorSquareComponent  color="#5CB3FC" handleClick={handleClickProfesores} texto="Profesores" />
          <ColorSquareComponent   color="#5CB3FC" handleClick={handleClickAlumnos} texto="Alumnos" />
          <ColorSquareComponent  color="#5CB3FC" handleClick={handleClickClases} texto="Clases" />
          <ColorSquareComponent  color="#5CB3FC" handleClick={handleClickBoletines} texto="Boletines" />
          <ColorSquareComponent  color="#5CB3FC" handleClick={handleClickPagos} texto="Pagos " />
          
        </div>
      </div>
    </div>
  </div> */}
        
    </>
    )
}

