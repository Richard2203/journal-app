import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [Value, setValue] = useState(initialState);

	const reset = () => {
		setValue(Value);
	};

	const handleInput = ({ target }) => {
		setValue({
			...Value,
			[target.name]: target.value,
		});
	};
	return [Value, handleInput, reset];
};
