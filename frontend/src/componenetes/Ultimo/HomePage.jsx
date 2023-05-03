import React, {useState, useEffect, useContext} from 'react'
import AuthContext from './AuthContext'

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
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


// import React, {useState, useEffect, useContext} from 'react'
// import AuthContext from './AuthContext'

// const HomePage = () => {
//     let [notes, setNotes] = useState([])
//     let {authTokens, logoutUser} = useContext(AuthContext)

//     useEffect(()=> {
//         getNotes()
//     }, [])


//     let getNotes = async() =>{
//         let response = await fetch('http://127.0.0.1:8000/api/notes/', {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         let data = await response.json()

//         if(response.status === 200){
//             setNotes(data)
//         }else if(response.statusText === 'Unauthorized'){
//             logoutUser()
//         }
        
//     }

//     return (
//         <div>
//             <p>You are logged to the home page!</p>


//             <ul>
//                 {notes.map(note => (
//                     <li key={note.id} >{note.body}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default HomePage