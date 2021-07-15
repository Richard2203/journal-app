import React from 'react';
import NotesAppBar from './NotesAppBar';

const NotesScreen = () => {
	return (
		<div className="notes__main-content">
			<NotesAppBar />

			<div className="notes__content">
				<div className="notes__images">
					<img
						src="https://images.alphacoders.com/111/thumb-1920-1114657.jpg"
						alt="Demon Slayer"
					/>
				</div>

				<div className="form">
					<div className="form-control">
						<input
							type="text"
							placeholder="Some awesome title"
							id="titleAwesome"
							name="titleAwesome"
							className="form-control__input"
							autoComplete="off"
						/>
						<label
							htmlFor="titleAwesome"
							className="form-control__label"
						>
							Some Awesome title
						</label>
					</div>

					<div className="form-control">
						<textarea
							name="historyDescription"
							id="historyDescription"
							style={{ height: '10rem' }}
							className="form-control__area"
							placeholder="what happened today?"
						></textarea>

						<label
							htmlFor="historyDescription"
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
