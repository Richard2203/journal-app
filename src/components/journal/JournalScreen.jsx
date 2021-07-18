import React from 'react';
import SideBar from './SideBar';
import NothingSelected from './NothingSelected';
import NotesScreen from '../notes/NotesScreen';
import { useSelector } from 'react-redux';

const JournalScreen = () => {
	const { active } = useSelector((state) => state.notes);
	return (
		<div className="journal__main-content">
			<SideBar />

			<main style={{ flex: '1 1 auto' }}>
				{active ? <NotesScreen /> : <NothingSelected />}
			</main>
		</div>
	);
};

export default JournalScreen;
