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

import JournalEntry from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../action/notes';

jest.mock('../../../action/notes', () => ({
	activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

// mocksStore recibe objetos para establecer el store; en este caso
// el store contiene el objeto: auth
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el componente <JournalEntry/>', () => {
	const note = {
		id: '12345678',
		date: '12345678',
		title: 'titulo cualquiera',
		body: 'cuerpo cualquiera',
		url: 'https://www.pagina.com',
	};

	const wrapper = mount(
		<Provider store={store}>
			<MemoryRouter>
				<JournalEntry {...note} />
			</MemoryRouter>
		</Provider>
	);

	test('debe renderizar correctamente el componente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe disparar el metodo activeNote', () => {
		wrapper.find('.journal__entry').prop('onClick')();

		// evaluando el llamado del dispatch del store
		expect(store.dispatch).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith(
			activeNote(note.id, { ...note })
		);

		// evaluando el llmado de activeNote
		expect(activeNote).toHaveBeenCalled();
		expect(activeNote).toHaveBeenCalledWith(note.id, { ...note });
	});
});
