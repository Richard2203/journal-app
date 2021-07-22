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

import SideBar from '../../../components/journal/SideBar';
import { startLogout } from '../../../action/auth';
import { startNewNote } from '../../../action/notes';

jest.mock('../../../action/auth', () => ({
	startLogout: jest.fn(),
}));

jest.mock('../../../action/notes', () => ({
	startNewNote: jest.fn(),
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

describe('Pruebas en el componente: <SideBar/>', () => {
	const wrapper = mount(
		<Provider store={store}>
			<MemoryRouter>
				<SideBar />
			</MemoryRouter>
		</Provider>
	);

	test('debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe mandar a llamar startNewNote', () => {
		wrapper.find('.journal__new-entry').prop('onClick')();
		expect(startNewNote).toHaveBeenCalled();
	});

	test('debe de mandar a llamar startLogout', () => {
		wrapper.find('#handleLogout').prop('onClick')();
		expect(startLogout).toHaveBeenCalled();
	});
});
