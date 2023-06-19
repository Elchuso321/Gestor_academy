import React, { useState, useEffect, useContext } from 'react';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';

const URL_API = import.meta.env.VITE_API_URL


export const UpdateFormProfe = ({ id }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [profesor, setProfesor] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [telf, setTelf] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
  const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);
  const handleDescripcionChange = (event) => setDescripcion(event.target.value);
  const handleTlfChange = (event) => setTelf(event.target.value);
  function validarFormatoContraseña(contraseña) {
    var expresionRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return expresionRegular.test(contraseña);
  }
  function validarFormatoCorreo(texto) {
    var expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(texto);
  }
  const validarNumero = (numero) => {
    var expresionRegular = /^[0-9]+$/;
    return expresionRegular.test(numero);
  }
  function validarFormulario() {
    const errores = {};

    if (username.trim() === '') {
      errores.username = 'El nombre de usuario es requerido.';
    }

    if (!validarFormatoCorreo(email)) {
      errores.email = 'El email no tiene un formato válido.';
    }
    if (email.trim() === '') {
      errores.email = 'El email es requerido.';
    }

    if (!validarFormatoContraseña(password)) {
      errores.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
    }

    if (password.trim() === '') {
      errores.password = 'La contraseña es requerida.';
    }

    if (primerApellido.trim() === '') {
      errores.primerApellido = 'El primer apellido es requerido.';
    }

    if (segundoApellido.trim() === '') {
      errores.segundoApellido = 'El segundo apellido es requerido.';
    }
    if (telf.length !== 9) {
      errores.telf = 'El teléfono debe tener 9 dígitos.';
    }
    if (!validarNumero(telf)) {
      errores.telf = 'El teléfono no tiene un formato válido.';
    }

    if (telf.trim() === '') {
      errores.telf = 'El teléfono es requerido.';
    }
    if (descripcion.trim() === '') {
      errores.descripcion = 'La descripción es requerida.';
    }
    console.log("ERRORES", errores)
    setErrores(errores);

    return Object.keys(errores).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUMBIT")
    const updateUser = async (userId) => {
      
      const user= username + primerApellido + segundoApellido
      console.log("username1213",username)
      try {
        const response = await fetch(`${URL_API}/api/user/users/update/${userId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify({
            email: email,
            username: user,
            password: password,
            nombre: username,
            primer_apellido: primerApellido,
            segundo_apellido: segundoApellido,
            groups: [2],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          errores.telefono = 'Error al actualizar el usuario';
          setErrores(errores);
          throw new Error(errorData.detail || 'Error al actualizar el usuario');
        }

        const updatedUser = await response.json();
        // Realiza las acciones necesarias con el usuario actualizado
        console.log('Usuario actualizado:', updatedUser);
        updateProfesor(profesor.id);
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
          errores.telefono = 'Error al actualizar el profesor';
          setErrores(errores);
          throw new Error(errorData.detail || 'Error al actualizar el usuario');
        }

        const updatedUser = await response.json();
        // Realiza las acciones necesarias con el usuario actualizado
        console.log('Profesor actualizado:', updatedUser);
        window.location.reload();
      } catch (error) {
        console.error(error);
        // Realiza el manejo de errores adecuado
      }

    };
    if (validarFormulario()) {
    updateUser(profesor.usuario.id,);
    }else{

      console.log("ERROR")
    }
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
      setUsername(profesor.usuario.nombre);
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
            {errores.username && <span className="error">{errores.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
            {errores.email && <span className="error">{errores.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
            {errores.password && <span className="error">{errores.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="primerApellido">Primer Apellido:</label>
            <input type="text" id="primerApellido" className="form-control" value={primerApellido} onChange={handlePrimerApellidoChange} />
            {errores.primerApellido && <span className="error">{errores.primerApellido}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="segundoApellido">Segundo Apellido:</label>
            <input type="text" id="segundoApellido" className="form-control" value={segundoApellido} onChange={handleSegundoApellidoChange} />
            {errores.segundoApellido && <span className="error">{errores.segundoApellido}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} />
          {errores.descripcion && <span className="error">{errores.descripcion}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="tlf">Teléfono:</label>
            <input type="text" id="tlf" className="form-control" value={telf} onChange={handleTlfChange} />
            {errores.telf && <span className="error">{errores.telf}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      </div>

    </>
  );
};


