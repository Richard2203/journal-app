import React from 'react';
import SideBar from './SideBar';
import NothingSelected from './NothingSelected';
import NotesScreen from '../notes/NotesScreen';

const JournalScreen = () => {
	return (
		<div className="journal__main-content">
			<SideBar />

			<main style={{ flex: '1 1 auto' }}>
				{/* <NothingSelected className="nothing__main-content"/> */}
				<NotesScreen />
			</main>
		</div>
	);
};

export default JournalScreen;
