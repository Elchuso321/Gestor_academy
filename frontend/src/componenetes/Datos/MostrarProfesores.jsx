import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { DetalleProfesor } from './VistaDetalleProfesor';
import { UpdateFormProfe } from '../conexion/update/UpdateComponenteProfe';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom'
import "../estilos/boton.css"
import styled from 'styled-components';
import { RegisterFormProfe } from '../conexion/register/RegisterComponenteProfe';
const ITEMS_PER_PAGE = 13; // Número de elementos por página

const URL_API = import.meta.env.VITE_API_URL

const ModalWrapper = styled.div`
  /* Estilos para el modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  /* Estilos para el contenido del modal */
  background-color: white;
  padding: 30px;
`;


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <button onClick={onClose} className ="btn btn-danger" style={{ float: 'right'}}>
        Cerrar
      </button>
      </ModalContent>
    </ModalWrapper>
  );
};

export const MostrarProfesores = ({ mostrar }) => {
  const navigate = useNavigate()
  const [mostrearDetalle, setMostrarDetalle] = useState(false);
  const [notes, setNotes] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [notesFilter, setNotesFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentNotes, setCurrentNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [filtrarNombre, setFiltrarNombre] = useState(true);
  const [filtrarApellido, setFiltrarApellido] = useState(true);
  const [filtrarTelefono, setFiltrarTelefono] = useState(true);
  const [filtrarEmail, setFiltrarEmail] = useState(true);
  const [filtrarAcademia, setFiltrarAcademia] = useState(true);
  const [isModalOpenCrear, setIsModalOpenCrear] = useState(false);

  const handleTextClick = () => {
    setIsModalOpenCrear(true);
  };
  const handleCloseModal = () => {
    setIsModalOpenCrear(false);
    

  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleClickProfesor = (id) => {
    navigate(`/admin/academia/profesor/${id}`)
    // setSelectedProfesor(id);
    // setMostrarDetalle(true);
  };

  const handleVolver = () => {
    setMostrarDetalle(false);
    setSelectedProfesor(null);
  };

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch(`${URL_API}/api/profesores/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("DATA",data);
          const dataFiltrado= data.filter((item) => item.usuario.academia.id == JSON.parse(localStorage.getItem('academia')));
          console.log("DATA FILTRADOS ACADEMIA",dataFiltrado);
          setNotes(dataFiltrado);
          setNotesFilter(dataFiltrado);
        } else if (response.statusText === 'Unauthorized') {
          console.log('Fallo');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
    };

    getNotes();
  }, [authTokens.access]);

  useEffect(() => {
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentNotesSlice = notesFilter.slice(offset, offset + ITEMS_PER_PAGE);
    setCurrentNotes(currentNotesSlice);
  }, [notesFilter, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };
useEffect(() => {
  const filteredNotes = notes.filter((note) =>
  note.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  String(note.telefono).toLowerCase().includes(searchTerm.toLowerCase())
  );
  setNotesFilter(filteredNotes)


}, [searchTerm])
;
const filteredNotes = currentNotes.filter((note) =>
  (filtrarNombre && note.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarApellido && note.usuario.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarApellido && note.usuario.segundo_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarTelefono && note.telefono && String(note.telefono).toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarEmail && String(note.usuario.email).toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarAcademia && note.usuario.academia &&String(note.usuario.academia.nombre).toLowerCase().includes(searchTerm.toLowerCase()))
);


  const pageCount = Math.ceil(notesFilter.length / ITEMS_PER_PAGE);

  return (
    <div className="container-fluid">
      
      <div className="row">
        <div className="col-md-8">
          <h1>Lista de Profesores</h1>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
        <button className="custom-button" onClick={handleTextClick}>
                Crear
              </button>
              <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
              
                <RegisterFormProfe />
              </Modal>
        </div>
      </div>

      <div className="form-group">
  <span className='mr-6'>Filtrar por:  </span>
  <br />
      <div className="form-check form-check-inline">

  <input
    className="form-check-input"
    type="checkbox"
    checked={filtrarNombre}
    onChange={() => setFiltrarNombre(!filtrarNombre)}
  />

  <label className="form-check-label">Nombre</label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    checked={filtrarApellido}
    onChange={() => setFiltrarApellido(!filtrarApellido)}
  />
  <label className="form-check-label">Apellidos</label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    checked={filtrarTelefono}
    onChange={() => setFiltrarTelefono(!filtrarTelefono)}
  />
  <label className="form-check-label">Teléfono</label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    checked={filtrarEmail}
    onChange={() => setFiltrarEmail(!filtrarEmail)}
  />
  <label className="form-check-label">Email</label>
</div>
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    checked={filtrarAcademia}
    onChange={() => setFiltrarAcademia(!filtrarAcademia)}
  />
  <label className="form-check-label">Academia</label>
</div>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {!mostrearDetalle && (
        <div className="table-responsive">
        <table className="table table-striped table-hover mt-4 custom-table rounded">
          <thead className="thead-dark">
            <tr>
              <th>Nombre completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Academia</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((note) => (
              <tr key={note.usuario.id} onClick={() => handleClickProfesor(note.id)} className="table-row">
                <td>{`${note.usuario.nombre} ${note.usuario.primer_apellido} ${note.usuario.segundo_apellido}`}</td>
                <td>{note.usuario.email}</td>
                <td>{note.telefono}</td>
                <td>{note.usuario.academia === null ? '' : note.usuario.academia.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
      )}

      <div style={{ position: 'relative' }} >
        <div >
        <ReactPaginate
          previousLabel={"<-"}
          nextLabel={"->"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          subContainerClassName={"pagination"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          breakClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          activeClassName={"paginationActive"}
        />
        </div>
      </div>

      {mostrearDetalle && selectedProfesor && (
        <div>
          <RegisterFormProfe />
          <button onClick={handleVolver}>Volver</button>
        </div>
      )}
    </div>
  );
};


// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../Ultimo/AuthContext';
// import { DetalleProfesor } from './VistaDetalleProfesor';
// import { UpdateFormProfe } from '../conexion/update/UpdateComponenteProfe';
// import ReactPaginate from 'react-paginate';

// const URL_API = import.meta.env.VITE_API_URL;
// const ITEMS_PER_PAGE = 5; // Número de elementos por página

// export const MostrarProfesores = ({ mostrar }) => {
//   const [mostrearDetalle, setMostrarDetalle] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const { authTokens, logoutUser } = useContext(AuthContext);
//   const [selectedProfesor, setSelectedProfesor] = useState(null);

//   const [currentPage, setCurrentPage] = useState(0);
//   const [currentNotes, setCurrentNotes] = useState([]);

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleClickProfesor = (id) => {
//     setSelectedProfesor(id);
//     setMostrarDetalle(true);
//   };

//   const handleVolver = () => {
//     setMostrarDetalle(false);
//     setSelectedProfesor(null);
//   };

//   useEffect(() => {
//     const getNotes = async () => {
//       try {
//         const response = await fetch(`${URL_API}/api/profesores/`, {
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

//   useEffect(() => {
//     const offset = currentPage * ITEMS_PER_PAGE;
//     const currentNotesSlice = notes.slice(offset, offset + ITEMS_PER_PAGE);
//     setCurrentNotes(currentNotesSlice);
//   }, [notes, currentPage]);

//   const pageCount = Math.ceil(notes.length / ITEMS_PER_PAGE);

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
//         <div className="table-responsive">
//           <table className="table table-striped table-hover mt-4 custom-table">
//             <thead className="thead-dark">
//               <tr>
//                 <th className='col-3'>Nombre completo</th>
//                 <th className='col-3'>Email</th>
//                 <th className='col-3'>Teléfono</th>
//                 <th className='col-3'>Academia</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentNotes.map((note) => (
//                 <tr key={note.usuario.id} onClick={() => handleClickProfesor(note.id)}>
//                   <td className='col-3'>{`${note.usuario.nombre} ${note.usuario.primer_apellido} ${note.usuario.segundo_apellido}`}</td>
//                   <td className='col-3'>{note.usuario.email}</td>
//                   <td className='col-3'>{note.telefono}</td>
//                   <td className='col-3'>{note.usuario.academia === null ? '' : note.usuario.academia.nombre}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Agrega la paginación debajo de la tabla */}
//       <div className="pagination-container">
//         <ReactPaginate
//           previousLabel={"Anterior"}
//           nextLabel={"Siguiente"}
//           breakLabel={"..."}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageChange}
//           containerClassName={"pagination justify-content-center"}
//           subContainerClassName={"pagination"}
//           previousClassName={"page-item"}
//           nextClassName={"page-item"}
//           breakClassName={"page-item"}
//           pageLinkClassName={"page-link"}
//           previousLinkClassName={"page-link"}
//           nextLinkClassName={"page-link"}
//           breakLinkClassName={"page-link"}
//           activeClassName={"active"}
//         />
//       </div>

//       {mostrearDetalle && selectedProfesor && (
//         <div>
//           <UpdateFormProfe id={selectedProfesor} />
//           <button onClick={handleVolver}>Volver</button>
//         </div>
//       )}
//     </div>
//   );
// };



// // import React, { useState, useEffect, useContext } from 'react';
// // import AuthContext from '../Ultimo/AuthContext';
// // import { DetalleProfesor } from './VistaDetalleProfesor';
// // import { UpdateFormProfe } from '../conexion/update/UpdateComponenteProfe';
// // import ReactPaginate from 'react-paginate';

// // const URL_API = import.meta.env.VITE_API_URL
// // const ITEMS_PER_PAGE = 2; // Número de elementos por página

// // export const MostrarProfesores = ({ mostrar }) => {
// //   const [mostrearDetalle, setMostrarDetalle] = useState(false);
// //   const [notes, setNotes] = useState([]);
// //   const { authTokens, logoutUser } = useContext(AuthContext);
// //   const [selectedProfesor, setSelectedProfesor] = useState(null);

// //   const [currentPage, setCurrentPage] = useState(1);
// //   // const [pageCount, setPageCount] = useState(0);
// //   const [currentNotes, setCurrentNotes] = useState([]);
  

// //   const handlePageChange = (selectedPage) => {
// //     setCurrentPage(selectedPage.selected);
// //   };



// //   const handleClickProfesor = (id) => {
// //     setSelectedProfesor(id);
// //     setMostrarDetalle(true);
// //   };
// //   // var pageCount= 0;
// //   const handleVolver = () => {
// //     setMostrarDetalle(false);
// //     setSelectedProfesor(null);
// //   };
// //   // var currentNotes = []

// //   useEffect(() => {
// //     const getNotes = async () => {
// //       try {
// //         const response = await fetch(`${URL_API}/api/profesores/`, {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': 'Bearer ' + String(authTokens.access),
// //           },
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           setNotes(data);
// //         } else if (response.statusText === 'Unauthorized') {
// //           console.log('Fallo');
// //         }
// //       } catch (error) {
// //         console.error('Error de red', error);
// //       }
// //     };

// //     getNotes();


// //   const offset = currentPage * ITEMS_PER_PAGE;
// //   setCurrentNotes =( notes.slice(offset, offset + ITEMS_PER_PAGE));

// //   const pageCount = Math.ceil(ownPlayer.characters.length / charactersPerPage);



// //     setPageCount (Math.ceil(notes.length / ITEMS_PER_PAGE))
// //     const currentNotes1 = notes.slice(
// //       currentPage * ITEMS_PER_PAGE,
// //       (currentPage + 1) * ITEMS_PER_PAGE
// //     );
// //     setCurrentNotes(currentNotes1);
// //   }, [authTokens.access]);

// //   // const handlePageChange = ({ selected }) => {
// //   //   setCurrentPage(selected);
// //   // };
// //   return (
// //     <div className="container-fluid">
// //       <div className="row">
// //         <div className="col-md-8">
// //           <h1>Lista de Profesores</h1>
// //         </div>
// //         <div className="col-md-4 d-flex align-items-center justify-content-end">
// //           <button className="primaey" onClick={mostrar}>Crear</button>
// //         </div>
// //       </div>
// //       {!mostrearDetalle && (
// //         <div className="table-responsive">
// //           <table className="table table-striped table-hover mt-4 custom-table">
// //             <thead className="thead-dark">
// //               <tr>
// //                 <th>Nombre completo</th>
// //                 <th>Email</th>
// //                 <th>Teléfono</th>
// //                 <th>Academia</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {currentNotes.map((note) => (
// //                 <tr key={note.usuario.id} onClick={() => handleClickProfesor(note.id)}>
// //                   <td>{`${note.usuario.nombre} ${note.usuario.primer_apellido} ${note.usuario.segundo_apellido}`}</td>
// //                   <td>{note.usuario.email}</td>
// //                   <td>{note.telefono}</td>
// //                   <td>{note.usuario.academia === null ? '' : note.usuario.academia.nombre}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Agrega la paginación debajo de la tabla */}
// //       <div className="pagination-container">
// //         <ReactPaginate
// //           previousLabel={"Anterior"}
// //           nextLabel={"Siguiente"}
// //           breakLabel={"..."}
// //           pageCount={pageCount}
// //           marginPagesDisplayed={2}
// //           pageRangeDisplayed={5}
// //           onPageChange={handlePageChange}
// //           containerClassName={"pagination justify-content-center"}
// //           subContainerClassName={"pagination"}
// //           previousClassName={"page-item"}
// //           nextClassName={"page-item"}
// //           breakClassName={"page-item"}
// //           pageLinkClassName={"page-link"}
// //           previousLinkClassName={"page-link"}
// //           nextLinkClassName={"page-link"}
// //           breakLinkClassName={"page-link"}
// //           activeClassName={"active"}
// //         />
// //       </div>

     
     
// //       {/* {!mostrearDetalle && (
// //   <div className="table-responsive">
// //     <table className="table table-striped table-hover mt-4 custom-table">
// //       <thead className="thead-dark">
// //         <tr>
// //           <th>Nombre completo</th>
// //           <th>Email</th>
// //           <th>Teléfono</th>
// //           <th>Academia</th>
          
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {notes.map((note) => (
// //           <tr key={note.usuario.id} onClick={() => handleClickProfesor(note.id)}>
// //             <td>{`${note.usuario.nombre} ${note.usuario.primer_apellido} ${note.usuario.segundo_apellido}`}</td>
// //             <td>{note.usuario.email}</td>
// //             <td>{note.telefono}</td>
// //             {note.usuario.academia === null && <td></td>}
// //             {note.usuario.academia !== null && <td>{note.usuario.academia.nombre}</td>}
            
          
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   </div>
// // )} */}

// //       {/* {!mostrearDetalle && (
// //         <ul className="list-group mt-4">
// //           {notes.map((note) => (
// //             <li key={note.usuario.id}>
// //               <button onClick={() => handleClickProfesor(note.id)}>{note.usuario.nombre} {note.usuario.primer_apellido}{note.usuario.segundo_apellido}{note.telefono}{note.usuario.email}{note.usuario.academia}</button>
// //             </li>
// //           ))}
// //         </ul>
// //       )} */}
// //       {mostrearDetalle && selectedProfesor && (
// //         <div>
// //           <UpdateFormProfe id={selectedProfesor} />
// //           {/* <DetalleProfesor id={selectedProfesor} /> */}
// //           <button onClick={handleVolver}>Volver</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

