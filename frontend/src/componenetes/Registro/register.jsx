// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import { useNavigate } from 'react-router-dom';

// export default function SignUp() {
// 	const history = useNavigate();

// 	const initialFormData = Object.freeze({
// 		email: '',
// 		username: '',
// 		password: '',
// 	});

// 	const [formData, updateFormData] = useState(initialFormData);

// 	const handleChange = (e) => {
// 		updateFormData({
// 			...formData,
// 			// Trimming any whitespace
// 			[e.target.name]: e.target.value.trim(),
// 		});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log(formData);

// 		axiosInstance
// 			.post(`user/create/`, {
// 				email: formData.email,
// 				user_name: formData.username,
// 				password: formData.password,
// 			})
// 			.then((res) => {
// 				history.push('/login');
// 				console.log(res);
// 				console.log(res.data);
// 			});
// 	};

// 	return (
// 		<Container component="main" maxWidth="xs">

// 			<div >
			
			
// 				<form className={classes.form} noValidate>
// 					<Grid container spacing={2}>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="email"
// 								label="Email Address"
// 								name="email"
// 								autoComplete="email"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="username"
// 								label="Username"
// 								name="username"
// 								autoComplete="username"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								name="password"
// 								label="Password"
// 								type="password"
// 								id="password"
// 								autoComplete="current-password"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<FormControlLabel
// 								control={<Checkbox value="allowExtraEmails" color="primary" />}
// 								label="I want to receive inspiration, marketing promotions and updates via email."
// 							/>
// 						</Grid>
// 					</Grid>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						className={classes.submit}
// 						onClick={handleSubmit}
// 					>
// 						Sign Up
// 					</Button>
// 					<Grid container justify="flex-end">
// 						<Grid item>
// 							<Link href="#" variant="body2">
// 								Already have an account? Sign in
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</form>
// 			</div>
// 		</Container>
// 	);
// }