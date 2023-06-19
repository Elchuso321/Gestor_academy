import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../axios';

export  const LogOut=()=> {
	// const history = Navigate();

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		localStorage.removeItem('group');
		// history.push('/login');
	})
	
	return (
	<div>Logout</div>
	)
}