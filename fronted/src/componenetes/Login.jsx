import React, { useEffect, useState } from "react";
import { getProfesor,addProfesor } from "../servicios/ApiService";
import AddProfesor from "./AddProfesor";
export const Login=()=>{

const [showAddPatientsForm,setshowAddPatientsForm]=useState(false)

const [profesor,setProfesor]=useState([])
useEffect(()=>{
    let mount=true
    getProfesor()
    .then(res=>{
        console.log(res)
        setProfesor(res)
        return()=>mount=false
    })    
},[])

const handleAddSumbit=(e)=>{
    e.preventDefault()
    console.log(e.target.nombre.value)
    console.log(e.target.apellidos.value)
    addProfesor(e.target)
    .then(res=>{
        console.log(res)
        setProfesor(res)
    })
}

    return <>
    <h2>Hola</h2>
    <table border="solid">
        <thead>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Botones</td>
        </thead>
        <tbody>
            {profesor.map(profe=>{
               return  <tr key={profe.nombre}>
                    <td>{profe.nombre}</td>
                    <td>{profe.apellidos}</td>
                    <td>
                        <button>Editar</button>
                        <button>Borrar</button>
                    </td>

                     
                </tr>
            
            })}
        </tbody>
    </table>
    <button onClick={()=>setshowAddPatientsForm(true)}>Añadir</button>
    {showAddPatientsForm && <AddProfesor handleAddSumbit={handleAddSumbit}/>}
    </>
}