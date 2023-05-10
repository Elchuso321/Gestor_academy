import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import HomePage from './HomePage';
import { Home } from '../Basico/Home';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    // let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
    
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
    useEffect(()=>{
        if(authTokens){
            console.log("lo estoy pasando a null que es vacio")
            localStorage.setItem("authTokens",JSON.stringify(authTokens))
        }else{
                // localStorage.setItem("authTokens",null)
            localStorage.removeItem('authTokens')

            // navigate("/")
        }
        console.log("localStorageModificado:",authTokens)
    },[authTokens])

    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        // localStorage.removeItem('authTokens')
        // esto para redirigir en caso de que no este logeado
        // navigate('/')
    }


    let updateToken = async ()=> {
        
        console.log("UPDATE TOKEN!")
        // if(authTokens){
        
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            // localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            //  logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
    // }
    let contextData = {
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        setAuthTokens:setAuthTokens,
        user:user, 
        setUser:setUser,
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 10

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}