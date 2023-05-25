import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { DetalleProfesor } from './VistaDetalleProfesor';

export const MostrarProfesores = ({ mostrar }) => {
  const [mostrearDetalle, setMostrarDetalle] = useState(false);
  const [notes, setNotes] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [selectedProfesor, setSelectedProfesor] = useState(null);

  const handleClickProfesor = (id) => {
    setSelectedProfesor(id);
    setMostrarDetalle(true);
  };

  const handleVolver = () => {
    setMostrarDetalle(false);
    setSelectedProfesor(null);
  };

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profesores/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else if (response.statusText === 'Unauthorized') {
          console.log('Fallo');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
    };

    getNotes();
  }, [authTokens.access]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h1>Lista de Profesores</h1>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <button className="primaey" onClick={mostrar}>Crear</button>
        </div>
      </div>
      {!mostrearDetalle && (
        <ul className="list-group mt-4">
          {notes.map((note) => (
            <li key={note.usuario.id}>
              <button onClick={() => handleClickProfesor(note.id)}>{note.id}{note.usuario.nombre}</button>
            </li>
          ))}
        </ul>
      )}
      {mostrearDetalle && selectedProfesor && (
        <div>
          <DetalleProfesor id={selectedProfesor} />
          <button onClick={handleVolver}>Volver</button>
        </div>
      )}
    </div>
  );
};



// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../Ultimo/AuthContext';
// import { DetalleProfesor } from './VistaDetalleProfesor';

// export const MostrarProfesores = ({ mostrar }) => {
//   const [mostrearDetalle, setMostrarDetalle] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const { authTokens, logoutUser } = useContext(AuthContext);
//   const [selectedProfesor, setSelectedProfesor] = useState(null);

//   const handleClickProfesor = (id) => {
//     setSelectedProfesor(id);
//     setMostrarDetalle(true);
//   };

//   useEffect(() => {
//     const getNotes = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/profesores/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + String(authTokens.access),
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setNotes(data);
//         } else if (response.statusText === 'Unauthorized') {
//           console.log('Fallo');
//         }
//       } catch (error) {
//         console.error('Error de red', error);
//       }
//     };

//     getNotes();
//   }, [authTokens.access]);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-8">
//           <h1>Lista de Profesores</h1>
//         </div>
//         <div className="col-md-4 d-flex align-items-center justify-content-end">
//           <button className="primaey" onClick={mostrar}>Crear</button>
//         </div>
//       </div>
//       {!mostrearDetalle && (
//         <ul className="list-group mt-4">
//           {notes.map((note) => (
//             <li key={note.usuario}>
//               <button onClick={() => handleClickProfesor(note.id)}>{note.usuario}</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {mostrearDetalle && selectedProfesor && <DetalleProfesor id={selectedProfesor} />}
//     </div>
//   );
// };



// import React, {useState, useEffect, useContext} from 'react'
// import AuthContext from '../Ultimo/AuthContext'
// import { DetalleProfesor } from './VistaDetalleProfesor';

// export const MostrarProfesores=({mostrar})=>{
//     let [mostrearDetalle, setMostrarDetalle] = useState(false)
//     let [notes, setNotes] = useState([])
//     let {authTokens, logoutUser} = useContext(AuthContext)
//     const [selectedProfesor, setSelectedProfesor] = useState(null);
//     const handleClickProfesor = (id) => {
//       console.log("id:",id)
//       setSelectedProfesor(id);
//       setMostrarDetalle(true)
//     };
//     let getNotes = async() =>{
//         let response = await fetch('http://127.0.0.1:8000/api/profesores/', {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         let data = await response.json()
        
//         if(response.status === 200){
//             console.log("profesores:",data)
//             setNotes(data)
            
//         }else if(response.statusText === 'Unauthorized'){
//             console.log("fallo")
//         }
        
//     }

//     useEffect(()=> {
//         getNotes()
//     },[])

//     return (
//       <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-8">
//           <h1>Lista de Profesores</h1>
//         </div>
//         <div className="col-md-4 d-flex align-items-center justify-content-end">
//           {/* <button className="btn btn-primary">Nuevo Profesor</button> */}
//           <button className="primaey" onClick={mostrar}>Crear</button>
//         </div>
//       </div>
//       <ul className="list-group mt-4">
//         {notes.map((note) => (
//           <li key={note.usuario}>
//             <button onClick={() => handleClickProfesor(note.id)}>{note.usuario}</button>
//           </li>
//         ))}
//       </ul>
//       {selectedProfesor && <DetalleProfesor id={selectedProfesor} />}
//     </div>
//   );
// };
    //   )
    // }
      //   <div className="container-fluid">
      // <div className="row">
      //   <div className="col-md-8">
      //     <h1>Lista de Profesores</h1>
      //   </div>
      //   <div className="col-md-4 d-flex align-items-center justify-content-end">
      //     {/* <button className="btn btn-primary">Nuevo Profesor</button> */}
      //     <button className="primaey" onClick={mostrar}>Crear</button>
      //   </div>
      // </div>
      // <ul className="list-group mt-4">
    //   {notes.map(note => (
    //                 <li key={note.usuario} >{note.usuario}</li>
    //             ))}
    //   </ul>
    // </div>
    