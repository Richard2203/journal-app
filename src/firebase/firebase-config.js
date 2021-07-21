import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// este objeto y sus valores es proveido por google firebase
// los valores fueron llevados a variables de entorno para mas seguridad
// si el proyecto se ejecuta en Test tomara los valores de .env.test sino tomara
// los valores de .env.development
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// inicializando la BD
firebase.initializeApp(firebaseConfig);

// firebase.firestore() retorna un bd de firebase firestore
const db = firebase.firestore();

// creando una instancia de firebase para menajar autenticacion con google.
// Para autenticar con otros proveedores es lo mismo
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
