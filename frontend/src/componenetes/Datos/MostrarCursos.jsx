import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'
// import { VistaDetalleClase } from './VistaDetalleClase'
// import { useHistory } from 'react-router-dom';
const URL_API = import.meta.env.VITE_API_URL



export const MostrarCursos=({cursoPasado=false})=>{
    console.log("curso pasado",cursoPasado)
    
    // const history = useHistory();

    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [curso, setCurso] = useState("");
    const [eventos, setEventos] = useState("");
    const [eventosFiltrados, setEventosFiltrados] = useState("");

    useEffect(()=> {
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
            // filtrar eventos por aquellos que tengan el id del curso
            //   const eventosFiltrados=data.filter((evento)=>evento.curso==curso.id)
            //   console.log("eventos filtrados:",eventosFiltrados)
              setEventos(data)
              
    
          }else if(response.statusText === 'Unauthorized'){
              console.log("fallo")
              logoutUser()
          }
      }
        getNotes()
      },[])
    
    
    
    
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
        if(!cursoPasado){
            getNotes()
        } else{
            setNotes(cursoPasado)
        }
        // getNotes()
    },[cursoPasado])

    return (
        <div>
            
                {notes.map(note => (
                    <p key={note.id} onClick={()=>{setCurso(note.id)}}>{note.nombre}</p>
                ))}

           
            {/* <VistaDetalleClase id={curso}/>  */}
            

        </div>
        
        
    )
}