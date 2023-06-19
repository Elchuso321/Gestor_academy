import React, { useState, useEffect, useContext } from 'react';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';

const URL_API = import.meta.env.VITE_API_URL


export const UpdateFormEvento = ( {id} ) => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    console.log("id:", id)
  const [diaSemana, setDiaSemana] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [cursoOptions, setCursoOptions] = useState([]);
  const [profesorOptions, setProfesorOptions] = useState([]);
  const [aulaOptions, setAulaOptions] = useState([]);
  const [curso, setCurso] = useState('');
  const [profesor, setProfesor] = useState('');
  const [eventoProfesor, setEventoProfesor] = useState('');
  const [aula, setAula] = useState('');
    
    
    const [academia, setAcademia] = useState('');
    const [precio, setPrecio] = useState(0);
    const [ingles, setIngles] = useState(true);
    // const [imagen, setImagen] = useState(null);
    const [academias, setAcademias] = useState([]);

    // const handleNombreChange = (event) => setNombre(event.target.value);
    // const handleDescripcionChange = (event) => setDescripcion(event.target.value);
    const handleAcademiaChange = (event) => setAcademia(event.target.value);
    const handlePrecioChange = (event) => setPrecio(event.target.value);
    const handleInglesChange = (event) => setIngles(event.target.checked);
    const handleImagenChange = (event) => setImagen(event.target.files[0]);

    const handleDiaSemanaChange = event => setDiaSemana(event.target.value);
    const handleNombreChange = event => setNombre(event.target.value);
    const handleDescripcionChange = event => setDescripcion(event.target.value);
    const handleHoraInicioChange = event => setHoraInicio(event.target.value);
    const handleHoraFinChange = event => setHoraFin(event.target.value);
    const handleCursoChange = event => setCurso(event.target.value);
    const handleProfesorChange = event => setEventoProfesor(event.target.value);
    const handleAulaChange = event => setAula(event.target.value);

  const [errores, setErrores] = useState({});
  function validarFormulario() {
    const errores = {};
  
    if (diaSemana === '') {
      errores.diaSemana = 'Debe seleccionar un día de la semana.';
    }
  
    if (nombre.trim() === '') {
      errores.nombre = 'El nombre es requerido.';
    }
  
    if (descripcion.trim() === '') {
      errores.descripcion = 'La descripción es requerida.';
    }
  
    if (horaInicio === '') {
      errores.horaInicio = 'La hora de inicio es requerida.';
    }
  
    if (horaFin === '') {
      errores.horaFin = 'La hora de fin es requerida.';
    }
  
    if (curso === '') {
      errores.curso = 'Debe seleccionar un curso.';
    }
  
    if (eventoProfesor === '') {
      errores.profesor = 'Debe seleccionar un profesor.';
    }
  
    if (aula === '') {
      errores.aula = 'Debe seleccionar un aula.';
    }
  
    setErrores(errores);
    console.log("profesores",profesor)
    console.log(errores)
    return Object.keys(errores).length === 0;
  }
    
    useEffect(() => {
    
        const academ=JSON.parse(localStorage.getItem('academia'));    
        fetch(`${URL_API}/api/cursos/`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        })
          .then(response => response.json())
          .then(data => setCursoOptions(data.filter((item) => item.academia === academ)))
          .catch(error => console.error('Error al obtener las opciones de curso:', error));
        // console.log("profe",profesorOptions)
        // Obtener opciones de profesores
        fetch(`${URL_API}/api/profesores/`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        })
          .then(response => response.json())
          .then(data => setProfesorOptions(data.filter((item) => item.usuario.academia.id === academ)))
          .catch(error => console.error('Error al obtener las opciones de profesor:', error));
          
        // Obtener opciones de aulas
        fetch(`${URL_API}/api/aulas/`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        })
          .then(response => response.json())
          .then(data => setAulaOptions(data.filter((item) => item.academia === academ)))
          .catch(error => console.error('Error al obtener las opciones de aula:', error));
          data => setAulaOptions(data)
      }, [authTokens.access]);


    const updateEvento = async (e) => {
      e.preventDefault();
      const isValid = validarFormulario();
      if (isValid) {
        try {
            const data = {
                dia_semana: diaSemana,
                nombre: nombre,
                descripcion: descripcion,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                curso: curso,
                profesor: eventoProfesor,
                aula: aula
            };
            console.log("data123:", data)
            console.log("id:", id)
            const response = await fetch(`${URL_API}/api/evento/update/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al actualizar el evento');
            }

            const updatedUser = await response.json();
            // Realiza las acciones necesarias con el usuario actualizado
            console.log('Profesor actualizado:', updatedUser);
            window.location.reload();
        } catch (error) {
            console.error("ERROR",error.error);
            // Realiza el manejo de errores adecuado
        }

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
    }, [id]);




    useEffect(() => {
        const obtenerDetalleProfesor = async () => {
            try {
                const response = await fetch(`${URL_API}/api/evento/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                });

                if (response.ok) {
                  console.log("id",id)
                    const data = await response.json();
                    console.log("DETALLE EVENTO",data);
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
        console.log("PROFESOR", profesor)
        if (profesor) {
            setTimeout(() => {
            console.log("ME METI EVENTO")
            setNombre(profesor.nombre);
            setDescripcion(profesor.descripcion);
            setAula(profesor.aula);
            setCurso(profesor.curso);
            setEventoProfesor(profesor.profesor);
            setDiaSemana(profesor.dia_semana);
            setHoraInicio(profesor.hora_inicio);
            setHoraFin(profesor.hora_fin);
        
            }, 1000);
            // setAcademia(profesor.academia);
            // setPrecio(profesor.precio);
            // setIngles(profesor.ingles);
            

        }
    }, [profesor]);

    return (
        <>
            <div className="form-container">
            <form onSubmit={updateEvento}>
      <div className="form-group">
  <label htmlFor="diaSemana">Día de la semana:</label>
  <select id="diaSemana" className="form-control" value={diaSemana} onChange={handleDiaSemanaChange}>
    <option value="">Seleccione un día de la semana</option>
    <option value="L">Lunes</option>
    <option value="M">Martes</option>
    <option value="X">Miércoles</option>
    <option value="J">Jueves</option>
    <option value="V">Viernes</option>
    <option value="S">Sábado</option>
    <option value="D">Domingo</option>
  </select>
  {errores.diaSemana && <span className="error" style={{color: "red"}}>{errores.diaSemana}</span>}
</div>
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
<div className="form-group">
  <label htmlFor="horaInicio">Hora de inicio:</label>
  <input type="time" id="horaInicio" className="form-control" value={horaInicio} onChange={handleHoraInicioChange} />
  {errores.horaInicio && <span className="error" style={{color: "red"}}>{errores.horaInicio}</span>}
</div>
<div className="form-group">
  <label htmlFor="horaFin">Hora de fin:</label>
  <input type="time" id="horaFin" className="form-control" value={horaFin} onChange={handleHoraFinChange} />
  {errores.horaFin && <span className="error" style={{color: "red"}}>{errores.horaFin}</span>}
</div>
{/* <div className="form-group">
  <label htmlFor="curso">Curso:</label>
  <select id="curso" className="form-control" value={curso} onChange={handleCursoChange}>
    <option value="">Seleccione un curso</option>
    {cursoOptions.map(curso => (
      <option key={curso.id} value={curso.id}>{curso.nombre}</option>
    ))}
  </select>
  {errores.curso && <span className="error" style={{color: "red"}}>{errores.curso}</span>}
</div> */}
<div className="form-group">
  <label htmlFor="profesor">Profesor:</label>
  <select id="profesor" className="form-control" value={eventoProfesor} onChange={handleProfesorChange}>
    <option value="">Seleccione un profesor</option>
    {profesorOptions.map(profesor => (
      <option key={profesor.id} value={profesor.id}>{profesor.usuario.nombre}</option>
    ))}
  </select>
  
  {errores.profesor && <span className="error" style={{color: "red"}}>{errores.profesor}</span>}
</div>
<div className="form-group">
  <label htmlFor="aula">Aula:</label>
  <select id="aula" className="form-control" value={aula} onChange={handleAulaChange}>
    <option value="">Seleccione un aula</option>
    {aulaOptions.map(aula => (
      <option key={aula.id} value={aula.id}>{aula.nombre}</option>
    ))}
  </select>
  {errores.aula && <span className="error" style={{color: "red"}}>{errores.aula}</span>}
</div> 
        <button type="submit" className="btn btn-primary">Crear Evento</button>
      </form>
    </div>
</>
);
};

      {/* <h2>Nuevo Evento</h2>
      <form onSubmit={updateEvento}> */}

        {/* <div className="form-group">
          <label htmlFor="diaSemana">Día de la semana:</label>
          <select id="diaSemana" className="form-control" value={diaSemana} onChange={handleDiaSemanaChange}>
            <option value="">Seleccione un día de la semana</option>
            <option value="L">Lunes</option>
            <option value="M">Martes</option>
            <option value="X">Miércoles</option>
            <option value="J">Jueves</option>
            <option value="V">Viernes</option>
            <option value="S">Sábado</option>
            <option value="D">Domingo</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
        </div>
        <div className="form-group">
          <label htmlFor="horaInicio">Hora de inicio:</label>
          <input type="time" id="horaInicio" className="form-control" value={horaInicio} onChange={handleHoraInicioChange} />
        </div>
        <div className="form-group">
          <label htmlFor="horaFin">Hora de fin:</label>
          <input type="time" id="horaFin" className="form-control" value={horaFin} onChange={handleHoraFinChange} />
        </div>
        <div className="form-group">
          <label htmlFor="curso">Curso:</label>
          <select id="curso" className="form-control" value={curso} onChange={handleCursoChange}>
            <option value="">Seleccione un curso</option>
            {cursoOptions.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="profesor">Profesor:</label>
          <select id="profesor" className="form-control" value={eventoProfesor} onChange={handleProfesorChange}>
            <option value="">Seleccione un profesor</option>
            {profesorOptions.map(profesor => (
              <option key={profesor.id} value={profesor.id}>{profesor.usuario.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="aula">Aula:</label>
          <select id="aula" className="form-control" value={aula} onChange={handleAulaChange}>
            <option value="">Seleccione un aula</option>
            {aulaOptions.map(aula => (
              <option key={aula.id} value={aula.id}>{aula.nombre}</option>
            ))}
          </select>
        </div> */}
        {/* <button type="submit" className="btn btn-primary">Modificar Evento</button>
      </form> */}
      {/* {profesor.diaSemana} */}
    {/* <p>{diaSemana},{nombre},{descripcion},{horaInicio},{horaFin},{cursoOptions},{profesorOptions},{aulaOptions},{curso},{profesor},{aula}</p> */}
    