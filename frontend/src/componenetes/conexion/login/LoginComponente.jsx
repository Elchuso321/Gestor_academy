import React, { useState } from 'react';
import { axiosInstance } from '../axios';
// import { login1 } from './loginFunction';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail]= useState('')

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);
    const handleEmailChange = event => setEmail(event.target.value);
    const handleSubmit = (e) => {
		e.preventDefault();
		console.log("hola");

		axiosInstance
			.post(`token/`, {
				email: email,
				user_name: username,
				password: password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				//console.log(res);
				//console.log(res.data);
			});
	};
    

    return (
        <>
        <h2>Formulario Login</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">Iniciar sesión</button>
        </form>
        </>
    );
};