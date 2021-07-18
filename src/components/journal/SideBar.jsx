import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JournalEntries from './JournalEntries';
import { startLogout } from '../../action/auth';

const SideBar = () => {
	const dispatch = useDispatch();
	const { name } = useSelector((state) => state.auth);
	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<aside className="journal__sidebar">
			<div className="journal__sidebar-navbar">
				<h3 className="mt-5">
					<div className="icon moon">
						<svg
							id="iconMoon"
							viewBox="-5 -8 457 461.04455"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="m224.023438 448.03125c85.714843.902344 164.011718-48.488281 200.117187-126.230469-22.722656 9.914063-47.332031 14.769531-72.117187 14.230469-97.15625-.109375-175.890626-78.84375-176-176 .972656-65.71875 37.234374-125.832031 94.910156-157.351562-15.554688-1.980469-31.230469-2.867188-46.910156-2.648438-123.714844 0-224.0000005 100.289062-224.0000005 224 0 123.714844 100.2851565 224 224.0000005 224zm0 0" />
						</svg>
					</div>
					<span>{name}</span>
				</h3>
				<button className="btn cursor" onClick={handleLogout}>
					Logout
				</button>
			</div>

			<div className="journal__new-entry">
				<div className="icon calendar">
					<svg
						id="iconCalendar"
						viewBox="-5 0 521.001 512.001"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g>
							<path d="m15.001 421h75v45c0 8.284 6.716 15 15 15h392c8.284 0 15-6.716 15-15v-390c0-8.284-6.716-15-15-15h-75v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-76v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-75v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-76c-8.284 0-15 6.716-15 15v90c0 110.55-45.945 195.596-84.603 228.477-4.852 4.043-6.651 10.691-4.502 16.63 2.151 5.938 7.789 9.893 14.105 9.893zm467 30h-362v-30h287c3.509 0 6.907-1.23 9.603-3.477 18.032-15.019 45.963-50.777 65.397-96.575zm-362-360h61v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h75v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h76v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h60v60h-362zm-.257 89.99h361.991c-3.38 95.155-39.901 170.023-80.616 210.01h-351.999c46.133-58.781 68.149-135.318 70.624-210.01z" />
						</g>
					</svg>
				</div>
				<p className="mt-1">New Entry</p>
			</div>

			<JournalEntries />
		</aside>
	);
};

export default SideBar;
