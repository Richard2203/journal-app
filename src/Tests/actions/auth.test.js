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
	login,
	logout,
	startLoginEmailPassword,
	startLogout,
} from '../../action/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: { uid: '[Testing uid] rj893jr23rj239r' },
	notes: {
		active: { id: 'ZVVtoKe2AGUIglvgWygJ', title: 'hola', body: 'mudo' },
	},
};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);

describe('Pruebas en el action: auth', () => {
	// Para poder realizar pruebas en redux store se emplean mocks
	//      npm install redux-mock-store --save-dev

	// store ira almacenando todos los getActions() disparados, para evitar esto
	// se emplea beforeEch()
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('deben funcionar el login y logout', () => {
		const log = {
			type: types.login,
			payload: { uid: '4567', name: 'juancho' },
		};

		expect(log).toMatchObject(login(log.payload.uid, log.payload.name));
		expect({ type: types.logout }).toMatchObject(logout());
	});

	test('debe realizar el startLogout', async () => {
		await store.dispatch(startLogout());

		const actions = store.getActions();
		expect(actions[0].type).toBe(types.logout);
		expect(actions[1].type).toBe(types.notesLogoutCleaning);
	});

	// si esta prueba da error es porque el metodo startLoginEmailPassword no
	// retorna el objeteo firebase y por lo cual no es posible acceder a los
	// dispatch dentro del objeto
	test('debe de iniciar el startLoginEmailPassword', async () => {
		await store.dispatch(
			startLoginEmailPassword('test@testing.com', '1234567890')
		);

		const actions = store.getActions();

		expect(actions[0]).toEqual({ type: types.uiStartLoading });

		expect(actions[1]).toMatchObject({
			type: types.login,
			payload: { uid: '1zGbSwmiemM16ncg55KMh6sMl9k2', name: null },
		});

		expect(actions[2]).toEqual({ type: types.uiFinishLoading });
	});
});
