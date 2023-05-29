import React, { useState,useContext,useEffect } from 'react';
import { axiosInstance } from '../axios';
import AuthContext from '../../Ultimo/AuthContext';
import { Form, Button } from 'react-bootstrap';


const URL_API = import.meta.env.VITE_API_URL

export const RegisterFormAlumno = ({ mostrar }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);

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
          setSelectorCursos2(data);
          setSelectorCursos3(data);

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
        const response = await fetch('http://127.0.0.1:8000/api/eventos/', {
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
    fetchCursos();
    fetchEventos();
}, []);

const handleUsernameChange = (event) => setUsername(event.target.value);
const handlePasswordChange = (event) => setPassword(event.target.value);
const handleEmailChange = (event) => setEmail(event.target.value);
const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);
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
      console.log("curso", curso);

      const alumnoCreado = res.data.nombre;

      // Luego de crear el usuario, llamar a la función para crear el alumno
      createAlumno(alumnoCreado, selectedEventos);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

const createAlumno = (userId, eventoIds) => {
  console.log("user", userId);
  console.log("eventos", eventoIds);

  axiosInstance
    .post(`crear/alumno/`, {
      usuario: userId,
      eventos: eventoIds,
    })
    .then((res) => {
      console.log("Alumno creado");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};


// useEffect(() => {
// let 
// }, [curso1], [curso2], [curso3]);


const handleCursoChange1=(event)=>{
    console.log("event",event.target.value)
    setCurso1(event.target.value);
    console.log("curso1",curso1)
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso==event.target.value);
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
  let eventosFiltrados=eventosAll.filter(evento=>evento.curso==event.target.value);
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
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso==event.target.value);
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
              <h2>Selector Múltiple</h2>
              <Form.Control as="select" multiple value={seleccionados1} onChange={handleSeleccion1}>
                {eventosCurso1.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    {evento.nombre}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>

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
                <h2>Selector Múltiple</h2>
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
                <h2>Selector Múltiple</h2>
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
    </div>

{/*       
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
              <h2>Selector Múltiple</h2>
              <select multiple className="form-control" onChange={handleSeleccion1}>
                {eventosCurso1.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    {evento.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
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
                <h2>Selector Múltiple</h2>
                <select multiple className="form-control" onChange={handleSeleccion2}>
                  {eventosCurso2.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
  
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
                <h2>Selector Múltiple</h2>
                <select multiple className="form-control" onChange={handleSeleccion3}>
                  {eventosCurso3.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
  
        <Button type="submit" variant="primary">Registrar</Button>
      </Form>
   */}
  </>
  )
}  
      // <div className="form-container">
      //   <h2>Formulario de Registro</h2>
      //   <Form onSubmit={handleSubmit}>
      //     <Form.Group controlId="username">
      //       <Form.Label>Nombre de usuario:</Form.Label>
      //       <Form.Control type="text" value={username} onChange={handleUsernameChange} />
      //     </Form.Group>
  
      //     <Form.Group controlId="email">
      //       <Form.Label>Email:</Form.Label>
      //       <Form.Control type="email" value={email} onChange={handleEmailChange} />
      //     </Form.Group>
  
      //     <Form.Group controlId="password">
      //       <Form.Label>Contraseña:</Form.Label>
      //       <Form.Control type="password" value={password} onChange={handlePasswordChange} />
      //     </Form.Group>
  
      //     <Form.Group controlId="primerApellido">
      //       <Form.Label>Primer Apellido:</Form.Label>
      //       <Form.Control type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
      //     </Form.Group>
  
      //     <Form.Group controlId="segundoApellido">
      //       <Form.Label>Segundo Apellido:</Form.Label>
      //       <Form.Control type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
      //     </Form.Group>
      //     <div className="container">
      //     <div className="row">
      //       <div className="col-md-6">
      //         <Form.Group controlId="curso">
      //           <Form.Label>Curso:</Form.Label>
      //           <Form.Control as="select" value={curso1} onChange={handleCursoChange1}>
      //             <option value={null}>Selecciona un curso</option>
      //             {cursosAll.map((curso) => (
      //               <option key={curso.id} value={curso.id}>
      //                 id: {curso.id} nombre: {curso.nombre}
      //               </option>
      //             ))}
      //           </Form.Control>
      //         </Form.Group>
      //       </div>
      //       <div className="col-md-6">
      //         <h2>Selector Múltiple</h2>
      //         <select multiple className="form-control" onChange={handleSeleccion1}>
      //           {eventosCurso1.map((evento) => (
      //             <option key={evento.id} value={evento.id}>
      //               {evento.nombre}
      //             </option>
      //           ))}
      //         </select>
      //       </div>
      //     </div>
          
      //     {mostrarSegundoSelector && (
      //       <div className="row">
      //       <div className="col-md-6">
      //         <Form.Group controlId="curso">
      //           <Form.Label>Curso:</Form.Label>
      //           <Form.Control as="select" value={curso2} onChange={handleCursoChange2}>
      //             <option value={null}>Selecciona un curso</option>
      //             {cursosAll.map((curso) => (
      //               <option key={curso.id} value={curso.id}>
      //                 id: {curso.id} nombre: {curso.nombre}
      //               </option>
      //             ))}
      //           </Form.Control>
      //         </Form.Group>
      //       </div>
      //       <div className="col-md-6">
      //         <h2>Selector Múltiple</h2>
      //         <select multiple className="form-control" onChange={handleSeleccion2}>
      //           {eventosCurso2.map((evento) => (
      //             <option key={evento.id} value={evento.id}>
      //               {evento.nombre}
      //             </option>
      //           ))}
      //         </select>
      //       </div>
      //     </div>
      //     )}
          
      //     {mostrarTercerSelector && (
      //       <div className="row">
      //       <div className="col-md-6">
      //         <Form.Group controlId="curso">
      //           <Form.Label>Curso:</Form.Label>
      //           <Form.Control as="select" value={curso3} onChange={handleCursoChange3}>
      //             <option value={null}>Selecciona un curso</option>
      //             {cursosAll.map((curso) => (
      //               <option key={curso.id} value={curso.id}>
      //                 id: {curso.id} nombre: {curso.nombre}
      //               </option>
      //             ))}
      //           </Form.Control>
      //         </Form.Group>
      //       </div>
      //       <div className="col-md-6">
      //         <h2>Selector Múltiple</h2>
      //         <select multiple className="form-control" onChange={handleSeleccion3}>
      //           {eventosCurso3.map((evento) => (
      //             <option key={evento.id} value={evento.id}>
      //               {evento.nombre}
      //             </option>
      //           ))}
      //         </select>
      //       </div>
      //     </div>
      //     )}
      //   </div>

      //   <Button type="submit" variant="primary">Registrar</Button>
      //     </Form>
    
      //     <Button variant="primary" onClick={mostrar}>Mostrar Lista</Button>
      //   </div>
    //   );
    // }

