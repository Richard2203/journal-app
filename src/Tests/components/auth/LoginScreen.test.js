// Instalando la dependencia para poder hacer pruebas mock en store de redux
//  https://www.npmjs.com/package/redux-mock-store
// se añaden las importaciones
//  import configureStore from 'redux-mock-store';
//  const middlewares = [thunk];
//  const mockStore = configureStore(middlewares);
//  const store = mockStore({});

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
//importamos el middleware que usaremos para pruebas
import thunk from 'redux-thunk';
import {
	startGoogleLogin,
	startLoginEmailPassword,
} from '../../../action/auth';

import LoginScreen from '../../../components/auth/LoginScreen';

// retornamos la propiedad startGoogleLogin que fue asignada como una funcion
// de jest
jest.mock('../../../action/auth', () => ({
	startGoogleLogin: jest.fn(),
	startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: { msgError: null, loading: false },
};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);

// le asignamos un jest.fn() a la funcion dispatch para pdoer controlar
// su comportamiento
store.dispatch = jest.fn();

describe('Pruebas en el componente LoginScreen', () => {
	// Para poder realizar pruebas en redux store se emplean mocks
	//      npm install redux-mock-store --save-dev

	// store ira almacenando todos los getActions() disparados, para evitar esto
	// se emplea beforeEch()
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});

	// - Debido a que LoginScreen emplea Redux debemos pasarle la creacion
	//   de los stores mediante Provider y su propieadad store
	// - Debido a que se emplea la etiqueta Link se deben pasar las referencias
	//   a este componente mediante MemoryRouter, el cual hara de simulador de esta
	//   funcion
	const wrapper = mount(
		<Provider store={store}>
			<MemoryRouter>
				<LoginScreen />
			</MemoryRouter>
		</Provider>
	);

	test('Debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe de ejecutar la funcion startGoogleLogin() en el dispatch', () => {
		wrapper.find('.google-btn').prop('onClick')();
		expect(startGoogleLogin).toHaveBeenCalled();
	});

	test('debe de ejecutar la funcion startLoginEmailPassword() en el dispatch', () => {
		wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} });

		expect(startLoginEmailPassword).toHaveBeenCalled();
		expect(startLoginEmailPassword).toHaveBeenCalledWith('', '');
	});
});
