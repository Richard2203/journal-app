import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	startDeleting,
	startSaveNote,
	startUpLoading,
} from '../../action/notes';

const NotesAppBar = () => {
	const dispatch = useDispatch();
	const refFileInput = useRef(null);
	const { active: note } = useSelector((state) => state.notes);

	const handleSave = () => {
		dispatch(startSaveNote(note));
	};

	const handlePictureClick = () => {
		// usando el hook useRef para hacer referencia a input de tipo
		// "file" y controlarlo en esta funcion
		refFileInput.current.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		file && dispatch(startUpLoading(file));
	};

	const handleDeleteNote = () => {
		dispatch(startDeleting(note.id));
	};

	return (
		<div className="notes__appbar">
			<span>28 de noviembre del 2050</span>
			<div>
				<input
					type="file"
					name="file"
					id="fileImage"
					ref={refFileInput}
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
				<button className="btn cursor" onClick={handleDeleteNote}>
					Borrar Nota
				</button>
				<button className="btn cursor" onClick={handlePictureClick}>
					Picture
				</button>
				<button className="btn cursor" onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};

export default NotesAppBar;
