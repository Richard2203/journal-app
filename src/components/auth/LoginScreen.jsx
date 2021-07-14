import React from 'react';

const LoginScreen = () => {
	return (
		<>
			<h3>Login</h3>
			<form>
				<div className="form-control">
					<input
						type="text"
						id="email"
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
						className="form-control__input"
						autoComplete="off"
						placeholder=" "
					/>

					<label htmlFor="password" className="form-control__label">
						password
					</label>
				</div>

				<button type="submit" className="btn cursor">
					Login
				</button>
			</form>
		</>
	);
};

export default LoginScreen;
