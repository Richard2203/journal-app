import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../action/notes';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

const NotesScreen = () => {
	const dispatch = useDispatch();

	const { active: note } = useSelector((state) => state.notes);

	// useForm maneja un unico estado y es por eso que aun cuando le mandamos
	// un nuevo "note" este no modificara su estado original; para modificarlo
	// debemos emplear un metodo similar a handleInputChange que modifique todo
	// el estado
	const [formValues, handleInput, reset] = useForm(note);
	const { body, title } = formValues;

	// useRef permite almacenar una variable mutable que no redibujara al
	// componente si su valor cambia
	// useRef apuntara a note.id, de tal modo que
	const activeId = useRef(note.id);

	// si el Id de la nota activa obtenida del selector es diferente de  activeId
	// del useRef entonces resetea el form por la nueva nota
	useEffect(() => {
		if (note.id !== activeId.current) {
			reset(note);
			// la nota vieja pasa a tener el id de la nota nueva
			activeId.current = note.id;
		}
	}, [note, reset]);

	useEffect(() => {
		dispatch(activeNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);

	return (
		<div className="notes__main-content">
			<NotesAppBar />

			<div className="notes__content">
				{note.url && (
					<div className="notes__images">
						<img
							src="https://images.alphacoders.com/111/thumb-1920-1114657.jpg"
							alt="Demon Slayer"
						/>
					</div>
				)}

				<div className="form">
					<div className="form-control">
						<input
							type="text"
							id="title"
							name="title"
							className="form-control__input"
							autoComplete="off"
							placeholder=" "
							value={title}
							onChange={handleInput}
						/>
						<label htmlFor="title" className="form-control__label">
							Some Awesome title
						</label>
					</div>

					<div className="form-control">
						<textarea
							id="body"
							name="body"
							className="form-control__area"
							style={{ height: '10rem' }}
							placeholder=" "
							value={body}
							onChange={handleInput}
						></textarea>

						<label
							htmlFor="body"
							className="form-control__label-area"
						>
							what happened today?
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotesScreen;