//////////////////////////////////////////
            {/* <Form.Group controlId="curso">
              <Form.Label>Curso:</Form.Label>
              <Form.Control as="select" value={curso} onChange={handleCursoChange}>
                <option value={null}>Selecciona un curso</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    id: {curso.id} nombre: {curso.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
    
            <Form.Group controlId="eventos">
              <Form.Label>Eventos:</Form.Label>
              <Form.Control as="select" value={eventosPosibles} onChange={handleEventosChange} multiple>
                {eventosPosibles.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    id: {evento.id} nombre: {evento.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {mostrarSegundoSelector && (
              <div>
               <Form.Group controlId="curso">
              <Form.Label>Curso:</Form.Label>
              
              <Form.Control as="select" value={curso2} onChange={handleCursoChange2}>
                <option value={null}>Selecciona un curso</option>
                {cursos2.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    id: {curso.id} nombre: {curso.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
    
            <Form.Group controlId="eventos">
              <Form.Label>Eventos:</Form.Label>
              <Form.Control as="select" value={eventosPosibles2} onChange={handleEventosChange2} multiple>
                {eventosPosibles2.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    id: {evento.id} nombre: {evento.nombre}
                  </option>
                ))} 
              </Form.Control>
            </Form.Group>
            
              </div>
            )}
            

            <Button type="submit" variant="primary">Registrar</Button>
          </Form>
    
          <Button variant="primary" onClick={mostrar}>Mostrar Lista</Button>
        </div>
      );
    }
    */}
