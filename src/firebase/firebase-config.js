import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// este objeto es proveido por google firebase
const firebaseConfig = {
	apiKey: 'AIzaSyBwwcjxZaKhF0emoi6TOQ2WNJpKZXOc_lw',
	authDomain: 'journal-app-5d467.firebaseapp.com',
	projectId: 'journal-app-5d467',
	storageBucket: 'journal-app-5d467.appspot.com',
	messagingSenderId: '715365077289',
	appId: '1:715365077289:web:77014e6a7f7699e2032738',
	measurementId: 'G-P0JYGRDKVE',
};

const firebaseConfigTesting = {
	apiKey: 'AIzaSyACPvxrcJSiefmMxJVIfnRj-zPize0XKXM',
	authDomain: 'journal-app-testing-d9c71.firebaseapp.com',
	projectId: 'journal-app-testing-d9c71',
	storageBucket: 'journal-app-testing-d9c71.appspot.com',
	messagingSenderId: '461872047946',
	appId: '1:461872047946:web:8070da142ffe5f67c8c3b3',
};

// tenemos dos BD puesto que una se emplea para desarrollo y finalmente producion
// mientras que la otra se emplea para pruebas
if (process.env.NODE_ENV === 'development')
	firebase.initializeApp(firebaseConfig);
else if (process.env.NODE_ENV === 'test')
	firebase.initializeApp(firebaseConfigTesting);

// firebase.firestore() retorna un bd de firebase firestore
const db = firebase.firestore();

// creando una instancia de firebase para menajar autenticacion con google.
// Para autenticar con otros proveedores es lo mismo
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
