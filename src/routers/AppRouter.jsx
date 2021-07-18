import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { login } from '../action/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../action/notes';

const AppRouter = () => {
	const dispatch = useDispatch();

	// este hook tiene la finalidad de saber si esta siendo autenticado
	const [Checking, setChecking] = useState(true);

	// es hook tiene la finalidad de saber si el usuario esta autenticado
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// implementacion de useEffect para cambio en la autentacion de usuario
	useEffect(() => {
		// onAuthStateChanged() retorna un observable, este es un objeto que
		// se puede ejecutar mas de una vez: se ejecuta al autenticarse
		// y/o recargar la pagina
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);

				// -Disparo el metodo loadNotes para cargar las notas del usuario
				//  se hace aqui por ser el primer lugar donde se obtiene el user.
				// -Se emplea await puesto que loadNotes retorna una promesa
				const notes = await loadNotes(user.uid);

				// enviando al Redux las notas cargadas de firebase
				dispatch(setNotes(notes));
			} else setIsLoggedIn(false);

			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLoggedIn]);

	// aqui se puede retornar una pantalla de espera, en este caso unicamente
	// estamos colocando una simple etiqueta HTML
	if (Checking) return <h1>Espere...</h1>;

	return (
		<Router>
			<div>
				<Switch>
					{/* contiene exact puesto que sera el unico path que 
					renderizara el componente JournalScreen*/}
					<PrivateRoute
						isAuthenticated={isLoggedIn}
						exact
						path="/"
						component={JournalScreen}
					/>

					{/* no contiene el exact puesto que tendra rutas
					hijas y por ende habra variaciones */}
					<PublicRoute
						isAuthenticated={isLoggedIn}
						path="/auth"
						component={AuthRouter}
					/>

					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
