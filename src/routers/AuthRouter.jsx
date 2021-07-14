import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthRouter = () => {
	return (
		<div className="auth__main">
			<div className="auth__box-container">
				<Switch>
					{/* el path debe ser exacto para poderse mostrar
                el componente correspondiente a su path, no habra
                variaciones de path para rutas hijas */}

					{/* colocamos el "/auth" para indicar que es ruta hija del 
                mismo */}
					<Route exact path="/auth/login" component={LoginScreen} />
					<Route
						exact
						path="/auth/register"
						component={RegisterScreen}
					/>
					<Redirect to="/auth/register" />
				</Switch>
			</div>
		</div>
	);
};

export default AuthRouter;
