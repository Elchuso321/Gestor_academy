import axios from 'axios';

// Obtener la imagen de un curso concreto
const getCursoImagen = (cursoId) => {
  return axios.get(`/api/cursos/${cursoId}/imagen/`)
    .then(response => {
      return response.data.imagen;
    })
    .catch(error => {
      console.log(error);
    });
}

// Obtener la URL de la imagen de un curso
getCursoImagen(1).then(url => {
  console.log(url);
});