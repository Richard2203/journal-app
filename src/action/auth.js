import Swal from 'sweetalert2';
import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';
import { noteLogout } from './notes';

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
				dispatch(finishLoading());
				// implementando un mensaje de error proveido por la libreria
				// sweetalert2
				Swal.fire('Error', e.message, 'error');
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
				// implementando un mensaje de error proveido por la libreria
				// sweetalert2
				Swal.fire('Error', e.message, 'error');
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

		// purgamos la sesion del usuario
		dispatch(logout());

		// purgando la informacion de las notas del usuario
		dispatch(noteLogout());
	};
};

export const logout = () => ({ type: types.logout });
