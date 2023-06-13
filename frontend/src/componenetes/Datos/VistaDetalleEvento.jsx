
import React, { useState, useEffect,useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { ComponenteChanel1 } from '../Chat2/ComponenteChat2';
import { HorarioTable } from './TablaHorarios';

export const VistaDetalleEvento = ({ id }) => {
  const [evento, setEvento] = useState("");
  const [usuario, setUsuario] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [notes, setNotes] = useState([])
  useEffect(() => {
    const obtenerDetalleCurso = async () => {
      console.log("id:",id)
      try {
        const response = await fetch(`${URL_API}/api/evento/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:",data)
          setEvento(data);
          console.log("eventoF:", evento)
        } else {
          console.error('Error al obtener el detalle del curso');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
      
    }

   

    obtenerDetalleCurso();
    
  }, [id]);

 

   

  return (
    <>
    <div>
      {evento 
      ? <div>
        <h2>nombre:{evento.nombre} apellido {evento.descripcion}</h2>
        {/* <p>academia: {evento.academia.nombre}</p> */}

        {/* <HorarioTable eventos={notes}/> */}
      </div>
      : <p>Cargando información del curso...</p>
}
    </div>
    
    </>
  );
};