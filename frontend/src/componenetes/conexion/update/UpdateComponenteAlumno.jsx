import React, { useState,useContext,useEffect } from 'react';
import { axiosInstance } from '../axios';
import AuthContext from '../../Ultimo/AuthContext';
import { Form, Button } from 'react-bootstrap';

const URL_API = import.meta.env.VITE_API_URL
const enlace=URL_API;

export const UpdateFormAlumnos = ({ id }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
const [descripcion, setDescripcion] = useState('');
const [nombreMadre, setNombreMadre] = useState('');
const [nombrePadre, setNombrePadre] = useState('');
const [telefonoMadre, setTelefonoMadre] = useState('');
const [telefonoPadre, setTelefonoPadre] = useState('');
const [fechaNacimiento, setFechaNacimiento] = useState('');
  
  const [cursosAll, setCursosAll] = useState([]);
  const [eventosAll, setEventosAll] = useState([]);

  const [curso1, setCurso1] = useState([]);
  const [eventosCurso1, setEventosCurso1] = useState([]);
  const [seleccionados1, setSeleccionados1] = useState([]);
  
  const [selctorCursos, setSelectorCursos] = useState([]);

  const [mostrarSegundoSelector, setMostrarSegundoSelector] = useState(false);
  const [curso2, setCurso2] = useState([]);
  const [eventosCurso2, setEventosCurso2] = useState([]);
  const [seleccionados2, setSeleccionados2] = useState([]);

  const [mostrarTercerSelector, setMostrarTercerSelector] = useState(false);
  const [curso3, setCurso3] = useState([]);
  const [eventosCurso3, setEventosCurso3] = useState([]);
  const [seleccionados3, setSeleccionados3] = useState([]);

  const [selectedEventos, setSelectedEventos] = useState([]);
  const [llamadaNueva, setLlamadaNueva] = useState(false);
const fetchCursos = async () => {
        try {
            const response = await fetch(`${URL_API}/api/cursos/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
      });
      
      if (response.status === 200) {
          const data = await response.json();
          console.log("cursos", data);
          const academ=JSON.parse(localStorage.getItem('academia'));
          const filtrados = data.filter((item) => item.academia === academ);
          setCursosAll(filtrados);
          // setCursosAll(data);

      } else if (response.statusText === 'Unauthorized') {
        console.log("fallo");
        // logoutUser();
    }
    } catch (error) {
      console.log(error);
    }
};

const fetchEventos = async () => {
    try {
        const response = await fetch(`${URL_API}/api/eventos/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
        },
    });
    
    if (response.status === 200) {
        const data = await response.json();
        console.log("eventos", data);
        setEventosAll(data);
    } else if (response.statusText === 'Unauthorized') {
        console.log("fallo");
        // logoutUser();
    }
} catch (error) {
    console.log(error);
}
};
useEffect(() => {
    const mergedArray = [...new Set([...seleccionados1, ...seleccionados2, ...seleccionados3])];
    console.log("seleccionados1",seleccionados1)
    console.log("seleccionados2",seleccionados2)
    console.log("seleccionados3",seleccionados3)
    console.log("totalSeleccion",mergedArray)
    setSelectedEventos(mergedArray);
}, [seleccionados1]);
useEffect(() => {
    const mergedArray = [...new Set([...seleccionados1, ...seleccionados2, ...seleccionados3])];
    console.log("seleccionados1",seleccionados1)
    console.log("seleccionados2",seleccionados2)
    console.log("seleccionados3",seleccionados3)
    console.log("totalSeleccion",mergedArray)
    setSelectedEventos(mergedArray);
}, [seleccionados2]);
useEffect(() => {
    const mergedArray = [...new Set([...seleccionados1, ...seleccionados2, ...seleccionados3])];
    console.log("seleccionados1",seleccionados1)
    console.log("seleccionados2",seleccionados2)
    console.log("seleccionados3",seleccionados3)
    console.log("totalSeleccion",mergedArray)
    setSelectedEventos(mergedArray);
},[seleccionados3]);

