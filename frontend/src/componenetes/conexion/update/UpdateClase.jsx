import React, { useState, useEffect, useContext } from 'react';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';

const URL_API = import.meta.env.VITE_API_URL


export const UpdateFormClase = ({ id = 1 }) => {
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


    const updateProfesor = async (userId) => {
        try {
            const data = {
                nombre: nombre,
                descripcion: descripcion,
                academia: academia, // Reemplaza academia con el ID de la academia a la que pertenece el aula
                precio: precio,
                ingles: ingles,
                // imagen: imagen,
            };
            const response = await fetch(`${URL_API}/api/clase/update/${userId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al actualizar el usuario');
            }

            const updatedUser = await response.json();
            // Realiza las acciones necesarias con el usuario actualizado
            console.log('Profesor actualizado:', updatedUser);
        } catch (error) {
            console.error(error);
            // Realiza el manejo de errores adecuado
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
            <br /><br /><br />
            <h1>HOLA</h1>
            <div className="form-container">
                <h2>Nuevo Curso</h2>
                <form onSubmit={updateProfesor}>
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
                    {/* <div className="form-group">
                        <label htmlFor="imagen">Imagen:</label>
                        <input type="file" id="imagen" className="form-control-file" onChange={handleImagenChange} />
                    </div> */}
                    <button type="submit" className="btn btn-primary">Crear Curso</button>
                </form>
            </div>

        </>
    );
    ;

}
