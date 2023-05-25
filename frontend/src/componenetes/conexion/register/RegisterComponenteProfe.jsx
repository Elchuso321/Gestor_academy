import React, { useState } from 'react';
import { axiosInstance } from '../axios';
import './estilos/estiloFormCrearProfesor.css';

export const RegisterFormProfe = ({ mostrar }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
  const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1-Admin
    // 2-Profesor
    // 3-Alumno
    axiosInstance
      .post(`user/register/`, {
        email: email,
        username: username,
        password: password,
        nombre: username,
        primer_apellido: primerApellido,
        segundo_apellido: segundoApellido,
        groups:[2],
      })
      .then((res) => {
        console.log("Usuario creado");
        console.log(res.data);

        // Luego de crear el usuario, llamar a la función para crear el profesor
        createProfesor(res.data.nombre);
        console.log("HOLA", res.data.nombre);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const createProfesor = (userId) => {
    console.log("user", userId);
    axiosInstance
      .post(`crear/profesor/`, {
        usuario: userId
      })
      .then((res) => {
        console.log("Profesor creado");
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
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      <button className="btn btn-primary" onClick={mostrar}>Mostrar Lista</button>
</div>
</>
);
};



// import React, { useState } from 'react';
// import { axiosInstance } from '../axios';
// import './estilos/estiloFormCrearProfesor.css';
// export const RegisterFormProfe = ({mostrar}) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [nombre, setNombre] = useState('');
//     const [primerApellido, setPrimerApellido] = useState('');
//     const [segundoApellido, setSegundoApellido] = useState('');

//     const handleUsernameChange = (event) => setUsername(event.target.value);
//     const handlePasswordChange = (event) => setPassword(event.target.value);
//     const handleEmailChange = (event) => setEmail(event.target.value);
//     const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
//     const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         axiosInstance
//             .post(`user/register/`, {
//                 email: email,
//                 username: username,
//                 password: password,
//                 nombre: username,
//                 primer_apellido: primerApellido,
//                 segundo_apellido: segundoApellido
//             })
//             .then((res) => {
//                 console.log("Usuario creado");
//                 console.log(res.data);

//                 // Luego de crear el usuario, llamar a la función para crear el profesor
//                 createProfesor(res.data.nombre);
//                 console.log("HOLA", res.data.nombre);
//             })
//             .catch((err) => {
//                 console.log(err.response.data);
//             });
//     };

//     const createProfesor = (userId) => {
//         console.log("user", userId);
//         axiosInstance
//             .post(`crear/profesor/`, {
//                 usuario: userId
//             })
//             .then((res) => {
//                 console.log("Profesor creado");
//                 console.log(res.data);
//             })
//             .catch((err) => {
//                 console.log(err.response.data);
//             });
//     };

//     return (
//         <>

// <div className="form-container">
//       <h2>Formulario de Registro</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Nombre de usuario:
//           <input type="text" value={username} onChange={handleUsernameChange} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} />
//         </label>
//         <br />
//         <label>
//           Contraseña:
//           <input type="password" value={password} onChange={handlePasswordChange} />
//         </label>
//         <br />
//         <label>
//           Primer Apellido:
//           <input type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
//         </label>
//         <br />
//         <label>
//           Segundo Apellido:
//           <input type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
//         </label>
//         <br />
//         <button type="submit">Registrar</button>
//       </form>
//       <button className="primaey" onClick={mostrar}>Mostrar Lista</button>
//     </div>
//     </>
//   );
// };
            {/* <div className="form-container">
    <h2>Formulario de Registro</h2>
    <form onSubmit={handleSubmit}>
        <label>
            Nombre de usuario:
            <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
            Contraseña:
            <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
            Primer Apellido:
            <input type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
        </label>
        <br />
        <label>
            Segundo Apellido:
            <input type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
        </label>

        <button type="submit">Registrar</button>
    </form>
</div> */}

{/* </>
);
}; */}

// import React, { useState } from 'react';
// import { axiosInstance } from '../axios';

// export const RegisterFormProfe = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [nombre, setNombre] = useState('');
//     const [primerApellido, setPrimerApellido] = useState('');
//     const [segundoApellido, setSegundoApellido] = useState('');

//     const handleUsernameChange = (event) => setUsername(event.target.value);
//     const handlePasswordChange = (event) => setPassword(event.target.value);
//     const handleEmailChange = (event) => setEmail(event.target.value);
//     const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
//     const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         axiosInstance
//             .post(`user/register/`, {
//                 email: email,
//                 username: username,
//                 password: password,
//                 nombre: username,
//                 primer_apellido: primerApellido,
//                 segundo_apellido: segundoApellido
//             })
//             .then((res) => {
//                 console.log("Usuario creado");
//                 console.log(res.data);

//                 // Luego de crear el usuario, llamar a la función para crear el profesor
//                 createProfesor(res.data.nombre);
//                 console.log("HOLA",res.data.nombre)
//             })
//             .catch((err) => {
//                 console.log(err.response.data);
//             });
//     };

//     const createProfesor = (userId) => {
//         console.log("user",userId)
//         axiosInstance
//             .post(`crear/profesor/`, {
//                 usuario: userId
//             })
//             .then((res) => {
//                 console.log("Profesor creado");
//                 console.log(res.data);
//             })
//             .catch((err) => {
//                 console.log(err.response.data);
//             });
//     };

//     return (
//         <>
            
//             <h2>Formulario Register</h2>
//             <form onSubmit={handleSubmit}>
//             <label>
//                 Nombre de usuario:
//                 <input type="text" value={username} onChange={handleUsernameChange} />
//             </label>
//             <br />
//             <label>
//                 Email:
//                 <input type="email" value={email} onChange={handleEmailChange} />
//             </label>
//             <br />
//             <label>
//                 Contraseña:
//                 <input type="password" value={password} onChange={handlePasswordChange} />
//             </label>    
//             <br />
//             <label>
//                 Primer Apellido
//                 <input type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
//             </label>
//             <br />
//             <label>
//                 Segundo Apellido
//                 <input type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
//             </label>

//             <button type="submit">Registrar</button>
//         </form>
//         </>
//     );
// };



// // import React, { useState } from 'react';
// // import { axiosInstance } from '../axios';
// // // import { login1 } from './loginFunction';

// // export const RegisterForm = () => {
    
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [email,setEmail]= useState('')
// //     const [nombre,setNombre]= useState('')
// //     const [primerApellido,setPrimerApellido]= useState('')
// //     const [segundoApellido,setSegundoApellido]= useState('')




// //     const handleUsernameChange = event => setUsername(event.target.value);
// //     const handlePasswordChange = event => setPassword(event.target.value);
// //     const handleEmailChange = event => setEmail(event.target.value);
// //     const handlePrimerApellidoChange = event => setPrimerApellido(event.target.value);
// //     const handleSegundoApellidoChange = event => setSegundoApellido(event.target.value);

// //     const handleSubmit = (e) => {
// // 		e.preventDefault();
		

// // 		axiosInstance
// // 			.post(`user/register/`, {
// // 				email: email,
// // 				username: username,
// // 				password: password,
// //                 nombre:username,
// //                 primer_apellido:primerApellido,
// //                 segundo_apellido:segundoApellido,
                
// //                 // groups:[3,],
// // 			})
// //             // groups :1 es profesor,2 es alumno y 3 es admin
// //             // CUIDADO
// // 			.then((res) => {
// //                 console.log("Funciona")
// // 				// history.push('/login');
// // 				console.log(res);
// // 				console.log(res.data);
// //             }).catch((err) => {
// //                 console.log(err.response.data);
// //             });
// // 	};

// //     return (
// //         <>
// //         <h2>Formulario Register</h2>
// //         <form onSubmit={handleSubmit}>
// //             <label>
// //                 Nombre de usuario:
// //                 <input type="text" value={username} onChange={handleUsernameChange} />
// //             </label>
// //             <label>
// //                 Email:
// //                 <input type="email" value={email} onChange={handleEmailChange} />
// //             </label>
// //             <label>
// //                 Contraseña:
// //                 <input type="password" value={password} onChange={handlePasswordChange} />
// //             </label>    
// //             <label>
// //                 Primer Apellido
// //                 <input type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
// //             </label>
// //             <label>
// //                 Segundo Apellido
// //                 <input type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
// //             </label>

// //             <button type="submit">Registrar</button>
// //         </form>
// //         </>
// //     );
// // };