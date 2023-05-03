import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [email,setEmail]=useState("")
    let [passw,setPassw]=useState("")
    const navigate = useNavigate()
        
    let loginUser = async (e)=> {
        e.preventDefault()
        console.log("HOLA")
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            // body:JSON.stringify({'email':e.target.username.value, 'password':e.target.password.value})
            body:JSON.stringify({'email':email, 'password':passw})
        })
        let data = await response.json()
        // if(response )
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
            let decodedToken = jwt_decode(data.access)
            console.log(decodedToken)
            console.log("SALTO")
            console.log(decodedToken.group)
            if (decodedToken.group === 'Alumno') {
                console.log("soy de alumno")
                // navigate('/admin')
            } else if (decodedToken.group === 'Profesor') {
                console.log("soy de profe")
                // navigate('/user')
            } else if (decodedToken.group === 'Admin') {
                console.log("soy admin")
                // navigate('/user')
            } else {
                alert('Unknown group!')
            }

            navigate('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        // esto para redirigir en caso de que no este logeado
        navigate('/login')
    }


    let updateToken = async ()=> {
        console.log("UPDATE TOKEN!")
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
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            //  logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        email:email,
        setEmail:setEmail,
        passw:passw,
        setPassw:setPassw,
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

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