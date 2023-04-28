import React, { useState } from 'react';
import { axiosInstance } from '../axios';
// import { login1 } from './loginFunction';

export const DatosAlumno = () => {
axiosInstance
			.get("alumnos/1/")
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				//console.log(res);
				//console.log(res.data);
			});

//
//     // me sigue saliendo el mismo error
//     axiosInstance
//     .get('alumnos/1/')       
//     .then((res)=>{         
//         console.log(res.data)                
//         localStorage.setItem('access_token',res.data.access)           
//         localStorage.setItem('refresh_token',res.data.refresh)           
//         axiosInstance.defaults.headers['Authorization'] ='JWT ' + 
//         localStorage.getItem('access_token')       
//     })




    // axiosInstance
	// 		.get(`alumnos/1/`)
	// 		.then((res) => {
	// 			console.log(res)
	// 			//console.log(res);
	// 			//console.log(res.data);
	// 		});
	
// pero si le he puesto allow any no necesita autorizacion
    return (
        <>
       <h2>alumnos en log</h2>
        </>
    );
};
// me sigue saliendo el error 401 unatorized