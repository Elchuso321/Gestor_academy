import axios from "axios"

export function getProfesor(){
    return axios.get('http://127.0.0.1:8000/api/alumnos/')
    .then(res=>{
       return res.data
    })
}

export function addProfesor(profesor){
    console.log(profesor.nombre.value,profesor.apellidos.value)
    return axios.post('http://127.0.0.1:8000/profesor/',
    {
        nombre:profesor.nombre.value,
        apellidos:profesor.apellidos.value
    })
    .then(res=>{
       return res.data
    })
}