import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../action/notes';

const NotesAppBar = () => {
	const dispatch = useDispatch();

	const { active: note } = useSelector((state) => state.notes);

	const handleSave = () => {
		dispatch(startSaveNote(note));
	};

	return (
		<div className="notes__appbar">
			<span>28 de noviembre del 2050</span>
			<div>
				<button className="btn cursor">Picture</button>
				<button className="btn cursor" onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};

export default NotesAppBar;
