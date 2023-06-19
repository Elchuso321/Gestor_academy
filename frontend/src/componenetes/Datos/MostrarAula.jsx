import React, {useState, useEffect, useContext} from 'react'

import { BotonCrearAula } from './CrearAula'
import AuthContext from '../Ultimo/AuthContext'

// import AuthContext from '../Ultimo/AuthContext'
const URL_API = import.meta.env.VITE_API_URL

export const MostrarAulas=()=>{
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let getNotes = async() =>{
        let response = await fetch(`${URL_API}/api/aulas/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
       
        if(response.status === 200){
            console.log("academias:",data)
            const academ=JSON.parse(localStorage.getItem('academia'));
            data=data.filter((item) => item.academia === academ)
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
        <div style={{ border: "1px solid #ccc", background: "#fff", padding: "1rem", maxHeight: "300px", overflowY: "auto" }}>
        <h3 style={{ textAlign: "center" }}>Academias</h3>
        <hr />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {notes.map((note) => (
            <div
              key={note.id}
              style={{
                cursor: "pointer",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                transition: "background-color 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {note.nombre}
            </div>
          ))}
        </div>
      </div>
      
    )      
}
