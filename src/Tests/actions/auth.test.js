import { login, logout } from '../../action/auth';
import { types } from '../../types/types';

describe('Pruebas en el action: auth', () => {
	test('deben funcionar el login y logout', () => {
		const log = {
			type: types.login,
			payload: { uid: '4567', name: 'juancho' },
		};

		expect(log).toMatchObject(login(log.payload.uid, log.payload.name));
		expect({ type: types.logout }).toMatchObject(logout());
	});
});
