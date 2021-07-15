import React from 'react';

const JournalEntry = () => {
	return (
		<div className="journal__entry cursor">
			{/* en React la etiqueta style se maneja pasando las propieades
            como si de un objeto se tratara */}
			<div
				className="journal__entry-picture"
				style={{
					backgroundSize: 'cover',
					backgroundImage:
						'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaADuQ1v9s3kWzKvKTsqEGVIwc_VqKAIdfew&usqp=CAU)',
				}}
			></div>

			<div className="journal__entry-body">
				<p className="journal__entry-title">a new day</p>
				<p className="journal__entry-content">
					Today read a new big book and very interesting
				</p>
			</div>

			<div className="journal__entry-date">
				<span>Monday</span>
				<h4>24</h4>
			</div>
		</div>
	);
};

export default JournalEntry;
