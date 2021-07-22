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

import NotesScreen from '../../../components/notes/NotesScreen';
import { activeNote } from '../../../action/notes';

jest.mock('../../../action/notes', () => ({
	activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: { msgError: null, loading: false },
	notes: { active: { id: 'abc', title: 'un titulo' }, notes: [] },
};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el componente <NoteScreen/>', () => {
	const wrapper = mount(
		<Provider store={store}>
			<MemoryRouter>
				<NotesScreen />
			</MemoryRouter>
		</Provider>
	);

	test('debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe de disparar el activeNote con los correspondientes argumentos', () => {
		wrapper.find('input[name="title"]').simulate('change', {
			target: { value: 'nuevo valor', name: 'title' },
		});

		expect(activeNote).toHaveBeenCalled();

		// evalua la ultima vez que haya sido llamada la funcion con los
		// argumentos indicados
		expect(activeNote).toHaveBeenLastCalledWith(initState.notes.active.id, {
			...initState.notes.active,
			title: 'nuevo valor',
		});
	});
});
