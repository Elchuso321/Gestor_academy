import React, { useState } from 'react';
import { axiosInstance } from '../axios';
// import { login1 } from './loginFunction';

export const RegisterForm = () => {
    
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
			.post(`user/register/`, {
				email: email,
				user_name: username,
				password: password,
                nombre:username,
                primer_apellido:"saez",
                groups:[3,],
			})
            // groups :1 es profesor,2 es alumno y 3 es admin
            // CUIDADO
			.then((res) => {
                console.log("te ha fallado")
				// history.push('/login');
				console.log(res);
				console.log(res.data);
            }).catch((err) => {
                console.log(err.response.data);
            });
	};
    

    return (
        <>
        <h2>Formulario Register</h2>
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