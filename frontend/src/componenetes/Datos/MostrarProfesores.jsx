import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'

export const MostrarProfesores=()=>{

    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/profesores/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        
        if(response.status === 200){
            console.log("profesores:",data)
            setNotes(data)

        }else if(response.statusText === 'Unauthorized'){
            console.log("fallo")
        }
        
    }

    useEffect(()=> {
        getNotes()
    },[])

    return (
        <div>

            <h3>Profesor</h3>
            <ul>
                {notes.map(note => (
                    <li key={note.id} >{note.usuario.nombre}</li>
                ))}
            </ul>
        </div>
    )
}