// return (
//   <>
      // <div className="container">
      //   <div className="row">
      //     <div className="col-md-6">
      //       <Form.Group controlId="curso">
      //         <Form.Label>Curso:</Form.Label>
      //         <Form.Control as="select" value={curso1} onChange={handleCursoChange1}>
      //           <option value={null}>Selecciona un curso</option>
      //           {cursosAll.map((curso) => (
      //             <option key={curso.id} value={curso.id}>
      //               id: {curso.id} nombre: {curso.nombre}
      //             </option>
      //           ))}
      //         </Form.Control>
      //       </Form.Group>
      //     </div>
      //     <div className="col-md-6">
      //       <h2>Selector Múltiple</h2>
      //       <select multiple className="form-control" onChange={handleSeleccion1}>
      //         {eventosCurso1.map((evento) => (
      //           <option key={evento.id} value={evento.id}>
      //             {evento.nombre}
      //           </option>
      //         ))}
      //       </select>
      //     </div>
      //   </div>
        
      //   {mostrarSegundoSelector && (
      //     <div className="row">
      //     <div className="col-md-6">
      //       <Form.Group controlId="curso">
      //         <Form.Label>Curso:</Form.Label>
      //         <Form.Control as="select" value={curso2} onChange={handleCursoChange2}>
      //           <option value={null}>Selecciona un curso</option>
      //           {cursosAll.map((curso) => (
      //             <option key={curso.id} value={curso.id}>
      //               id: {curso.id} nombre: {curso.nombre}
      //             </option>
      //           ))}
      //         </Form.Control>
      //       </Form.Group>
      //     </div>
      //     <div className="col-md-6">
      //       <h2>Selector Múltiple</h2>
      //       <select multiple className="form-control" onChange={handleSeleccion2}>
      //         {eventosCurso2.map((evento) => (
      //           <option key={evento.id} value={evento.id}>
      //             {evento.nombre}
      //           </option>
      //         ))}
      //       </select>
      //     </div>
      //   </div>
      //   )}
        
      //   {mostrarTercerSelector && (
      //     <div className="row">
      //     <div className="col-md-6">
      //       <Form.Group controlId="curso">
      //         <Form.Label>Curso:</Form.Label>
      //         <Form.Control as="select" value={curso3} onChange={handleCursoChange3}>
      //           <option value={null}>Selecciona un curso</option>
      //           {cursosAll.map((curso) => (
      //             <option key={curso.id} value={curso.id}>
      //               id: {curso.id} nombre: {curso.nombre}
      //             </option>
      //           ))}
      //         </Form.Control>
      //       </Form.Group>
      //     </div>
      //     <div className="col-md-6">
      //       <h2>Selector Múltiple</h2>
      //       <select multiple className="form-control" onChange={handleSeleccion3}>
      //         {eventosCurso3.map((evento) => (
      //           <option key={evento.id} value={evento.id}>
      //             {evento.nombre}
      //           </option>
      //         ))}
      //       </select>
      //     </div>
      //   </div>
      //   )}
      // </div>
//           <br /><br /><br />
//           <br /><br /><br />
//           <p>{seleccionados1}</p>
//           <p>{seleccionados2}</p>
//           <p>{seleccionados3}</p>
//     </> 
 

//   );
// };






// import React, { useState } from 'react';

// const opciones = {
//   opcion1: 'Opción 1',
//   opcion2: 'Opción 2',
//   opcion3: 'Opción 3',
//   opcion4: 'Opción 4'
// };

