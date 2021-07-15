import React from 'react';
import SideBar from './SideBar';
import NothingSelected from './NothingSelected';

const JournalScreen = () => {
	return (
		<div className="journal__main-content">
			<SideBar />

			<main className="nothing__main-content">
				<NothingSelected />
			</main>
		</div>
	);
};

export default JournalScreen;
