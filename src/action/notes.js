import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpLoad } from '../helpers/fileUpLoad';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
	// ambos argumentos son proveidos por el DOM, el primero es el dispatch
	// y el segundo nos permite obtener el state
	return async (dispatch, getState) => {
		// obtenemos la propiedad ui del objeto auth
		const { uid } = getState().auth;

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
		const dbRef = await db.collection(`${uid}/journal/notes`).add(newNote);

		// enviando a dispatche la nueva nota, le pasamos el id y el objeto
		// de la nueva nota
		dispatch(activeNote(dbRef.id, newNote));
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: { id, ...note },
});

export const startLoadingNotes = (uid) => {
	return async (dispatch) => {
		// -Disparo el metodo loadNotes para cargar las notas del usuario
		//  se hace aqui por ser el primer lugar donde se obtiene el user.
		// -Se emplea await puesto que loadNotes retorna una promesa
		const notes = await loadNotes(uid);

		// enviando al Redux las notas cargadas de firebase
		dispatch(setNotes(notes));
	};
};

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});

export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		// firebase no permite guardar campos "undefined" por lo cual indicamos
		// si nuestro objeto "note" tiene "undefined" en la propieadad "url"
		// entonces lo elimina
		!note.url && delete note.url;

		// hacemos una copia de "note" para evitar modificar
		// accidentalmente "note" puesto que los objeto se manejan por
		// referencia
		const noteToFirestore = { ...note };

		// con "delete" borramos la propiedad id del objeto noteToFirestore
		delete noteToFirestore.id;

		// .doc() nos devuelve una referencia al documento para poderlo manipular
		// este metodo recibe un path
		// .update() recibe un objeto con la informacion a modificar
		await db
			.doc(`${uid}/journal/notes/${note.id}`)
			.update(noteToFirestore)
			.catch((e) => Swal.fire('Not Saved', e, 1500));

		// enviando la nota actualizada a Redux
		dispatch(refreshNote(note.id, note));
		Swal.fire('Saved', note.title, 'success');
	};
};

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: { id, note: { id, ...note } },
});

export const startUpLoading = (file) => {
	return async (dispatch, getState) => {
		const { active: noteActive } = getState().notes;

		// muestra la ventana pero bloquea la opcion de cerrarla
		Swal.fire({
			title: 'Uploading',
			text: 'please wait',
			allowOutsideClick: false,
			showConfirmButton: false,
			willOpen: () => {
				Swal.showLoading();
			},
		});

		const fileUp = await fileUpLoad(file);
		noteActive.url = fileUp;

		dispatch(startSaveNote(noteActive));

		// cierra a ventana Swal
		Swal.close();
	};
};
