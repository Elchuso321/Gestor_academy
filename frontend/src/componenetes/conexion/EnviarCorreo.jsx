import React, { useState } from 'react';
const URL_API = import.meta.env.VITE_API_URL;

export const EmailForm = ({idUser}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    // Realizar la petición Fetch aquí usando los valores de subject y message
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const errors = {};

        if (subject.trim() === '') {
          errors.subject = 'El asunto es requerido.';
        }
      
        if (message.trim() === '') {
          errors.message = 'El mensaje es requerido.';
        }
      
        setErrors(errors);
      
        if (Object.keys(errors).length === 0) {
       
        const username = idUser;
        console.log("username1: ", username);
        console.log("subject: ", subject);
        console.log("message: ", message);
        await fetch(`${URL_API}/api/user/email/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            message,
            subject
          })
        });
    
           // Realizar acciones adicionales si el formulario es válido
           console.log('El formulario es válido. Enviar datos...');
        }
      }
      
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="subjectInput" className="form-label">Asunto:</label>
      <input
        type="text"
        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
        id="subjectInput"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="messageInput" className="form-label">Mensaje:</label>
      <textarea
        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
        id="messageInput"
        rows="5"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
    </div>
    <button type="submit" className="btn btn-primary">Enviar</button>
  </form>
  );
};

