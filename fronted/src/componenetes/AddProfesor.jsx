import React from 'react'

export default function AddProfesor({handleAddSumbit}){

    return(
        <>
        <h3>
            Añadir Profesor:
        </h3>
        <form onSubmit={handleAddSumbit}>
            Nombre: <input type='text' name='nombre'/>
            Apellidos: <input type='text' name='apellidos'/>
            <button type='sumbit' >Añadir</button>
        </form>
        </>
    )
}