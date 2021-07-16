import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';

// nos permite agregar la configuracion de Redux Tools dev
// y el middleware. Se crea un metodo que recibira applyMiddleware(thunk)
// para poder manejar middleware
const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// combineReducers() recibe un objeto con todos los reducers a implementar
// esto porque createStore unicamente recibe un reducer y para poder agregar
// mas se debe enviar un objeto de combineReducers
const reducers = combineReducers({
	auth: authReducer,
});

// createStore() recibe los reducers de la aplicacion y el segundo argumento
// es para agregar Redux Dev tools y middleware

// crea la primer parte del ciclo de vida de Redux, es decir, la creacion de
// la store-state. Este objeto sera importado en el punto mas alto de la aplicacion
// para que todos los componentes puedan acceder a su informacion
export const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(thunk))
);
