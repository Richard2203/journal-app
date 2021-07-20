import { types } from '../../types/types';

describe('Pruebas en el objeto types', () => {
	test('Los objetos deben coincidir', () => {
		const expectTypes = {
			login: '[Auth] Login',
			logout: '[Auth] Logout',

			uiSetError: '[UI] ErrorFormValues',
			uiRemoveError: '[UI] ErrorRemoveFormValues',

			uiStartLoading: '[UI] Start Loading',
			uiFinishLoading: '[UI] Finish Loading',

			notesAddNew: '[Notes] New Note',
			notesActive: '[Notes] Set Active note',
			notesLoad: '[Notes] Load Notes',
			notesUpdated: '[Notes] Updated Note',
			notesFileUrl: '[Notes] Updated Image Url',
			notesDelete: '[Notes] Delete Note',
			notesLogoutCleaning: '[Notes] Logout Cleaning',
		};

		expect(expectTypes).toEqual(types);
	});
});
