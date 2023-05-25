import React, {useState, useEffect, useContext} from 'react'

import { BotonCrearAula } from './CrearAula'
import AuthContext from '../Ultimo/AuthContext'

// import AuthContext from '../Ultimo/AuthContext'

export const MostrarAulas=()=>{
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/aulas/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
       
        if(response.status === 200){
            console.log("academias:",data)
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

        <h3>Academias</h3>
            <ul>
                {notes.map(note => (
                    <li key={note.id} >{note.nombre}</li>
                ))}
            </ul>
        </div>
    )
}



// export const MostrarAlumnos=()=>{
//     let [notes, setNotes] = useState([])
//     let {authTokens, logoutUser} = useContext(AuthContext)
//     console.log("PERU",authTokens.access)
//     let getNotes = async() =>{
//         let response = await fetch('http://127.0.0.1:8000/api/aulas/', {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         let data = await response.json()
        
//         if(response.status === 200){
//             console.log("alumnos:",data)
//             setNotes(data)
           

//         }else if(response.statusText === 'Unauthorized'){
//             console.log("fallo")
//             // logoutUser()
//         }
        
//     }

//     useEffect(()=> {
//         getNotes()
//     },[])

//     return (
//         <div>
           
//            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//             <h3>Aulas:</h3>
//             <ul>
//                 {notes.map(note => (
//                     <li key={note.id} >{note.usuario.nombre}</li>
//                 ))}
//             </ul>
           
//         </div>
//     )
// }