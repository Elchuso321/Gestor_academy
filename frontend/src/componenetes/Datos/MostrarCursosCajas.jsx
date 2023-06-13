import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'
import ColorSquareComponent from '../Admin/componentes/BotonesAcademiaSelect'
import {useNavigate} from 'react-router-dom'



const URL_API = import.meta.env.VITE_API_URL

export const MostrarCursosCaja=()=>{
    const navigate = useNavigate()
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const handleClickCurso = (curso) => {
        localStorage.setItem('clase', JSON.stringify(curso))
        navigate("/alumno/clase")  
    }
    let getNotes = async() =>{
        let response = await fetch(`${URL_API}/api/cursos/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        
        if(response.status === 200){
            console.log("cursos",data)
            setNotes(data)
           

        }else if(response.statusText === 'Unauthorized'){
            console.log("fallo")
            // logoutUser()
        }
        
    }

    useEffect(()=> {
        getNotes()
    },[])

    return notes.map((button, index) => (
        
        <ColorSquareComponent key={index} color="#5CB3FC" handleClick={()=>handleClickCurso(button.nombre)} texto={button.nombre} disposicion="10" />
    
    ));
}

// return notes.map((button, index) => (
        
//     <ColorSquareComponent key={index} color="#5CB3FC" handleClick={()=>handleClickCurso(button.nombre)} texto={button.nombre} />

// ));