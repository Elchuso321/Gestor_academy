import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';

const URL_API = import.meta.env.VITE_API_URL

export const BotonCrearAula = () => {
  const [academias, setAcademias] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [academia, setAcademia] = useState('');

  const handleNombreChange = (event) => setNombre(event.target.value);
  const handleAcademiaChange = (event) => setAcademia(event.target.value);

  const crearAula = async () => {
    const data = {
      nombre: nombre,
      academia: academia, // Reemplaza academia con el ID de la academia a la que pertenece el aula
    };

    try {
      const response = await fetch(`${URL_API}/api/aulas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Aula creada:', responseData);
        // Realiza cualquier acción adicional que necesites con la respuesta de la API
      } else if (response.status === 401) {
        console.log('No autorizado');
        logoutUser();
      } else {
        console.log('Error al crear el aula:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    const getAcademias = async () => {
      try {
        const response = await fetch(`${URL_API}/api/academias/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("academias:", data);
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

  return (
    <div>
      <div className="form-container">
        <h2>Nuevo Grupo</h2>
        <form onSubmit={crearAula}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} />
          </div>
          {( localStorage.getItem('academia') && localStorage.getItem('academia') != 'Todo') && (
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
            )}
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      </div>
    </div>
  );
};
