import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'
import ColorSquareComponent from '../Admin/componentes/BotonesAcademiaSelect'
import "./estilos/PerfilUsuarios.css"
import { HorarioTable } from './TablaHorarios'

const URL_API = import.meta.env.VITE_API_URL

export const PerfilUsuario=()=>{

    const [alumno, setAlumno] = useState(false);
    const [usuario, setUsuario] = useState("");
    const { authTokens, logoutUser } = useContext(AuthContext);
    const id=JSON.parse(localStorage.getItem('id'))
    useEffect(() => {
        const obtenerDetalleAlumno = async () => {
          console.log("id:",id)
          try {
            const response = await fetch(`${URL_API}/api/alumno/${id}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log("data:",data.curso)
              setAlumno(data);
              console.log("profe:", alumno.curso)
            } else {
              console.error('Error al obtener el detalle del profesor');
            }
          } catch (error) {
            console.error('Error de red', error);
          }
          
        }
        obtenerDetalleAlumno();
    
      }, [id]);

      return (
        <div>
          {alumno 
          ? <div>
          {/* <div className="profile">
            <h2>Perfil de Alumno</h2>
            <div className="profile-details">
                <p><strong>Nombre:</strong> <span id="name">{alumno.usuario.nombre}</span></p>
                <p><strong>Primer Apellido:</strong> <span id="first-name">{alumno.usuario.primer_apellido}</span></p>
                <p><strong>Segundo Apellido:</strong> <span id="last-name">{alumno.usuario.segundo_apellido}</span></p>
                <p><strong>Correo Electrónico:</strong> <span id="email">{alumno.usuario.email}</span></p>
            </div>
           </div> */}
           
        {/* <div className="m-4"> */}
          <HorarioTable eventos={alumno.curso}/>
        {/* </div> */}
          </div>
          : <p>Cargando información del profesor...</p>
    }
            
            
        </div>
      );
}