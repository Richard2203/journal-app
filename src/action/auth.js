import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

//? La manera de manejar los dispatch es centralizar en un archivo las acciones
//? que existen

// creando un metodo asincrono para verificar el funcionamiento de los middleware;
// su implementancion en codigo es igual al metodo sincrono
export const startLoginEmailPassword = (email, password) => {
	// al aplicar el retorno el middleware ejecutara el callback
	// el DOM ofrecera el dispatch y entonces lo ejecutara
	return (dispatch) => {
		setTimeout(() => {
			dispatch(login(123, 'pedro'));
		}, 3500);
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
