import React, { useState, useEffect, useContext } from 'react';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';
const URL_API = import.meta.env.VITE_API_URL

export const UpdateFormEvento = ({ id }) => {
    const { authTokens, logoutUser } = useContext(AuthContext);
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
    const [aula, setAula] = useState('');
    
    
    const [evento, setEvento] = useState("");

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
  useEffect(() => {
    
            
    fetch(`${URL_API}/api/cursos/`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
      .then(response => response.json())
      .then(data => setCursoOptions(data))
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
      .then(data => setProfesorOptions(data))
      .catch(error => console.error('Error al obtener las opciones de profesor:', error));
      
    // Obtener opciones de aulas
    fetch(`${URL_API}/api/aulas/`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
      .then(response => response.json())
      .then(data => setAulaOptions(data))
      .catch(error => console.error('Error al obtener las opciones de aula:', error));
  }, [authTokens.access]);

  const handleDiaSemanaChange = event => setDiaSemana(event.target.value);
  const handleNombreChange = event => setNombre(event.target.value);
  const handleDescripcionChange = event => setDescripcion(event.target.value);
  const handleHoraInicioChange = event => setHoraInicio(event.target.value);
  const handleHoraFinChange = event => setHoraFin(event.target.value);
  const handleCursoChange = event => setCurso(event.target.value);
  const handleProfesorChange = event => setProfesor(event.target.value);
  const handleAulaChange = event => setAula(event.target.value);


  const crearEvento = async (e) => {
    e.preventDefault();
    const data = {
      dia_semana: diaSemana,
      nombre: nombre,
      descripcion: descripcion,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      curso: curso,
      profesor: profesor,
      aula: aula
    };

    console.log(data)

    try {
      const response = await fetch(`${URL_API}/api/eventos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Evento creado:', responseData);
        // Realiza cualquier acción adicional que necesites con la respuesta de la API
      } else if (response.status === 401) {
        console.log('No autorizado');
        logoutUser();
      } else {
        console.log('Error al crear el evento:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUMBIT")
    const updateUser = async (userId) => {
      try {
        const response = await fetch(`${URL_API}/api/user/users/update/${userId}/`, {
          method: 'PUT',
          headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
              },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            nombre: username,
            primer_apellido: primerApellido,
            segundo_apellido: segundoApellido,
            groups:[2],
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Error al actualizar el usuario');
        }
    
        const updatedUser = await response.json();
        // Realiza las acciones necesarias con el usuario actualizado
        console.log('Usuario actualizado:', updatedUser);
      } catch (error) {
        console.error(error);
        // Realiza el manejo de errores adecuado
      }
      
    };
    const updateProfesor = async (userId) => {
      try {
        const response = await fetch(`${URL_API}/api/profesores/update/${userId}/`, {
          method: 'PUT',
          headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
              },
          body: JSON.stringify({
            descripcion: descripcion,
            telefono: telf,

          }),
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
      
    };
    updateUser(profesor.usuario.id, );
    updateProfesor(profesor.id);
    
  };


  


  useEffect(() => {
    const obtenerDetalleProfesor = async () => {
      try {
        const response = await fetch(`${URL_API}/api/profesor/${id}/`, {
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
      setUsername(profesor.usuario.username);
      setEmail(profesor.usuario.email);
      setPrimerApellido(profesor.usuario.primer_apellido);
      setSegundoApellido(profesor.usuario.segundo_apellido);
      setDescripcion(profesor.descripcion);
      setTelf(profesor.telefono);
    }
  }, [profesor]);

  return (
    <>
      <div className="form-container">
        <h2>Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label htmlFor="passw">Contraseña:</label>
            <input type="text" id="contraseña" className="form-control" value={password} onChange={handlePasswordChange} />
          </div>

          <div className="form-group">
            <label htmlFor="primerApellido">Primer Apellido:</label>
            <input type="text" id="primerApellido" className="form-control" value={primerApellido} onChange={handlePrimerApellidoChange} />
          </div>
          <div className="form-group">
            <label htmlFor="segundoApellido">Segundo Apellido:</label>
            <input type="text" id="segundoApellido" className="form-control" value={segundoApellido} onChange={handleSegundoApellidoChange} />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="tlf">Teléfono:</label>
            <input type="text" id="tlf" className="form-control" value={telf} onChange={handleTlfChange} />
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      </div>

    </>
  );
};

