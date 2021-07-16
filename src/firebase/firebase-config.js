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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// retorna un bd de firebase firestore
const db = firebase.firestore();

// creando una instancia de firebase para menajar autenticacion con google.
// Para autenticar con otros proveedores es lo mismo
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
