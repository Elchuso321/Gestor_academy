import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import HomePage from './HomePage';
import { Home } from '../Basico/Home';

const URL_API = import.meta.env.VITE_API_URL

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    // let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
    
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
    console.log('revi',authTokens)
    useEffect(()=>{
        if(authTokens){
            console.log("lo estoy pasando a null que es vacio")
            localStorage.setItem("authTokens",JSON.stringify(authTokens))
        }else{
                // localStorage.setItem("authTokens",null)
            // localStorage.removeItem('authTokens')

            // navigate("/")
        }
        console.log("localStorageModificado:",authTokens)
    },[authTokens])

    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    let logoutUser = () => {
        window.location.reload()

        // setAuthTokens(null)
        // setUser(null)
        // localStorage.removeItem('authTokens')
        // esto para redirigir en caso de que no este logeado
        // navigate('/')
    }


    let updateToken = async ()=> {
        
        console.log("UPDATE TOKEN!")
        // if(authTokens){
        
        let response = await fetch(`${URL_API}/api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()
        
        console.log("DATA CARLOS:", data)
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            
             logoutUser()
        }

        // if(loadng){
        //     setLoading(false)
        // }
    }
    // }
    let contextData = {
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
    }


    useEffect(()=> {

        
        
        

        let fourMinutes =  1000 * 60 * 10
        // 1000 * 60 * 10

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            { children}
        </AuthContext.Provider>
    )
}