import {
	finishLoading,
	removeError,
	setError,
	startLoading,
} from '../../action/ui';
import { types } from '../../types/types';

describe('Pruebs en el action ui', () => {
	test('deben funcionar todas las acciones', () => {
		const error = {
			type: types.uiSetError,
			payload: 'no funciona nada de nada',
		};

		expect(error).toEqual(setError(error.payload));
		expect({ type: types.uiRemoveError }).toEqual(removeError());
		expect({ type: types.uiStartLoading }).toEqual(startLoading());
		expect({ type: types.uiFinishLoading }).toEqual(finishLoading());
	});
});
