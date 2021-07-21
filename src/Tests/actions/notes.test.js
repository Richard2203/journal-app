/**
 * @jest-environment node
 */

// Instalando la dependencia para poder hacer pruebas mock en store de redux
//  https://www.npmjs.com/package/redux-mock-store
// se añaden las importaciones
//  import configureStore from 'redux-mock-store';
//  const middlewares = [thunk];
//  const mockStore = configureStore(middlewares);
//  const store = mockStore({});

import configureStore from 'redux-mock-store';
//importamos el middleware que usaremos para pruebas
import thunk from 'redux-thunk';
import {
	startLoadingNotes,
	startNewNote,
	startSaveNote,
} from '../../action/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: { uid: '[Testing uid] rj893jr23rj239r' },
};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);
describe('Pruebas en el action notes', () => {
	// Para poder realizar pruebas en redux store se emplean mocks
	//      npm install redux-mock-store --save-dev

	// store ira almacenando todos los getActions() disparados, para evitar esto
	// se emplea beforeEch()
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('startNewNote debe de crear una nueva nota', async () => {
		// enviamos el metodo que empleara dispatch y/o getState
		await store.dispatch(startNewNote());

		// getActions() retorna un arreglo con tantos objetos como metodos hayan
		// sido enviados por el metodo dispatch()
		const actions = store.getActions();

		// el primer dispatch debe retornar el objeto con las propieades y valores
		// indicadas en el metodo toEqual()
		expect(actions[0]).toEqual({
			payload: {
				body: '',
				date: expect.any(Number),
				id: expect.any(String),
				title: '',
			},
			type: types.notesActive,
		});

		// el segundo dispatch debe retornar el objeto con las propieades y valores
		// indicadas en el metodo toEqual()
		expect(actions[1]).toEqual({
			payload: {
				body: '',
				date: expect.any(Number),
				id: expect.any(String),
				title: '',
			},
			type: types.notesAddNew,
		});

		const docId = actions[0].payload.id;
		await db
			.doc(`[Testing uid] rj893jr23rj239r/journal/notes/${docId}`)
			.delete();
	});

	test('startLoadingNotes debe cargar las notas', async () => {
		await store.dispatch(startLoadingNotes(initState.auth.uid));
		const actions = store.getActions();

		const note = {
			body: expect.any(String),
			date: expect.any(Number),
			id: expect.any(String),
			title: expect.any(String),
		};

		expect(actions[0]).toEqual({
			payload: expect.any(Array),
			type: types.notesLoad,
		});

		// verifica que los objetos hagan Match
		expect(actions[0].payload[0]).toMatchObject(note);
	});

	test('startSaveNote debe actualizar la nota', async () => {
		const note = {
			id: 'ZVVtoKe2AGUIglvgWygJ',
			title: 'nueva nota',
			body: 'este es el cuerpo de la nueva nota',
		};
		await store.dispatch(startSaveNote(note));

		const action = store.getActions();

		expect(action[0].type).toBe(types.notesUpdated);

		const docRef = db
			.doc(`${initState.auth.uid}/journal/notes/${note.id}`)
			.get();

		expect(docRef.data().title).toBe(note.title);
	});
});
