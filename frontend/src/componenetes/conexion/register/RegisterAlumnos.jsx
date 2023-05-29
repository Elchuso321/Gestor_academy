
import React, { useState,useContext,useEffect } from 'react';
import { axiosInstance } from '../axios';
import './estilos/estiloFormCrearProfesor.css';
import AuthContext from '../../Ultimo/AuthContext';
import { Form, Button } from 'react-bootstrap';




export const RegisterFormAlumno = ({ mostrar }) => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    const [cursosAll, setCursosAll] = useState([]);
    const [eventosAll, setEventosAll] = useState([]);
    const [curso1, setCurso1] = useState([]);
    const [eventosCurso1, setEventosCurso1] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);


    const fetchCursos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cursos/', {
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


const handleCursoChange=(event)=>{
    setCurso1(event.target.value);
    let eventosFiltrados=eventosAll.filter(evento=>evento.curso==curso);
    setEventosPosibles(eventosFiltrados);
  }


const handleSeleccion = (event) => {
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
    setSeleccionados(opcionesSeleccionadas);
};


return (
    <>    
    <div>
        <Form.Group controlId="curso">
          <Form.Label>Curso:</Form.Label>
          <Form.Control as="select" value={curso1} onChange={handleCursoChange}>
            <option value={null}>Selecciona un curso</option>
            {cursosAll.map((curso) => (
              <option key={curso.id} value={curso.id}>
                id: {curso.id} nombre: {curso.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br /><br /><br /><br />


      <h2>Selector Múltiple</h2>
      <select multiple onChange={handleSeleccion}>
        {Object.entries(opciones).map(([valor, texto]) => (
          <option key={valor} value={valor}>
            {texto}
          </option>
        ))}
      </select>
      <div>
        <h3>Opciones seleccionadas:</h3>
        <ul>
          {seleccionados.map((opcion) => (
            <li key={opcion}>{opciones[opcion]}</li>
          ))}
        </ul>
      </div>
    </div>
    </>

  );
};



