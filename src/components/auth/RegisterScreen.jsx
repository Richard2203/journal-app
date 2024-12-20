import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../action/ui';
import { startRegisterUser } from '../../action/auth';

const RegisterScreen = () => {
	// el custom hook useDispatch proviene de redux y
	// sirve para retornar una funcion que recibe un metodo mediante el cual
	// tendremos acceso a Dispatch enviandole informacion
	const dispatch = useDispatch();

	// useSelector() recibe un callback y ese callback recibe por argumento
	// "state" que contiene todos los objetos empleados en Redux, en este
	// caso nos proveera: ui y auth.
	// aplicando desestructuracion para obtener la propieadad "msgError" retornado
	// de state.ui
	const { msgError } = useSelector((state) => state.ui);

	const [formValue, hadleInputChange] = useForm({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const { name, email, password, passwordConfirm } = formValue;

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) dispatch(startRegisterUser(email, password, name));
	};

	const isFormValid = () => {
		if (validator.isEmpty(name)) {
			dispatch(setError('The name can´t null'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('The email is not valid'));
			return false;
		} else if (!(password === passwordConfirm)) {
			dispatch(setError('The passwords not equals'));
			return false;
		} else if (!validator.isStrongPassword(password)) {
			dispatch(setError('The password is not strong'));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>
			{msgError && (
				<div className="Form__valid-alert">
					<span>{msgError}</span>
				</div>
			)}

			<form onSubmit={handleRegister}>
				<div className="form-control">
					<input
						type="text"
						id="name"
						name="name"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
						value={name}
						onChange={hadleInputChange}
					/>

					<label htmlFor="name" className="form-control__label">
						Name
					</label>
				</div>

				<div className="form-control">
					<input
						type="text"
						id="email"
						name="email"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
						value={email}
						onChange={hadleInputChange}
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
						onChange={hadleInputChange}
					/>

					<label htmlFor="password" className="form-control__label">
						Password
					</label>
				</div>

				<div className="form-control">
					<input
						type="password"
						id="passwordConfirm"
						name="passwordConfirm"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
						value={passwordConfirm}
						onChange={hadleInputChange}
					/>

					<label htmlFor="password" className="form-control__label">
						Confirm password
					</label>
				</div>

				<button type="submit" className="btn cursor btn-block">
					Login
				</button>
			</form>

			<hr />

			<Link to="/auth/login" className="link">
				Already Register?
			</Link>
		</>
	);
};

export default RegisterScreen;
