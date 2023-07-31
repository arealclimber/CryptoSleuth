import {useState} from 'react';

interface IBallProps {
	changed: boolean;
	changeTo: string;
	clickHandler: () => void;
	locate: string;
	size?: string;
	style?: string;
}

const Ball = ({
	changed,
	clickHandler,
	locate,
	changeTo,
	size,
	style,
}: IBallProps) => {
	return (
		// <div
		// 	className={`w-20 h-20 rounded-full bg-white ${locate} ${move ? moveTo : ''}`}
		// >
		<div
			className={`${style} ${locate} ${
				changed ? `${changeTo} bg-blue` : 'bg-gray'
			} ${
				size ? size : `w-44 h-44`
			} rounded-full opacity-100 cursor-pointer duration-500 shadow-2xl`}
			onClick={clickHandler}
		/>
		// </div>
	);
};

export default Ball;
