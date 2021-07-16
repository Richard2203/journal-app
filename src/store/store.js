import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';

// combineReducers() recibe un objeto con todos los reducers a implementar
// esto porque createStore unicamente recibe un reducer y para poder agregar
// mas se debe enviar un objeto de combineReducers
const reducers = combineReducers({
	auth: authReducer,
});

// createStore() recibe los reducers de la aplicacion y el segundo argumento
// es para mostrar la herramienta Redux en el navegador
// crea la primer parte del ciclo de vida de Redux, es decir, la creacion de
// la store-state. Este objeto sera importado en el punto mas alto de la aplicacion
// para que todos los componentes puedan acceder a su informacion
export const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
