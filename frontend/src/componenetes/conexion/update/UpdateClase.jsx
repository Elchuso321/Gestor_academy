import React, { useState, useEffect, useContext } from 'react';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';

const URL_API = import.meta.env.VITE_API_URL
import {useNavigate} from 'react-router-dom'

export const UpdateFormClase = ({ id = 1 }) => {
    const navigate = useNavigate()
    const [profesor, setProfesor] = useState(null); // Reemplaza profesor con el ID del profesor que está logueado
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

    const updateProfesor = async (e) => {
        e.preventDefault();
        const esFormularioValido = validarFormulario();
        if (esFormularioValido) {
            try {
                const academ=JSON.parse(localStorage.getItem('academia'))
                console.log("ACADEMMMMM!",academ)
                const data = {
                    nombre: nombre,
                    descripcion: descripcion,
                    academia: academ, // Reemplaza academia con el ID de la academia a la que pertenece el aula
                    precio: precio,
                    ingles: ingles,
                    // imagen: imagen,
                };
                console.log('data:', data)
                // console.log('userID:', userId)
                const response = await fetch(`${URL_API}/api/clase/update/${id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Evento creado:', responseData);
                    // Realiza cualquier acción adicional que necesites con la respuesta de la API
                    window.location.reload();
                    // navigate(`/admin/academia/clases/${id}`)
                } else if (response.status === 401) {
                    console.log('No autorizado');
                    // logoutUser();
                } else {
                    console.log('Error al crear el evento:', response.status);
                }
            } catch (error) {
                console.error(error);
                // Realiza el manejo de errores adecuado
            }
        }else{
            console.log("Formulario inválido");
        }

    }



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
        const academ=localStorage.getItem('academia')
        console.log(academ);
        setAcademia(academ);
        // getAcademias();
        // setAcademia(JSON.parse(localStorage.getItem('academia')))
    }, []);




    useEffect(() => {
        const obtenerDetalleProfesor = async () => {
            try {
                
                const response = await fetch(`${URL_API}/api/clase/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setProfesor(data);
                } else {
                    console.error('Error al obtener el detalle del profesor');
                }
            } catch (error) {
                console.error('Error de red', error);
            }
        }
        console.log("PERRROOOO");
        obtenerDetalleProfesor();
    }, [id]);

    useEffect(() => {
        if (profesor) {
            setNombre(profesor.nombre);
            setDescripcion(profesor.descripcion);
            setAcademia(profesor.academia);
            setPrecio(profesor.precio);
            setIngles(profesor.ingles);

        }
    }, [profesor]);

    return (
        <>
            
            <div className="form-container">
                <h2>Modificar Curso</h2>
                <form onSubmit={updateProfesor}>
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
    ;

}
