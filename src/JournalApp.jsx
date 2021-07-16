import React from 'react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

const JournalApp = () => {
	return (
		// El componente de orden superior "Provider" funciona de manera similar
		// el componente de orden superior que implemente useContext
		// la propieadd "store" recibe el "corazon" que contendra la centralizacion
		// de la informacion
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};

export default JournalApp;
