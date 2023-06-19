import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { DetalleProfesor } from './VistaDetalleProfesor';
import { UpdateFormProfe } from '../conexion/update/UpdateComponenteProfe';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom'
import "../estilos/boton.css"
import styled from 'styled-components';
import { RegisterFormAlumno } from '../conexion/register/RegisterComponenteAlumno';
const ITEMS_PER_PAGE = 12; // Número de elementos por página

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

export const MostrarAlumnos=()=>{
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
    navigate(`/admin/academia/alumno/${id}`)
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
        const response = await fetch(`${URL_API}/api/alumnos/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const academ=JSON.parse(localStorage.getItem('academia'))
          const data = await response.json();
          console.log(data)
          console.log(academ)
          const filtrados = data.filter((item) => item.usuario.academia.id === academ);
          // dataReal=data.usuario.academiac
          console.log(filtrados)
          setNotes(filtrados);
          setNotesFilter(filtrados);
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
  (filtrarNombre && note.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarApellido && note.usuario.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarApellido && note.usuario.segundo_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarTelefono && note.telefono_madre && note.telefono_padre.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarTelefono && note.telefono_madre && String(note.telefono_madre).toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarEmail && note.usuario.email && String(note.usuario.email).toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarAcademia && note.usuario.academia && String(note.usuario.academia.nombre).toLowerCase().includes(searchTerm.toLowerCase()))
  // String(note.telefono).toLowerCase().includes(searchTerm.toLowerCase())
  );
  setNotesFilter(filteredNotes)


}, [searchTerm])
;
const filteredNotes = currentNotes.filter((note) =>
  (filtrarNombre && note.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarApellido && note.usuario.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarApellido && note.usuario.segundo_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarTelefono && note.telefono_madre && note.telefono_madre.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarTelefono && note.telefono_madre && note.telefono_padre.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarEmail && note.usuario.email && String(note.usuario.email).toLowerCase().includes(searchTerm.toLowerCase())) ||
  (filtrarAcademia && note.usuario.academia && String(note.usuario.academia.nombre).toLowerCase().includes(searchTerm.toLowerCase()))
);
//   const filteredNotes = currentNotes.filter((note) =>
//   note.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   note.usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   note.usuario.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   note.usuario.segundo_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   String(note.telefono).toLowerCase().includes(searchTerm.toLowerCase())
// );

  const pageCount = Math.ceil(notesFilter.length / ITEMS_PER_PAGE);

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        <div className="col-md-8">
          <h1>Lista de Alumnos</h1>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
        <button className="custom-button" onClick={handleTextClick}>
                Crear
              </button>
              <Modal isOpen={isModalOpenCrear} onClose={handleCloseModal}>
              
                <RegisterFormAlumno />
              </Modal>
        </div>
      </div>
  {/* <RegisterFormAlumno /> */}
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
          <table className="table table-striped table-hover mt-4 custom-table">
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
                <tr key={note.usuario.id} onClick={() => handleClickProfesor(note.id)}>
                  <td>{`${note.usuario.nombre} ${note.usuario.primer_apellido} ${note.usuario.segundo_apellido}`}</td>
                  <td>{note.usuario.email}</td>
                  <td>{note.telefono_madre} <br /> {note.telefono_padre}</td>
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

      
    </div>
  );
};


  //     let [notes, setNotes] = useState([])
//     let {authTokens, logoutUser} = useContext(AuthContext)
//     const [mostrearDetalle, setMostrarDetalle] = useState(false);
//     const [selectedAlumno, setSelectedAlumno] = useState(null);


//     let getNotes = async() =>{
//         let response = await fetch(`${URL_API}/api/alumnos/`, {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         let data = await response.json()
        
//         if(response.status === 200){
//             console.log("alumnos:",data)
//             setNotes(data)
           

//         }else if(response.statusText === 'Unauthorized'){
//             console.log("fallo")
//             // logoutUser()
//         }
        
//     }

//     useEffect(()=> {
//         getNotes()
//     },[])

//     return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-8">
//           <h1>Lista de Alumnos</h1>
//         </div>
//         {/* <div className="col-md-4 d-flex align-items-center justify-content-end">
//           <button className="primaey" onClick={mostrar}>Crear</button>
//         </div> */}
//       </div>
//       {!mostrearDetalle && (
//         <ul className="list-group mt-4">
//           {notes.map((note) => (
//             <li key={note.usuario.id}>
//               <button onClick={() => handleClickAlumno(note.id)}>{note.id}{note.usuario.nombre}</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {mostrearDetalle && selectedAlumno && (
//         <div>
//           {/* <UpdateFormAlumno id={selectedAlumno} /> */}
//           <button onClick={handleVolver}>Volver</button>
//         </div>
//       )}

//       <br /><br /><br /><br />
     
//     </div>
//   );
// };


//         <div>
           
//             <br /><br /><br /><br />
//             <h3>Alumno</h3>
//             <ul>
//                 {notes.map(note => (
//                     <li key={note.id} >{note.usuario.nombre}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }