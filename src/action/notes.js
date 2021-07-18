import { db } from '../firebase/firebase-config';
import { types } from '../types/types';

export const startNewNote = () => {
	// ambos argumentos son proveidos por el DOM, el primero es el dispatch
	// y el segundo nos permite obtener el state
	return async (dispatch, getState) => {
		// obtenemos la propiedad ui del objeto auth
		const state = getState().auth.uid;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		// BD FIREBASE - es una BD no relacional, funciona colocando
		// colecciones -> documentos -> colecciones -> documentos -> etc

		// db.collection(<path:string>) retorna una referencia a la collecion
		// de la bd.
		// recibe el path donde guardara la nueva informacion; para agregar un
		// nuevo elemento se emplea el metodo add(<dato>)
		const dbRef = await db
			.collection(`${state}/journal/notes`)
			.add(newNote);

		// enviando a dispatche la nueva nota, le pasamos el id y el objeto
		// de la nueva nota
		dispatch(activeNote(dbRef.id, newNote));
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: { id, ...note },
});
