import { types } from '../types/types';

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

// para manejar el dispatch se crea un metodo que retorne el tipo de accion
// y los datos
export const login = (uid, name) => ({
	type: types.login,
	payload: {
		uid,
		name,
	},
});
