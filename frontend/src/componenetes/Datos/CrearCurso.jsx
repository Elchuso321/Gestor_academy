import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
const URL_API = import.meta.env.VITE_API_URL
import {useNavigate} from 'react-router-dom'
export const CrearCurso = () => {
  const navigate = useNavigate()
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

  const [errores, setErrores] = useState({});
  function validarFormulario() {
      const errores = {};
    
      if (nombre.trim() === '') {
        errores.nombre = 'El nombre es requerido.';
      }
    
      if (descripcion.trim() === '') {
        errores.descripcion = 'La descripción es requerida.';
      }
    
      // if (academia === '') {
      //   errores.academia = 'Debe seleccionar una academia.';
      // }
    
      if (precio === '') {
        errores.precio = 'El precio es requerido.';
      }
    
      setErrores(errores);
    
      return Object.keys(errores).length === 0;
    }

  const crearCurso = async (event) => {
    event.preventDefault();
    const esFormularioValido = validarFormulario();
    console.log("ES FORMULARIO VALIDO",esFormularioValido)
    const academ=JSON.parse(localStorage.getItem('academia'))
    if (esFormularioValido) {

    const data = {
      nombre: nombre,
      descripcion: descripcion,
      academia: academ, // Reemplaza academia con el ID de la academia a la que pertenece el aula
      precio: precio,
      ingles: ingles,
      // imagen: imagen,
    };
    console.log(imagen)

    try {
      const response = await fetch(`${URL_API}/api/cursos/`, {
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
        navigate(`/admin/academia/clases/${responseData.id}`)
      } else if (response.status === 401) {
        console.log('No autorizado');
        logoutUser();
      } else {
        console.log('Error al crear el curso:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }else{
    console.log('Formulario inválido');
  }
  };

  useEffect(() => {
    const getAcademias = async () => {
      try {
        const response = await fetch(`${URL_API}/api/academias/`, {
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
                    {errores.nombre && <span className="error" style={{color: "red"}}>{errores.nombre}</span>}
                    </div>
                    <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
                    {errores.descripcion && <span className="error" style={{color: "red"}}>{errores.descripcion}</span>}
                    </div>
                    {/* <div className="form-group">
                    <label htmlFor="academia">Academia:</label>
                    <select id="academia" className="form-control" value={academia} onChange={handleAcademiaChange}>
                        <option value="">Seleccione una academia</option>
                        {academias.map((academia) => (
                        <option key={academia.id} value={academia.id}>
                            {academia.nombre}
                        </option>
                        ))}
                    </select>
                    {errores.academia && <span className="error">{errores.academia}</span>}
                    </div> */}
                    <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio" className="form-control" value={precio} onChange={handlePrecioChange} />
                    {errores.precio && <span className="error" style="color: red;">{errores.precio}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingles">Inglés:</label>
                        <input type="checkbox" id="ingles" checked={ingles} onChange={handleInglesChange} />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="imagen">Imagen:</label>
                        <input type="file" id="imagen" className="form-control-file" onChange={handleImagenChange} />
                    </div> */}
                    <button type="submit" className="btn btn-primary">Modificar Curso</button>
                </form>
      </div>
    </>
  );
}


