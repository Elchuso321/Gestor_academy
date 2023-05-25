import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';

export const CrearCurso = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [academia, setAcademia] = useState('');
  const [precio, setPrecio] = useState(0);
  const [ingles, setIngles] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [academias, setAcademias] = useState([]);

  const handleNombreChange = (event) => setNombre(event.target.value);
  const handleDescripcionChange = (event) => setDescripcion(event.target.value);
  const handleAcademiaChange = (event) => setAcademia(event.target.value);
  const handlePrecioChange = (event) => setPrecio(event.target.value);
  const handleInglesChange = (event) => setIngles(event.target.checked);
  const handleImagenChange = (event) => setImagen(event.target.files[0]);

  const crearCurso = async (event) => {
    event.preventDefault();
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      academia: academia, // Reemplaza academia con el ID de la academia a la que pertenece el aula
      precio: precio,
      ingles: ingles,
      imagen: imagen,
    };
    console.log(imagen)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cursos/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Curso creado:', responseData);
        // Realiza cualquier acción adicional que necesites con la respuesta de la API
      } else if (response.status === 401) {
        console.log('No autorizado');
        logoutUser();
      } else {
        console.log('Error al crear el curso:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    const getAcademias = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/academias/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('academias:', data);
          setAcademias(data);
        } else if (response.status === 401) {
          console.log('No autorizado');
          logoutUser();
        } else {
          console.log('Error al obtener las academias:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    getAcademias();
  }, []);

  return (
    <>
      <div className="form-container">
        <h2>Nuevo Curso</h2>
        <form onSubmit={crearCurso}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="academia">Academia:</label>
            <select id="academia" className="form-control" value={academia} onChange={handleAcademiaChange}>
              <option value="">Seleccione una academia</option>
              {academias.map((academia) => (
                <option key={academia.id} value={academia.id}>
                  {academia.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio:</label>
            <input type="number" id="precio" className="form-control" value={precio} onChange={handlePrecioChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ingles">Inglés:</label>
            <input type="checkbox" id="ingles" checked={ingles} onChange={handleInglesChange} />
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Imagen:</label>
            <input type="file" id="imagen" className="form-control-file" onChange={handleImagenChange} />
          </div>
          <button type="submit" className="btn btn-primary">Crear Curso</button>
        </form>
      </div>
    </>
  );
}

// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../Ultimo/AuthContext';

// export const BotonCrearAula = () => {
//   const { authTokens, logoutUser } = useContext(AuthContext);
//   const [nombre, setNombre] = useState('');
//   const [descripcion, setDescripcion] = useState('');
//   const [academia, setAcademia] = useState(null);
//   const [precio, setPrecio] = useState(0);
//   const [ingles, setIngles] = useState(true);
//   const [imagen, setImagen] = useState(null);

//   const handleNombreChange = (event) => setNombre(event.target.value);
//   const handleDescripcionChange = (event) => setDescripcion(event.target.value);
//   const handleAcademiaChange = (event) => setAcademia(event.target.value);
//   const handlePrecioChange = (event) => setPrecio(event.target.value);
//   const handleInglesChange = (event) => setIngles(event.target.checked);
//   const handleImagenChange = (event) => setImagen(event.target.files[0]);

//   const handleNombreChange = (event) => setNombre(event.target.value);
//   const handleAcademiaChange = (event) => setAcademia(event.target.value);

//   const crearAula = async () => {
//     e.preventDefault();
//     const data = {
//       nombre: nombre,
//       academia: academia, // Reemplaza academia con el ID de la academia a la que pertenece el aula
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/cursos/', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer ' + String(authTokens.access),
//         },
//         body:data,
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Curso creado:', responseData);
//         // Realiza cualquier acción adicional que necesites con la respuesta de la API
//       } else if (response.status === 401) {
//         console.log('No autorizado');
//         logoutUser();
//       } else {
//         console.log('Error al crear el curso:', response.status);
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//     }
//   };
 

//   useEffect(() => {
//     const getAcademias = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/academias/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + String(authTokens.access)
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log("academias:", data);
//           setAcademias(data);
//         } else if (response.status === 401) {
//           console.log('No autorizado');
//           logoutUser();
//         } else {
//           console.log('Error al obtener las academias:', response.status);
//         }
//       } catch (error) {
//         console.error('Error en la solicitud:', error);
//       }
//     };

//     getAcademias();
//   }, []);

//   return (
//     <>
//     <div className="form-container">
//       <h2>Nuevo Curso</h2>
//       <form onSubmit={crearCurso}>
//         <div className="form-group">
//           <label htmlFor="nombre">Nombre:</label>
//           <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="descripcion">Descripción:</label>
//           <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
//         </div>
//         {( localStorage.getItem('academia') && localStorage.getItem('academia') != 'Todo') && (
//             <div className="form-group">
//               <label htmlFor="academia">Academia:</label>
//               <select id="academia" className="form-control" value={academia} onChange={handleAcademiaChange}>
//                 <option value="">Seleccione una academia</option>
//                 {academias.map((academia) => (
//                   <option key={academia.id} value={academia.id}>
//                     {academia.nombre}
//                   </option>
//                 ))}
//         <div className="form-group">
//           <label htmlFor="precio">Precio:</label>
//           <input type="number" id="precio" className="form-control" value={precio} onChange={handlePrecioChange} />
//         <div/>
       
//         <div className="form-group">
//           {/* <label htmlFor="imagen">Imagen:</label>
//           <input type="file" id="imagen" className/> */}
//         <label htmlFor="imagen">Imagen:</label>
//         <input type="file" id="imagen" className="form-control-file" onChange={handleImagenChange} />
//       </div>
//       <button type="submit" className="btn btn-primary">Crear Curso</button>
//     </form>
//   </div>
 
// </>
//   );
// };




    {/* // -------------
    // <div>
    //   <div className="form-container">
    //     <h2>Nuevo Grupo</h2>
    //     <form onSubmit={crearAula}>
    //       <div className="form-group">
    //         <label htmlFor="nombre">Nombre:</label>
    //         <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} />
    //       </div>
    //       {( localStorage.getItem('academia') && localStorage.getItem('academia') != 'Todo') && (
    //         <div className="form-group">
    //           <label htmlFor="academia">Academia:</label>
    //           <select id="academia" className="form-control" value={academia} onChange={handleAcademiaChange}>
    //             <option value="">Seleccione una academia</option>
    //             {academias.map((academia) => (
    //               <option key={academia.id} value={academia.id}>
    //                 {academia.nombre}
    //               </option>
    //             ))}
    //           </select>
           
    //           </div>
    //         )}
    //       <button type="submit" className="btn btn-primary">Registrar</button>
    //     </form>
    //   </div>
    // </div>
    // </> */}




// import React, { useState, useContext } from 'react';
// import AuthContext from '../Ultimo/AuthContext';


// export const CrearCurso = () => {
    // const { authTokens, logoutUser } = useContext(AuthContext);
    // const [nombre, setNombre] = useState('');
    // const [descripcion, setDescripcion] = useState('');
    // const [academia, setAcademia] = useState(null);
    // const [precio, setPrecio] = useState(0);
    // const [ingles, setIngles] = useState(true);
    // const [imagen, setImagen] = useState(null);
  
    // const handleNombreChange = (event) => setNombre(event.target.value);
    // const handleDescripcionChange = (event) => setDescripcion(event.target.value);
    // const handleAcademiaChange = (event) => setAcademia(event.target.value);
    // const handlePrecioChange = (event) => setPrecio(event.target.value);
    // const handleInglesChange = (event) => setIngles(event.target.checked);
    // const handleImagenChange = (event) => setImagen(event.target.files[0]);
  
//     const crearCurso = async () => {
    //     e.preventDefault();
    //     const data = {
    //         nombre: nombre,
    //         descripcion:descripcion,
    //         academia: academia, // Reemplaza academia con el ID de la academia a la que pertenece el aula
    //         precio:precio,
    //         ingles:ingles,
    //         imagen:imagen,
            
    //       };
  
    //   try {
    //     const response = await fetch('http://127.0.0.1:8000/api/cursos/', {
    //       method: 'POST',
    //       headers: {
    //         Authorization: 'Bearer ' + String(authTokens.access),
    //       },
    //       body:data,
    //     });
  
    //     if (response.ok) {
    //       const responseData = await response.json();
    //       console.log('Curso creado:', responseData);
    //       // Realiza cualquier acción adicional que necesites con la respuesta de la API
    //     } else if (response.status === 401) {
    //       console.log('No autorizado');
    //       logoutUser();
    //     } else {
    //       console.log('Error al crear el curso:', response.status);
    //     }
    //   } catch (error) {
    //     console.error('Error en la solicitud:', error);
    //   }
    // };
  
//     return (
//       <div>
    //     <div className="form-container">
    //       <h2>Nuevo Curso</h2>
    //       <form onSubmit={crearCurso}>
    //         <div className="form-group">
    //           <label htmlFor="nombre">Nombre:</label>
    //           <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="descripcion">Descripción:</label>
    //           <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="academia">Academia:</label>
    //           <input type="text" id="academia" className="form-control" value={academia} onChange={handleAcademiaChange} />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="precio">Precio:</label>
    //           <input type="number" id="precio" className="form-control" value={precio} onChange={handlePrecioChange} />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="ingles">Inglés:</label>
    //           <input type="checkbox" id="ingles" checked={ingles} onChange={handleInglesChange} />
    //         </div>
    //         <div className="form-group">
    //           {/* <label htmlFor="imagen">Imagen:</label>
    //           <input type="file" id="imagen" className/> */}
    //         <label htmlFor="imagen">Imagen:</label>
    //         <input type="file" id="imagen" className="form-control-file" onChange={handleImagenChange} />
    //       </div>
    //       <button type="submit" className="btn btn-primary">Crear Curso</button>
    //     </form>
    //   </div>
    // </div>
//   );
// };

