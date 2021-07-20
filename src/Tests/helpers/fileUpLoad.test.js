import { fileUpLoad } from '../../helpers/fileUpLoad';

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
	});

	test('debe retornar null como error', async () => {
		const file = new File([], 'Rem.png');

		const url = await fileUpLoad(file);

		expect(url).toBe(null);
	});
});
