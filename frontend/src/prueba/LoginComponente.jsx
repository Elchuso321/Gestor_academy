import React, { useState } from 'react';
import { login1 } from './loginFunction';


export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        login1(username, password).then(success => {
            if (success) {
                window.location.href = '/';
            } else {
                alert('El inicio de sesión falló');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};