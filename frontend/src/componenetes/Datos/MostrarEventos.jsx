import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'
import { HorarioTable } from './TablaHorarios'
import { VistaDetalleEvento } from './VistaDetalleEvento'
const URL_API = import.meta.env.VITE_API_URL

export const MostrarEventos=()=>{
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [eventoMostrar, setEventoMostrar] = useState("")
    let getNotes = async() =>{
        let response = await fetch(`${URL_API}/api/eventos/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        
        if(response.status === 200){
            console.log("eventos:",data)
            setNotes(data)
            

        }else if(response.statusText === 'Unauthorized'){
            console.log("fallo")
            // logoutUser()
        }
        
    }

    useEffect(()=> {
        getNotes()
    },[])

    return (
        <div>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <h3>Eventos</h3>
            <br /><br /><br /><br /><br />
            <HorarioTable eventos={notes}/>
            <br /><br /><br />
            <ul>
                {notes.map(note => (
                    // <button onClick={()=>{setEventoMostrar(note.id)}} >{note.nombre}</button>
                    <li key={note.id} onClick={()=>{setEventoMostrar(note.id)}}>{note.nombre} {note.hora_inicio} {note.hora_fin}</li>
                ))}
            </ul>
            {eventoMostrar}
            <VistaDetalleEvento id={eventoMostrar}/>
        </div>
    )
}