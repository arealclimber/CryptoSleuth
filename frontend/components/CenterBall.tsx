import React from 'react';

const CenterBall = () => {
	return (
		<div>
			{/* <div className="centerBall w-[10rem] h-[10rem]">
				0xCD531Ae9EFCCE479654c4926dec5F6209531Ca7b
			</div> */}
			<div className="flex items-center justify-center h-screen">
				<div className="flex items-center justify-center w-[36rem] h-[36rem] ring-2 ring-blue-50 rounded-full">
					<div className="flex items-center justify-center centerBall rounded-full w-[35rem] h-[35rem]">
						{/* sth */}
						<div className="flex items-center justify-center">
							<span className="flex items-center justify-center shadow-innerCustom bg-white rounded-full w-[28rem] h-[28rem] z-10">
								0xCD531Ae9EFCCE479654c4926dec5F6209531Ca7b
							</span>
						</div>
					</div>
				</div>
			</div>

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
