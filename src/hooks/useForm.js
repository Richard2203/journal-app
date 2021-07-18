import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [Value, setValue] = useState(initialState);

	// si no se le envia algo a resetear entonces volvera
	// al estado original
	const reset = (newFormState = initialState) => {
		setValue(newFormState);
	};

	const handleInput = ({ target }) => {
		setValue({
			...Value,
			[target.name]: target.value,
		});
	};
	return [Value, handleInput, reset];
};
