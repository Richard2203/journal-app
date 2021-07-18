import React from 'react';
// esta libreria nos permite la manipulacion de fechas
// se instala con el comando
// 	npm install moment --save
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../action/notes';

const JournalEntry = ({ id, date, title, body, url }) => {
	const dateMoment = moment(date);

	const dispatch = useDispatch();

	const handleEntryClick = () => {
		dispatch(activeNote(id, { date, title, body, url }));
	};

	return (
		<div className="journal__entry cursor" onClick={handleEntryClick}>
			{/* en React la etiqueta style se maneja pasando las propieades
            como si de un objeto se tratara */}
			{url && (
				<div
					className="journal__entry-picture"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url(${url})`,
					}}
				></div>
			)}
			<div className="journal__entry-body">
				<p className="journal__entry-title">{title}</p>
				<p className="journal__entry-content">{body}</p>
			</div>

			<div className="journal__entry-date">
				{/* el formato de las fechas se optiene de la documentacion de 
				https://momentjs.com/ */}
				<span>{dateMoment.format('dddd')}</span>
				<h4>{dateMoment.format('Do')}</h4>
			</div>
		</div>
	);
};

export default JournalEntry;
