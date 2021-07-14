import React from 'react';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
	return (
		<>
			<h3 className="auth__title">Register</h3>

			<form>
				<div className="form-control">
					<input
						type="text"
						id="name"
						name="name"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
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
					/>

					<label htmlFor="password" className="form-control__label">
						Password
					</label>
				</div>

				<div className="form-control">
					<input
						type="password"
						id="password-confirm"
						name="password-confirm"
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
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
