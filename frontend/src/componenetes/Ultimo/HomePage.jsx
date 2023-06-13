import React, {useState, useEffect, useContext} from 'react'
import AuthContext from './AuthContext'
const URL_API = import.meta.env.VITE_API_URL

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let getNotes = async() =>{
        let response = await fetch(`${URL_API}/api/academias/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            console.log(data)
            setNotes(data)
            console.log("hola")
            console.log(notes)
            console.log("adios")

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
            <p>You are logged to the home page!</p>


            <ul>
                {notes.map(note => (
                    <li key={note.id} >{note.nombre}</li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage

