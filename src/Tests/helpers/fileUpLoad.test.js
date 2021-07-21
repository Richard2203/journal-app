// el SDK de cloudinary nos ofrece funciones y procesos adicionales,
// entre ellos el borrado de imagenes. Para poder usarlo se debe de instalar
// la siguiente dependecia; se emplea "--sav-dev" para indicar que es dependencia
// de desarrollo
//      npm install cloudinary --save-dev
// DOCUMENTACION EN NODE:
//      https://cloudinary.com/documentation/node_integration
import cloudinary from 'cloudinary';

import { fileUpLoad } from '../../helpers/fileUpLoad';

// los valores salen de la pagina de Cloudinary en la seccion de Dashboard
cloudinary.config({
	cloud_name: 'djrygievc',
	api_key: '123917899154161',
	api_secret: 'jadGdhXIBg3GMEXBF3tXwhIILRA',
	secure: true,
});

describe('Pruebas en el helper fileUpLoad', () => {
	test('debe de cargar un archivo y retornar el URL', async () => {
		// algunas imagenes retornaran error de cross origin debido a que
		// tiene bloqueada la peticion de servidores localhost
		const resp = await fetch(
			'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
		);

		// un bojeto Blob representa un objeto de tipo fichero de datos
		// planos inmutables, en este caso la peticion fetch la transforma
		// a datos Blob
		const blob = await resp.blob();

		// creando una nueva instancia del archivo File con nombre "rem.png"
		// de este modo podemos manipular la imagen como un objeto
		// y pasarla como argumento a fileUpLoad
		const file = new File([blob], 'Rem.png');

		const url = await fileUpLoad(file);

		expect(typeof url).toBe('string');

		// obteniendo el ID de la imagen
		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.png', '');

		// Borrado de la imagen
		//  -primer argumento es un arreglo con los ids de las imagenes a borrar
		//  -segundo argumento debe ser {} en este caso
		//  -el tercer argumento es una funcion a ejecutar al finalizar el proceso

		cloudinary.v2.api.delete_resources([imageId], {}, () => {});
	});

	test('debe retornar null como error', async () => {
		const file = new File([], 'Rem.png');

		const url = await fileUpLoad(file);

		expect(url).toBe(null);
	});
});