// export const RegisterFormAlumno = () => {
//   const [seleccionados, setSeleccionados] = useState([]);

  // const handleSeleccion = (event) => {
  //   const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
  //   setSeleccionados(opcionesSeleccionadas);
  // };

//   return (
//     <div>
//       <h2>Selector Múltiple</h2>
//       <select multiple onChange={handleSeleccion}>
//         {Object.entries(opciones).map(([valor, texto]) => (
//           <option key={valor} value={valor}>
//             {texto}
//           </option>
//         ))}
//       </select>
//       <div>
//         <h3>Opciones seleccionadas:</h3>
//         <ul>
//           {seleccionados.map((opcion) => (
//             <li key={opcion}>{opciones[opcion]}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };


///////////////////////////////////////////////


// import React, { useState,useContext,useEffect } from 'react';
// import { axiosInstance } from '../axios';
// import './estilos/estiloFormCrearProfesor.css';
// import AuthContext from '../../Ultimo/AuthContext';
// import { Form, Button } from 'react-bootstrap';

// export const RegisterFormAlumno = ({ mostrar }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [primerApellido, setPrimerApellido] = useState('');
  // const [segundoApellido, setSegundoApellido] = useState('');
//   const [curso, setCurso] = useState('');
//   const { authTokens, logoutUser } = useContext(AuthContext);
//   const [eventos, setEventos] = useState([]);
//   const [cursos, setCursos] = useState([]);
//   const [eventosPosibles, setEventosPosibles] = useState([]);
//   const [selectedEventos, setSelectedEventos] = useState([]); // Nuevo estado para almacenar los eventos seleccionados
//   const [evento1, setEvento1] = useState('');
//   const [mostrarSegundoSelector, setMostrarSegundoSelector] = useState(false);
  
//   const [curso2, setCurso2] = useState('');
//   const [cursos2, setCursos2] = useState([]);
//   const [eventos2, setEventos2] = useState([]);
//   const [eventosPosibles2, setEventosPosibles2] = useState([]);
//   const [selectedEventos2, setSelectedEventos2] = useState([]); // Nuevo estado para almacenar los eventos seleccionados
//   const [evento12, setEvento12] = useState('');
//   const [mostrarSegundoSelector2, setMostrarSegundoSelector2] = useState(false);


  // const handleUsernameChange = (event) => setUsername(event.target.value);
  // const handlePasswordChange = (event) => setPassword(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);
  // const handlePrimerApellidoChange = (event) => setPrimerApellido(event.target.value);
  // const handleSegundoApellidoChange = (event) => setSegundoApellido(event.target.value);
//   // const handleCursoChange = (event) => setCurso(event.target.value);


//   const handleCursoChange=(event)=>{
//     setCurso(event.target.value);
//     let eventosFiltrados=eventos.filter(evento=>evento.curso==curso);
//     setEventosPosibles(eventosFiltrados);

//     console.log("curso:",curso);
//     console.log("eventosPosibles",eventosPosibles);
//   }


//   const handleEventosChange=(event)=>{
//     setEvento1(event.target.value);
//     console.log("evento1",evento1);
//     setMostrarSegundoSelector(true);
//     console.log("curso2",curso);

//     }



//     const handleCursoChange2=(event)=>{
//       setCurso2(event.target.value);
//       let eventosFiltrados2=eventos2.filter(evento2=>evento2.curso==curso);
//       setEventosPosibles2(eventosFiltrados2);
  
//       console.log("curso:",cursos2);
//       console.log("eventosPosibles",eventosPosibles2);
//     }
  
  
//     const handleEventosChange2=(event)=>{
//       setEvento12(event.target.value);
//       console.log("evento1",evento12);
//       setMostrarSegundoSelector2(true);
  
//       }
  
//   useEffect(() => {
//     fetchCursos();
//     fetchEventos();
//   }, []);

