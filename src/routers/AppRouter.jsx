import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
	return (
		<Router>
			<div>
				<Switch>
					{/* el primero no contiene el exact puesto que tendra rutas
					hijas y por ende habra variaciones */}
					<Route path="/auth" component={AuthRouter} />
					{/* contiene exact puesto que sera el unico path que 
					renderizara el componente JournalScreen*/}
					<Route exact path="/" component={JournalScreen} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
