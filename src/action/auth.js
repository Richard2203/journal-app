import { types } from '../types/types';

// La maneja de manejar los dispatch es centralizar en un archivo las acciones
// que existen

// para manejar el dispatch se crea un metodo que retorne el tipo de accion
// y los datos
export const login = (uid, name) => ({
	type: types.login,
	payload: {
		uid,
		name,
	},
});
