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
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import AppRouter from '../../routers/AppRouter';
import { login } from '../../action/auth';
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/firebase-config';

jest.mock('../../action/auth', () => ({
	login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: { msgError: null, loading: false },
	notes: { active: { id: 'abc' }, notes: [] },
};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el componente <AppRouter/>', () => {
	test('Debe renderizar correctamente el componente', async () => {
		let user;

		// haremos autenticacion de usuario asi que debemos emplear funcion async
		// y como act se volvera async entonces debemos colocar "await"
		await act(async () => {
			// realizando autenticacion de usuario. No lo emplearemos explicitamente
			// sin embargo, el componente hara uso de la autenticacion
			const userCreden = await firebase
				.auth()
				.signInWithEmailAndPassword('test@testing.com', '1234567890');

			user = userCreden.user;

			// - Debido a que AppRouter emplea Redux debemos pasarle la creacion
			//   de los stores mediante Provider y su propieadad store
			// - Debido a que se emplea la etiqueta Link se deben pasar las referencias
			//   a este componente mediante MemoryRouter, el cual hara de simulador de esta
			//   funcion
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(login).toHaveBeenCalled();
	});
});
