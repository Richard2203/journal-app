export const fileUpLoad = async (file) => {
	// url de Cloudinary para subir imagenes
	const cloudUrl = 'https://api.cloudinary.com/v1_1/djrygievc/upload';

	// FormData() nos permite trabajar con argumentos de una url, es decir
	// mediante el metodo append(<nombrePropiedaad:string>,<valor>)
	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		// por defecto fetch hace peticiones GET, para realizar otra peticion
		// se emplea un objeto que recibe el tipo de peticion (method) y el
		// resto de parametros (body)
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		// si la insercion fue correcta retorna la url segura, caso contrario
		// retorna el error
		if (resp.ok) {
			const cloudResp = await resp.json();
			return cloudResp.secure_url;
		} else return null;
	} catch (error) {
		throw error;
	}
};
