import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en el reducer authReducer', () => {
	test('debe retornar el valor del caso login', () => {
		const person = {
			uid: '12345678',
			name: 'Juancho',
		};

		const action = {
			type: types.login,
			payload: person,
		};

		expect(person).toEqual(authReducer({}, action));
	});

	test('debe retornar el valor de logout', () => {
		const action = {
			type: types.logout,
		};

		expect({}).toEqual(authReducer({}, action));
	});

	test('debe retornar el valor por defecto', () => {
		expect({}).toEqual(authReducer({}, { action: { type: '' } }));
	});
});