useEffect(() => {
    fetchCursos();
    fetchEventos();
}, []);
const [reset, setReset] = useState(false);
const[alumno, setAlumno] = useState(null);
const handleUsernameChange = (event) => setUsername(event.target.value);
const handlePasswordChange = (event) => setPassword(event.target.value);
const handleEmailChange = (event) => setEmail(event.target.value);
const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);
const handleDescripcionChange = (event) => setDescripcion(event.target.value);
const handleNombreMadreChange = (event) => setNombreMadre(event.target.value);
const handleNombrePadreChange = (event) => setNombrePadre(event.target.value);
const handleTelefonoMadreChange = (event) => setTelefonoMadre(event.target.value);
const handleTelefonoPadreChange = (event) => setTelefonoPadre(event.target.value);
const handleFechaNacimientoChange = (event) => setFechaNacimiento(event.target.value);
const [datosAgrupados1, setDatosAgrupados1] = useState([]);
const [errores, setErrores] = useState({});
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

  if (email.trim() === '') {
    errores.email = 'El email es requerido.';
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

  if (descripcion.trim() === '') {
    errores.descripcion = 'La descripción es requerida.';
  }

  if (nombrePadre.trim() === '') {
    errores.nombrePadre = 'El nombre del padre es requerido.';
  }

  if (nombreMadre.trim() === '') {
    errores.nombreMadre = 'El nombre de la madre es requerido.';
  }
  if (!validarFormatoCorreo(email)) {
    errores.email = 'El correo no tiene un formato válido.';
  }
  if (!validarFormatoContraseña(password)) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
  }
  if (!validarNumero(telefonoMadre)) {
    errores.telefonoMadre = 'El teléfono de la madre debe ser un número.';
  }
  if (!validarNumero(telefonoPadre)) {
    errores.telefonoPadre = 'El teléfono del padre debe ser un número.';
  }
  if(telefonoMadre.length !== 9){
    errores.telefonoMadre = 'El teléfono de la madre debe tener 9 dígitos.';
  }
  if(telefonoPadre.length !== 9){
    errores.telefonoPadre = 'El teléfono del padre debe tener 9 dígitos.';
  }
  

  if (telefonoMadre.trim() === '') {
    errores.telefonoMadre = 'El teléfono de la madre es requerido.';
  }

  if (telefonoPadre.trim() === '') {
    errores.telefonoPadre = 'El teléfono del padre es requerido.';
  }

  if (fechaNacimiento.trim() === '') {
    errores.fechaNacimiento = 'La fecha de nacimiento es requerida.';
  }

  setErrores(errores);

  return Object.keys(errores).length === 0;
}
useEffect(() => {
    const obtenerDetalleAlumno = async () => {
        console.log("id:",id)
        try {
            const response = await fetch(enlace+`/api/alumno/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("response:",response)
          console.log("DATAAA:",data)
          setAlumno(data);
          console.log("profe:", alumno)
        } else {
          console.error('Error al obtener el detalle del profesor');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
      
    }
    obtenerDetalleAlumno();
    console.log("SE METE AL EFFECT DE ID")
  }, [id]);
  useEffect(() => {
    console.log("CASI ME METI")
    if (alumno) {
      console.log("ME METI")
      setUsername(alumno.usuario.nombre);
      setEmail(alumno.usuario.email);
      setPrimerApellido(alumno.usuario.primer_apellido);
      setSegundoApellido(alumno.usuario.segundo_apellido);
      setDescripcion(alumno.descripcion);
      setNombreMadre(alumno.nombre_madre);
      setNombrePadre(alumno.nombre_padre);
      setTelefonoMadre(alumno.telefono_madre);
      setTelefonoPadre(alumno.telefono_padre);
      setFechaNacimiento(alumno.fecha_nacimiento);
  
      console.log("eventosALUMNO", alumno.curso)
      const datos = alumno.curso;
      const datosAgrupados = datos.reduce((acumulador, objeto) => {
        const curso = objeto.curso;
        if (!acumulador[curso]) {
          acumulador[curso] = [];
        }
        acumulador[curso].push(objeto);
        return acumulador;
      }, {});
      console.log("datosAgrupados", datosAgrupados)
      setDatosAgrupados1(datosAgrupados);
      const longitud = Object.keys(datosAgrupados).length;
      const datosAgrupadosBien = Object.keys(datosAgrupados)
      console.log("long", longitud);
      if (longitud >= 1) {
        console.log("CURSO1", Object.values(datosAgrupados)[0][0].curso)
        setCurso1(Object.values(datosAgrupados)[0][0].curso);
  
        let eventosFiltrados = eventosAll.filter(evento => evento.curso.id === Object.values(datosAgrupados)[0][0].curso);
        console.log("eventosFiltradosEVENT", eventosFiltrados)
        if (eventosFiltrados.length > 0) {
          setEventosCurso1(eventosFiltrados);
          console.log("eventosCurso1", eventosCurso1)
          setSeleccionados1(Object.values(datosAgrupados)[0].map(evento => evento.id));
          setMostrarSegundoSelector(true);
        }
      }
      if (longitud >= 2) {
        console.log("CURSO1", Object.values(datosAgrupados)[1][0].curso)
        setCurso2(Object.values(datosAgrupados)[1][0].curso);
  
        let eventosFiltrados = eventosAll.filter(evento => evento.curso.id === Object.values(datosAgrupados)[1][0].curso);
        console.log("eventosFiltradosEVENT", eventosFiltrados)
        if (eventosFiltrados.length > 0) {
          setEventosCurso2(eventosFiltrados);
          console.log("eventosCurso2", eventosCurso1)
          setSeleccionados2(Object.values(datosAgrupados)[1].map(evento => evento.id));
          setMostrarTercerSelector(true);
        }
      }
      if (longitud >= 3) {
        console.log("CURSO3", Object.values(datosAgrupados)[2][0].curso)
        setCurso3(Object.values(datosAgrupados)[2][0].curso);
  
        let eventosFiltrados = eventosAll.filter(evento => evento.curso.id === Object.values(datosAgrupados)[2][0].curso);
        console.log("eventosFiltradosEVENT", eventosFiltrados)
        if (eventosFiltrados.length > 0) {
          setEventosCurso3(eventosFiltrados);
          console.log("eventosCurso2", eventosCurso1)
          setSeleccionados3(Object.values(datosAgrupados)[2].map(evento => evento.id));
        }
      }
  
    }
  }, [alumno,reset]);

  useEffect(() => {
    const llamar = () => {
      setReset(!reset)
    };
  
  // Establecer el tiempo de espera de 2 segundos (2000 milisegundos)
  var tiempoEspera = 1000;
  
  // Configurar el evento para que se active después de 2 segundos
  setTimeout(llamar, tiempoEspera);
  }, []);
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
            groups:[3],
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          errores.propio="Error al actualizar el usuario"
          setErrores(errores);
          throw new Error(errorData.detail || 'Error al actualizar el usuario');
        }
    
        const updatedUser = await response.json();
        // Realiza las acciones necesarias con el usuario actualizado
        console.log('Usuario actualizado:', updatedUser);
        updateProfesor(alumno.id);
       
      } catch (error) {
        console.error(error);
        // Realiza el manejo de errores adecuado
      }
      
    };
    const updateProfesor = async (userId) => {
      
      try {
        const response = await fetch(`${URL_API}/api/alumnos/update/${userId}/`, {
          method: 'PUT',
          headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
              },
          body: JSON.stringify({
            descripcion: descripcion,
            telefono_madre: telefonoMadre,
            telefono_padre: telefonoPadre,
            nombre_madre: nombreMadre,
            nombre_padre: nombrePadre,
            curso: selectedEventos,
            fecha_nacimiento: fechaNacimiento,

          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          errores.propio="Error al actualizar el usuario"
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
    const validarFormulario1 = validarFormulario()
    if (validarFormulario1) {
    updateUser(alumno.usuario.id, );
      
    }else{
      console.log("FORMULARIO INVALIDO")
    }
    
};



const handleCursoChange1=(event)=>{
    console.log("event",event.target.value)
    setCurso1(event.target.value);
    console.log("curso1",curso1)
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso.id==event.target.value);
    console.log("eventosFiltrados",eventosFiltrados)
    setEventosCurso1(eventosFiltrados);
    console.log("eventosCurso1",eventosCurso1)
    let cursos2=cursosAll
    setSeleccionados1([]);
    //Eliminar el curso1 de cursos2
    cursos2=cursos2.filter(curso=>curso.id!=event.target.value)
    
  }


const handleSeleccion1 = (event) => {
  const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
  console.log("opcionesSeleccionadas",opcionesSeleccionadas)
    setSeleccionados1(opcionesSeleccionadas);
    console.log("seleccionados",seleccionados1)
    setMostrarSegundoSelector(true)
};


const handleCursoChange2=(event)=>{
  console.log("event",event.target.value)
  setCurso2(event.target.value);
  console.log("curso1",curso1)
  let eventosFiltrados=eventosAll.filter(evento=>evento.curso.id==event.target.value);
  console.log("eventosFiltrados",eventosFiltrados)
  setEventosCurso2(eventosFiltrados);
  setSeleccionados2([]);
  console.log("eventosCurso1",eventosCurso1)
}


const handleSeleccion2 = (event) => {
  const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
  console.log("opcionesSeleccionadas",opcionesSeleccionadas)
    setSeleccionados2(opcionesSeleccionadas);
    console.log("seleccionados",seleccionados1)
    setMostrarTercerSelector(true)
  };
  const changeAlumno= ()=>{
    const alumno=al
  }

  const handleCursoChange3=(event)=>{
    console.log("event",event.target.value)
    setCurso3(event.target.value);
    console.log("curso1",curso1)
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso.id==event.target.value);
    console.log("eventosFiltrados",eventosFiltrados)
    setEventosCurso3(eventosFiltrados);
    setSeleccionados3([]);
    console.log("eventosCurso1",eventosCurso1)
  }
  
  
  const handleSeleccion3 = (event) => {
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
    console.log("opcionesSeleccionadas",opcionesSeleccionadas)
      setSeleccionados3(opcionesSeleccionadas);
      console.log("seleccionados",seleccionados1)
      // setMostrarTercerSelector(true)
    };
   
    return(
      <>
      <div>
      <h2>Formulario de Registro</h2>
      {/* {alumno.username.email} */}
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="username">
          <Form.Label>Nombre de usuario:</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} />
          {errores.username && <Form.Text className="error">{errores.username}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} />
          {errores.email && <Form.Text className="error">{errores.email}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} />
          {errores.password && <Form.Text className="error">{errores.password}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="primerApellido">
          <Form.Label>Primer Apellido:</Form.Label>
          <Form.Control type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
          {errores.primerApellido && <Form.Text className="error">{errores.primerApellido}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="segundoApellido">
          <Form.Label>Segundo Apellido:</Form.Label>
          <Form.Control type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
          {errores.segundoApellido && <Form.Text className="error">{errores.segundoApellido}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="Descripcion">
          <Form.Label>Descripcion:</Form.Label>
          <Form.Control type="text" value={descripcion} onChange={handleDescripcionChange} />
          {errores.descripcion && <Form.Text className="error">{errores.descripcion}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="Nombre Padre">
          <Form.Label>Nombre Padre:</Form.Label>
          <Form.Control type="text" value={nombrePadre} onChange={handleNombrePadreChange} />
          {errores.nombrePadre && <Form.Text className="error">{errores.nombrePadre}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="Nombre Madre">
          <Form.Label>Nombre Madre:</Form.Label>
          <Form.Control type="text" value={nombreMadre} onChange={handleNombreMadreChange} />
          {errores.nombreMadre && <Form.Text className="error">{errores.nombreMadre}</Form.Text>}
        </Form.Group>
        
        <Form.Group controlId="Telefono Madre">
          <Form.Label>Telefono Madre:</Form.Label>
          <Form.Control type="text" value={telefonoMadre} onChange={handleTelefonoMadreChange} />
          {errores.telefonoMadre && <Form.Text className="error">{errores.telefonoMadre} </Form.Text>}
        </Form.Group>

        <Form.Group controlId="Telefono Padre">
          <Form.Label>Telefono Padre:</Form.Label>
          <Form.Control type="text" value={telefonoPadre} onChange={handleTelefonoPadreChange} />
          {errores.telefonoPadre && <Form.Text className="error">{errores.telefonoPadre} </Form.Text>}
        </Form.Group>

        <Form.Group controlId="Fecha Nacimiento">
          <Form.Label>Fecha Nacimiento:</Form.Label>
          <Form.Control type="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} />
          {errores.fechaNacimiento && <Form.Text className="error">{errores.fechaNacimiento} </Form.Text>}
        </Form.Group>
        
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="curso">
                <Form.Label>Curso:</Form.Label>
                <Form.Control as="select" value={curso1} onChange={handleCursoChange1}>
                  <option value={null}>Selecciona un curso</option>
                  {cursosAll.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-6">
              
              <Form.Control as="select" multiple value={seleccionados1} onChange={handleSeleccion1}>
                {eventosCurso1.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    {evento.nombre}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>
          <br />
          {mostrarSegundoSelector && (
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="curso">
                  <Form.Label>Curso:</Form.Label>
                  <Form.Control as="select" value={curso2} onChange={handleCursoChange2}>
                    <option value={null}>Selecciona un curso</option>
                    {cursosAll.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
                
                <Form.Control as="select" multiple value={seleccionados2} onChange={handleSeleccion2}>
                  {eventosCurso2.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.nombre}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </div>
          )}
          <br />
          {mostrarTercerSelector && (
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="curso">
                  <Form.Label>Curso:</Form.Label>
                  <Form.Control as="select" value={curso3} onChange={handleCursoChange3}>
                    <option value={null}>Selecciona un curso</option>
                    {cursosAll.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
               
                <Form.Control as="select" multiple value={seleccionados3} onChange={handleSeleccion3}>
                  {eventosCurso3.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.nombre}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </div>
          )}
          {errores.propios && <Form.Text className="error">{errores.propios}</Form.Text>}
        </div>

        <div style={{display:"flex"}}>
        <Button type="submit" className='m-2' variant="primary">Modificar</Button>

        
        <Button onClick={()=>{setReset(!reset)}} variant="secondary" className='m-2' >Reset</Button>

        </div>
      </Form>
      {/* <br /><br /><br /><br /> */}
      {/* {selectedEventos} */}
    </div>
    </>
      )
    }  

