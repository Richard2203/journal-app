import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';

//? La manera de manejar los dispatch es centralizar en un archivo las acciones
//? que existen

export const startLoginEmailPassword = (email, password) => {
	// el DOM ofrecera el dispatch y entonces lo ejecutara
	return (dispatch) => {
		dispatch(startLoading());

		// signInWithEmailAndPassword(email, password) recibe las credenciales
		// y las compara con las existentes en la BD; retorna una promesa
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				// este dispatch actualiza el Redux
				dispatch(login(user.uid, user.displayName));

				dispatch(finishLoading());
			})
			.catch((e) => {
				console.log(e);
				dispatch(finishLoading());
			});
	};
};

export const startRegisterUser = (email, password, name) => {
	return (dispatch) => {
		// la funcion createUserWithEmailAndPassword(email,password)
		// crea un usuario en firebase con las credenciales proporcionadas
		// por el usuari; y retorna una promesa
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				// usamos el metodo updateProfile y le enviamos un nombre
				// para poder asignar el nombre del usuario a la cuenta
				await user.updateProfile({ displayName: name });

				// este dispatch() registra el usuario en nuestro Redux
				dispatch(login(user.uid, user.displayName));
			})
			.catch((e) => {
				console.log(e);
			});
	};
};

// el login con un proveedor es asincrono por lo cual debemos retornar
// un callback
export const startGoogleLogin = () => {
	return (dispatch) => {
		// retorna una promesa por lo cual lo manejaremos con then
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			});
	};
};

// para manejar el dispatch se crea un metodo que retorne el tipo de accion
// y los datos
export const login = (uid, name) => ({
	type: types.login,
	payload: {
		uid,
		name,
	},
});

export const startLogout = () => {
	return async (dispatch) => {
		// esperamos a que firebase termine de hacer logout del usuario
		await firebase.auth().signOut();
		dispatch(logout());
	};
};

export const logout = () => ({ type: types.logout });
