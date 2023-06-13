import React, { useState,useContext,useEffect } from 'react';
import { axiosInstance } from '../axios';
import AuthContext from '../../Ultimo/AuthContext';
import { Form, Button } from 'react-bootstrap';


const URL_API = import.meta.env.VITE_API_URL

export const RegisterFormAlumno = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [usernameValido, setUsernameValido] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');

  
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
          setCursosAll(data);
          // setSelectorCursos2(data);
          // setSelectorCursos3(data);

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

const handleUsernameChange = (event) => setUsername(event.target.value);
const handlePasswordChange = (event) => setPassword(event.target.value);
const handleEmailChange = (event) => setEmail(event.target.value);
const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);
const academia=localStorage.getItem('academia') || 1

useEffect(() => {
  const usernameValido2 = username + primerApellido;
  setUsernameValido(usernameValido2)

}, [username, primerApellido, segundoApellido]);
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("usernameValido",usernameValido)
  axiosInstance
    .post(`user/register/`, {
      email: email,
      username: usernameValido,
      password: password,
      nombre: username,
      primer_apellido: primerApellido,
      segundo_apellido: segundoApellido,
      groups: [3],
      academia: academia,
    })
    .then((res) => {
      console.log("Usuario creado");
      console.log(res.data);
      const alumnoCreado = res.data.username;
      
      // Luego de crear el usuario, llamar a la función para crear el alumno
      createAlumno(alumnoCreado, selectedEventos);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const createAlumno = (userId, eventoIds) => {
  console.log("user", userId);
  console.log("eventos", eventoIds);
  let eve1=[1]
  axiosInstance
    .post(`crear/alumno/`, {
      usuario: userId,
      curso: eventoIds,
    })
    .then((res) => {
      console.log("Alumno creado");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};


const handleCursoChange1=(event)=>{
    console.log("event",event.target.value)
    setCurso1(event.target.value);
    console.log("2",curso1)
    console.log("eventosAll",eventosAll)
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso.id==event.target.value);
    console.log("eventosFiltrados",eventosFiltrados)
    setEventosCurso1(eventosFiltrados);
    console.log("eventosCurso1",eventosCurso1)
    let cursos2=cursosAll
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
  console.log("eventosCurso1",eventosCurso1)
}


const handleSeleccion2 = (event) => {
  const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
  console.log("opcionesSeleccionadas",opcionesSeleccionadas)
    setSeleccionados2(opcionesSeleccionadas);
    console.log("seleccionados",seleccionados1)
    setMostrarTercerSelector(true)
  };


  const handleCursoChange3=(event)=>{
    console.log("event",event.target.value)
    setCurso3(event.target.value);
    console.log("curso1",curso1)
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso.id==event.target.value);
    console.log("eventosFiltrados",eventosFiltrados)
    setEventosCurso3(eventosFiltrados);
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
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="username">
          <Form.Label>Nombre de usuario:</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} />
        </Form.Group>

        <Form.Group controlId="primerApellido">
          <Form.Label>Primer Apellido:</Form.Label>
          <Form.Control type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
        </Form.Group>

        <Form.Group controlId="segundoApellido">
          <Form.Label>Segundo Apellido:</Form.Label>
          <Form.Control type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
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
                      id: {curso.id} nombre: {curso.nombre}
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
                        id: {curso.id} nombre: {curso.nombre}
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
                        id: {curso.id} nombre: {curso.nombre}
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
        </div>

        <Button type="submit" variant="primary">Registrar</Button>
      </Form>
      {/* <br /><br /><br /><br /> */}
      {/* {selectedEventos} */}
    </div>
    </>
      )
    }  