//   const fetchEventos = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/eventos/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + String(authTokens.access),
//         },
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         console.log("eventos", data);
//         setEventos(data);
//       } else if (response.statusText === 'Unauthorized') {
//         console.log("fallo");
//         // logoutUser();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchCursos = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/cursos/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + String(authTokens.access),
//         },
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         console.log("cursos", data);
//         setCursos(data);
//         console.log("CURSOS CARGA1", data);
//         setCursos2(data);
//         console.log("CURSO CARGA",data);
//       } else if (response.statusText === 'Unauthorized') {
//         console.log("fallo");
//         // logoutUser();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   axiosInstance
  //     .post(`user/register/`, {
  //       email: email,
  //       username: username,
  //       password: password,
  //       nombre: username,
  //       primer_apellido: primerApellido,
  //       segundo_apellido: segundoApellido,
  //       groups: [3],
  //     })
  //     .then((res) => {
  //       console.log("Usuario creado");
  //       console.log(res.data);
  //       console.log("curso", curso);
  
  //       const alumnoCreado = res.data.nombre;
  
  //       // Luego de crear el usuario, llamar a la función para crear el alumno
  //       createAlumno(alumnoCreado, selectedEventos);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };
  
  // const createAlumno = (userId, eventoIds) => {
  //   console.log("user", userId);
  //   console.log("eventos", eventoIds);
  
  //   axiosInstance
  //     .post(`crear/alumno/`, {
  //       usuario: userId,
  //       eventos: eventoIds,
  //     })
  //     .then((res) => {
  //       console.log("Alumno creado");
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };
// return(
//   <div className="form-container">
//       <h2>Formulario de Registro</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="username">
//           <Form.Label>Nombre de usuario:</Form.Label>
//           <Form.Control type="text" value={username} onChange={handleUsernameChange} />
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email:</Form.Label>
//           <Form.Control type="email" value={email} onChange={handleEmailChange} />
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Contraseña:</Form.Label>
//           <Form.Control type="password" value={password} onChange={handlePasswordChange} />
//         </Form.Group>

//         <Form.Group controlId="primerApellido">
//           <Form.Label>Primer Apellido:</Form.Label>
//           <Form.Control type="text" value={primerApellido} onChange={handlePrimerApellidoChange} />
//         </Form.Group>

//         <Form.Group controlId="segundoApellido">
//           <Form.Label>Segundo Apellido:</Form.Label>
//           <Form.Control type="text" value={segundoApellido} onChange={handleSegundoApellidoChange} />
//         </Form.Group>

//         <Form.Group controlId="curso">
//           <Form.Label>Curso:</Form.Label>
//           <Form.Control as="select" value={curso} onChange={handleCursoChange}>
//             <option value={null}>Selecciona un curso</option>
//             {cursos.map((curso) => (
//               <option key={curso.id} value={curso.id}>
//                 id: {curso.id} nombre: {curso.nombre}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="eventos">
//           <Form.Label>Eventos:</Form.Label>
//           <Form.Control as="select" value={eventosPosibles} onChange={handleEventosChange} multiple>
//             {eventosPosibles.map((evento) => (
//               <option key={evento.id} value={evento.id}>
//                 id: {evento.id} nombre: {evento.nombre}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//         {mostrarSegundoSelector && (
//           <div>
//            <Form.Group controlId="curso">
//           <Form.Label>Curso:</Form.Label>
          
//           <Form.Control as="select" value={curso2} onChange={handleCursoChange2}>
//             <option value={null}>Selecciona un curso</option>
//             {cursos2.map((curso) => (
//               <option key={curso.id} value={curso.id}>
//                 id: {curso.id} nombre: {curso.nombre}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="eventos">
//           <Form.Label>Eventos:</Form.Label>
//           <Form.Control as="select" value={eventosPosibles2} onChange={handleEventosChange2} multiple>
//             {eventosPosibles2.map((evento) => (
//               <option key={evento.id} value={evento.id}>
//                 id: {evento.id} nombre: {evento.nombre}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//           </div>
//         )}
//         <Button type="submit" variant="primary">Registrar</Button>
//       </Form>

//       <Button variant="primary" onClick={mostrar}>Mostrar Lista</Button>
//     </div>
//   );
// }
