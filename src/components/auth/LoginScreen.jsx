import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { login, startLoginEmailPassword } from '../../action/auth';

const LoginScreen = () => {
	const [formValues, handleInputChange] = useForm({
		email: 'alpaca@outlook.com',
		password: 'alpaca123',
	});

	// el custom hook useDispatch proviene de redux y
	// sirve para retornar una funcion que recibe un metodo mediante el cual
	// tendremos acceso a Dispatch enviandole informacion
	const dispatch = useDispatch();

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailPassword(email, password));
	};

	return (
		<>
			<h3 className="auth__title">Login</h3>
			<form onSubmit={handleLogin}>
				<div className="form-control">
					<input
						type="text"
						id="email"
						name="email"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
						value={email}
						onChange={handleInputChange}
					/>

					<label htmlFor="email" className="form-control__label">
						Email
					</label>
				</div>

				<div className="form-control">
					<input
						type="password"
						id="password"
						name="password"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
						value={password}
						onChange={handleInputChange}
					/>

					<label htmlFor="password" className="form-control__label">
						password
					</label>
				</div>

				<button type="submit" className="btn cursor btn-block">
					Login
				</button>
			</form>

			<hr />

			<h6 className="auth__title-network">Login with social Networks</h6>
			<div className="google-btn">
				<div className="google-icon-wrapper">
					<img
						className="google-icon"
						src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
						alt="google button"
					/>
				</div>
				<p className="btn-text">
					<b>Sign in with google</b>
				</p>
			</div>

			<Link to="/auth/register" className="link">
				Create a new account
			</Link>
		</>
	);
};

export default LoginScreen;
