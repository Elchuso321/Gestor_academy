import axios from "axios"
const URL_API = import.meta.env.VITE_API_URL

export function getProfesor(){
    return axios.get(`${URL_API}/api/alumnos/`)
    .then(res=>{
       return res.data
    })
}

export function addProfesor(profesor){
    console.log(profesor.nombre.value,profesor.apellidos.value)
    return axios.post(`${URL_API}/profesor/`,
    {
        nombre:profesor.nombre.value,
        apellidos:profesor.apellidos.value
    })
    .then(res=>{
       return res.data
    })
}