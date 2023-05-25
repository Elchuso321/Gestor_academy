// import React, { useState, useEffect } from 'react';

// export const DetalleProfesor = ({ id }) => {
//   const [profesor, setProfesor] = useState(null);

//   useEffect(() => {
//     const obtenerDetalleProfesor = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/usuario/${id}/`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log("data:", data)
//           setProfesor(data);
//         } else {
//           console.error('Error al obtener el detalle del profesor');
//         }
//       } catch (error) {
//         console.error('Error de red', error);
//       }
//     };

//     obtenerDetalleProfesor();
//   }, [id]);

//   if (!profesor) {
//     return <p>Cargando información del profesor...</p>;
//   }

//   return (
//     <div>
//       <br /><br /><br />
//       <p>HOLA</p>
//       <h2>{profesor.usuario} {profesor.apellido}</h2>
//       <p>Email: {profesor.descripcion}</p>
//       {/* Muestra otros detalles del profesor según tus necesidades */}
//     </div>
//   );
// };


import React, { useState, useEffect,useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
export const DetalleProfesor = ({ id }) => {
  const [profesor, setProfesor] = useState("");
  const [usuario, setUsuario] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);
  
  useEffect(() => {
    const obtenerDetalleProfesor = async () => {
      console.log("id:",id)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/profesor/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:",data)
          setProfesor(data);
          console.log("profe:", profesor)
        } else {
          console.error('Error al obtener el detalle del profesor');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
      
    }
    obtenerDetalleProfesor();

  }, [id]);

  // useEffect(() => {
  //   const obtenerDetalleUsuario = async () => {
  //       try {
  //           const response = await fetch(`http://127.0.0.1:8000/api/usuario/${profesor.usuario.id}/`, {
  //               method: 'GET',
  //               headers: {
  //               'Content-Type': 'application/json',
  //               },
  //           });
  //           console.log("profe:", profesor.usuario)
  //           if (response.ok) {
  //               const data = await response.json();
  //               console.log("profe:", data)
  //               setUsuario(data);
  //           } else {
  //               console.error('Error al obtener el detalle del profesor');
  //           }
  //           } catch (error) {
  //           console.error('Error de red', error);
  //           }
        
      
  //       }
  //       obtenerDetalleUsuario();

  // }, [profesor]);

  // if (!profesor) {
  //   return <p>Cargando información del profesor...</p>;
  // }

  return (
    <div>
      {profesor 
      ? <div>
        <h2>{profesor.usuario.nombre} apellido {profesor.usuario.primer_apellido}</h2>
        <p>Email: {profesor.descripcion}</p>

      </div>
      : <p>Cargando información del profesor...</p>
}
        
        
    </div>
  );
};