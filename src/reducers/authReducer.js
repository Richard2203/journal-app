import { types } from '../types/types';

// nuestra state siempre debe regresar un objeto, no  puede regresar null,
// boolean o undefined
export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.name,
			};
		case types.logout:
			return {};
		default:
			return state;
	}
};
