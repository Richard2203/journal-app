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
	startUpLoading,
} from '../../action/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

// mediante el callback podemos indicar que datos va a retornar
// en este caso, indicamos que retornara una propiedad fileUpLoad de tipo funcion
// y esa funcion retorna una Promesa con la url (se puede colocar unicamente la
// url pero colocamos que es promesa para que la implementacion sea identica a
// a lo que retorna fileUpLoad), de haber mas propieades se pueden colocar
jest.mock('../../helpers/fileUpLoad', () => {
	return {
		fileUpLoad: () => {
			return Promise.resolve(
				'https://this-represents-an-url.com/photo.png'
			);
		},
	};
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: { uid: '[Testing uid] rj893jr23rj239r' },
	notes: {
		active: { id: 'ZVVtoKe2AGUIglvgWygJ', title: 'hola', body: 'mudo' },
	},
};

// en la prueba notes -> startSaveNote ejecuta la funcion scrollTo pero no esta
// definida por lo cual se debe crear mediante jest.fn() asignado a global.scrollTo
global.scrollTo = jest.fn();

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

		// get() retorna el doc con las propieades
		const docRef = await db
			.doc(
				'/[Testing uid] rj893jr23rj239r/journal/notes/ZVVtoKe2AGUIglvgWygJ'
			)
			.get();

		// data() retorna las propieades del docRef proveniente de firebase
		expect(docRef.data().title).toBe(note.title);
	});

	test('startUpLoading debe de actualizar el url del entry', async () => {
		const file = [];
		await store.dispatch(startUpLoading(file));

		// get() retorna el doc con las propieades
		const docRef = await db
			.doc(
				'/[Testing uid] rj893jr23rj239r/journal/notes/ZVVtoKe2AGUIglvgWygJ'
			)
			.get();

		// data() retorna las propieades del docRef proveniente de firebase
		expect(docRef.data().url).toBe(
			'https://this-represents-an-url.com/photo.png'
		);
	});
});
