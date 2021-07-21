import { db } from '../firebase/firebase-config';

export const loadNotes = async (uid) => {
	// get() obtiene todo lo contenido en el documento
	const notesSnap = await db
		.collection(`${uid}/journal/notes`)
		.get()
		.catch((e) => console.log(e));
	const notes = [];

	// empleando forEach para modificar notesSnap y obtener la informacion
	// de la manera que necesitamos
	notesSnap.forEach((snapHijo) => {
		// .data() obtiene todos los objetos del documento excepto la propiead
		// id; la propiedad id la obtenemos mediante snapHijo.id
		notes.push({
			id: snapHijo.id,
			...snapHijo.data(),
		});
	});

	return notes;
};
