import React from 'react';

interface ICenterBall {
	text: string;
}

// TODO: font size
const CenterBall = ({text}: ICenterBall) => {
	// TODO: Dynamically change the ring
	const w = 'w-[36rem]';
	const h = 'h-[36rem]';
	return (
		<div>
			{/* <div className="centerBall w-[10rem] h-[10rem]">
				0xCD531Ae9EFCCE479654c4926dec5F6209531Ca7b
			</div> */}
			{/* 整顆球置中 */}
			{/* <div className="flex items-center justify-center h-screen"> */}
			{/* 藍色的環，留 p-2 可以確保畫面縮小時，環不會內縮變成橢圓環 */}
			<div
				className={`flex items-center justify-center ${w} ${h} ring-[5px] ring-blue-50 rounded-full p-2`}
			>
				{/* 漸層色的環 */}
				<div className="flex items-center justify-center centerBall rounded-full w-[35rem] h-[35rem]">
					<div className="flex items-center justify-center">
						{/* 白色內圓 */}
						<span className="flex items-center justify-center shadow-innerCustom bg-white rounded-full w-[28rem] h-[28rem] z-10">
							{text}
						</span>
					</div>
				</div>
			</div>
			{/* </div> */}

			{/* <div className="flex items-center justify-center h-screen">
				<div className="relative w-[10rem] h-[10rem]">
					<div className="absolute inset-0 ring-4 ring-gradient rounded-full ring-from-blue-400 ring-to-green-400"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span>0xCD531Ae9EFCCE479654c4926dec5F6209531Ca7b</span>
					</div>
				</div>
			</div> */}

			{/* <div className="flex items-center justify-center h-screen">
				<div className="relative w-[10rem] h-[10rem]">
					<div className="absolute inset-0 w-[10rem] h-[10rem] ring-4 ring-gradient rounded-full ring-from-blue-400 ring-to-green-400"></div>
					<div className="absolute inset-0 flex items-center justify-center bg-white m-4 rounded-full">
						<span>0xCD531Ae9EFCCE479654c4926dec5F6209531Ca7b</span>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default CenterBall;
