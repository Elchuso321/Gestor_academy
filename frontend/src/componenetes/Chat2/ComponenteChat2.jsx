import Pusher from 'pusher-js';
// import React, {useEffect, useState} from "react";
import React, { useEffect,useState,useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import "./estilo.css"
const URL_API = import.meta.env.VITE_API_URL

// const pusher = new Pusher('0bd6d501111469b84b7c', {
//   cluster: 'mt1',
// });




export const ComponenteChanel1=()=> {
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [notes, setNotes] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);
    let allMessages = [];
    const clase=JSON.parse(localStorage.getItem('clase')) || 'Todo'
    console.log("clase:",clase)
    // const clase="todo"
    useEffect(() => {
        Pusher.logToConsole = true;
        const usuario=JSON.parse(localStorage.getItem('usuario'))
        setUsername(usuario)

        const pusher = new Pusher('0bd6d501111469b84b7c', {
          cluster: 'mt1'
        });
    
        const channel = pusher.subscribe(clase);
        console.log("CHANEL:",channel)
        channel.bind('message', function(data) {
            allMessages.push(data);
            setMessages(allMessages);
        });
        allMessagesSacar()
    }, []);

    const allMessagesSacar = async() =>{
        let response = await fetch(`${URL_API}/api/user/messaege/sacar/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        
        if(response.status === 200){
            console.log("MENSAJES:",data)
            // filtrar los mensajes por clase
            data=data.filter((item)=>item.clase===clase)
            setNotes(data)
           

        }else if(response.statusText === 'Unauthorized'){
            console.log("fallo")
            // logoutUser()
        }
    }
        
    

   

      
    const submit = async e => {
        e.preventDefault();

        await fetch(`${URL_API}/api/user/messaege/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message,
                clase: clase
            })
        });

        setMessage('');
    }

    return (


        <div class="forum-container">
            <div class="forum-header">Foro de Clase</div>
            
             {/* Mostrar lista de publicaciones  */}
            <div class="forum-posts">
            {notes.map(message => {
                        return (
                            <div class="forum-post">
                            <div class="forum-post-author">{message.username}</div>
                            {/* <div class="forum-post-date">01/06/2023</div> */}
                            <div class="forum-post-content">{message.content}</div>
                        </div>
                        )
                    })}
                    {messages.map(message => {
                         return (
                            <div class="forum-post">
                            <div class="forum-post-author">{message.username}</div>
                            {/* <div class="forum-post-date">01/06/2023</div> */}
                            <div class="forum-post-content">{message.message}</div>
                        </div>
                        )
                    })}
                
               
            </div>
            
            <div class="forum-form">
                <form  onSubmit={e => submit(e)}>
                    <input className="form-control shadow" type="text" placeholder="Write a message" value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button type="sumbit">Publicar</button>
                </form>
            </div>
            {/* <form class="forum-form" onSubmit={e => submit(e)}>
                 <input className="form-control" placeholder="Write a message" value={message}
                        onChange={e => setMessage(e.target.value)}
                 />
             </form> */}
        </div>
    );
}

        // <div className="container">
        //     <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        //         <div
        //             className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        //             <input className="fs-5 fw-semibold" value={username}
        //                    onChange={e => setUsername(e.target.value)}/>
        //         </div>
        //         <div className="list-group list-group-flush border-bottom scrollarea">
        //             {notes.map(message => {
        //                 return (
        //                     <div className="list-group-item list-group-item-action py-3 lh-tight">
        //                         <div className="d-flex w-100 align-items-center justify-content-between">
        //                             <strong className="mb-1">{message.username}</strong>
        //                         </div>
        //                         <div className="col-10 mb-1 small">{message.content}</div>
        //                     </div>
        //                 )
        //             })}
                    // {messages.map(message => {
                    //     return (
                    //         <div className="list-group-item list-group-item-action py-3 lh-tight">
                    //             <div className="d-flex w-100 align-items-center justify-content-between">
                    //                 <strong className="mb-1">{message.username}</strong>
                    //             </div>
                    //             <div className="col-10 mb-1 small">{message.message}</div>
                    //         </div>
                    //     )
                    // })}
        //         </div>
        //     </div>
            // <form class="forum-form" onSubmit={e => submit(e)}>
            //     <input className="form-control" placeholder="Write a message" value={message}
            //            onChange={e => setMessage(e.target.value)}
            //     />
            // </form>
        // </div>