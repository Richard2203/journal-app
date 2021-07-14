import React from 'react';

const LoginScreen = () => {
	return (
		<div className="auth__box-container">
			<h3 className="auth__title">Login</h3>
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
		</div>
	);
};

export default LoginScreen;
