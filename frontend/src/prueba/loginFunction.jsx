import axios from 'axios';
// import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:8000/';

export const login1 = (username, password) => {
    return axios.post(baseUrl + 'rest-auth/login/', { username, password })
        .then(response => {
            localStorage.setItem('Token', response.data.key);
            // Cookies.set('Authorization', 'Token ' + response.data.key);
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};
