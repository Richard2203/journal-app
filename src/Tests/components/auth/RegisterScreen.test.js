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
import RegisterScreen from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: { msgError: null, loading: false },
};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);

// - Debido a que LoginScreen emplea Redux debemos pasarle la creacion
//   de los stores mediante Provider y su propieadad store
// - Debido a que se emplea la etiqueta Link se deben pasar las referencias
//   a este componente mediante MemoryRouter, el cual hara de simulador de esta
//   funcion
const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe('Pruebas en el componente RegisterScreen', () => {
	// Para poder realizar pruebas en redux store se emplean mocks
	//      npm install redux-mock-store --save-dev

	test('debe de renderizarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe de ejecutar el dispatch', () => {
		// const inputName = wrapper.find('input[name="name"]');

		// este simulate es para establecer el campo name en valor '', sin embargo
		// por defecto ya tiene ese valor asi que no es necesario
		// inputName.simulate('change', {
		// 	target: {
		// 		value: '',
		// 		name: 'name',
		// 	},
		// });

		wrapper.find('form').simulate('submit', { preventDefault() {} });

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiSetError,
			payload: 'The name can´t null',
		});
	});
});
