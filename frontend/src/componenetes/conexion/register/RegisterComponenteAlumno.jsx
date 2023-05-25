import React, { useState,useContext,useEffect } from 'react';
import { axiosInstance } from '../axios';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';


export const RegisterFormAlumno = ({ mostrar }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [curso, setCurso] = useState('');
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]); // Nuevo estado para almacenar la lista de cursos

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
  const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);
  const handleCursoChange = (event) => setCurso(event.target.value);

  useEffect(() => {
    fetchEventos(); // Llamada al fetch para obtener la lista de cursos al cargar el componente
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/eventos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("cursos", data);
        setCursos(data);
      } else if (response.statusText === 'Unauthorized') {
        console.log("fallo");
        // logoutUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`user/register/`, {
        email: email,
        username: username,
        password: password,
        nombre: username,
        primer_apellido: primerApellido,
        segundo_apellido: segundoApellido,
        groups: [3],
      })
      .then((res) => {
        console.log("Usuario creado");
        console.log(res.data);
        console.log("curso", curso)
        // Luego de crear el usuario, llamar a la función para crear el alumno
        createAlumno(res.data.nombre, curso);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const createAlumno = (userId, cursoId) => {
    console.log("user", cursoId);
    axiosInstance
      .post(`crear/alumno/`, {
        usuario: userId,
        curso: cursoId,
      })
      .then((res) => {
        console.log("Alumno creado");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
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
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
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
            <label htmlFor="curso">Curso:</label>
            <select id="curso" className="form-control" value={curso} onChange={handleCursoChange}>
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  id:{curso.id} nombre:{curso.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
        <button className="btn btn-primary" onClick={mostrar}>Mostrar Lista</button>
      </div>
    </>
  );
}  


// import React, { useState,useContext } from 'react';
// import { axiosInstance } from '../axios';
// import './estilos/estiloFormCrearProfesor.css';
// import AuthContext from '../../Ultimo/AuthContext';

// export const RegisterFormAlumno = ({ mostrar }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [primerApellido, setPrimerApellido] = useState('');
//     const [segundoApellido, setSegundoApellido] = useState('');
//     const { authTokens, logoutUser } = useContext(AuthContext);

//   const handleUsernameChange = (event) => setUsername(event.target.value);
//   const handlePasswordChange = (event) => setPassword(event.target.value);
//   const handleEmailChange = (event) => setEmail(event.target.value);
//   const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
//   const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 1-Admin
//     // 2-Profesor
//     // 3-Alumno
//     axiosInstance
//       .post(`user/register/`, {
//         email: email,
//         username: username,
//         password: password,
//         nombre: username,
//         primer_apellido: primerApellido,
//         segundo_apellido: segundoApellido,
//         groups:[3],
//       })
//       .then((res) => {
//         console.log("Usuario creado");
//         console.log(res.data);

//         // Luego de crear el usuario, llamar a la función para crear el profesor
//         createProfesor(res.data.nombre);
//         console.log("HOLA", res.data.nombre);
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//       });
//   };

//   const createProfesor = (userId) => {
//     console.log("user", userId);
//     axiosInstance
//       .post(`crear/alumno/`, {
//         usuario: userId
//       })
//       .then((res) => {
//         console.log("Alumno creado");
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//       });
//   };

//   return (
//     <>
//     <div className="form-container">
//       <h2>Formulario de Registro</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Nombre de usuario:</label>
//           <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Contraseña:</label>
//           <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="primerApellido">Primer Apellido:</label>
//           <input type="text" id="primerApellido" className="form-control" value={primerApellido} onChange={handlePrimerApellidoChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="segundoApellido">Segundo Apellido:</label>
//           <input type="text" id="segundoApellido" className="form-control" value={segundoApellido} onChange={handleSegundoApellidoChange} />
//         </div>
//         <button type="submit" className="btn btn-primary">Registrar</button>
//       </form>
//       <button className="btn btn-primary" onClick={mostrar}>Mostrar Lista</button>
// </div>
// </>
// );
// };


