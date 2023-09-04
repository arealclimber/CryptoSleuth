import React, {useState} from 'react';

interface ICashInBall {
	w: string;
	h: string;
	title: string;
	content: string;
	remark: string;
}

const CashInBall = ({w, h, title, content, remark}: ICashInBall) => {
	// const w = 'w-[36rem]';
	// const h = 'h-[36rem]';
	const [hoveredBall, setHoveredBall] = useState(false);
	const [hoveredMagnifier, setHoveredMagnifier] = useState(false);
	const [hoveredEye, setHoveredEye] = useState(false);

	const handleMouseOver = () => {
		setHoveredBall(true);
	};

	const handleMouseOut = () => {
		setHoveredBall(false);
	};

	const handleMouseOverMagnifier = () => {
		setHoveredMagnifier(true);
	};

	const handleMouseOutMagnifier = () => {
		setHoveredMagnifier(false);
	};

	const handleMouseOverEye = () => {
		setHoveredEye(true);
	};

	const handleMouseOutEye = () => {
		setHoveredEye(false);
	};

	const handler = {
		mouseOnBall: handleMouseOver,
		mouseOutBall: handleMouseOut,
		mouseOnMagnifier: handleMouseOverMagnifier,
		mouseOutMagnifier: handleMouseOutMagnifier,
		mouseOnEye: handleMouseOverEye,
		mouseOutEye: handleMouseOutEye,
	};

	return (
		<div className={``}>
			{/* 用 TailwindCSS 自定義寫出陰影 */}
			<div
				className={`${w} ${h} ${
					hoveredBall
						? `cashInBallHoverBg cursor-pointer shadow-cashBallHover`
						: `bg-white shadow-cashInGreen`
				} rounded-full flex flex-col justify-center items-center`}
				onMouseEnter={handler.mouseOnBall}
				onMouseLeave={handler.mouseOutBall}
			>
				{hoveredBall ? (
					<div className="flex justify-center items-center space-x-5">
						{' '}
						<div
							onMouseEnter={handler.mouseOnEye}
							onMouseLeave={handler.mouseOutEye}
							className={`${
								hoveredEye ? `bg-[#4CCAAC]` : ``
							} flex justify-center items-center w-[56px] h-[56px] rounded-full border-2 border-[#4CCAAC]`}
						>
							<div className="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
								>
									<path
										d="M2.71452 16.4293C2.6225 16.1528 2.6225 15.8539 2.71452 15.5773C4.56385 10.0133 9.81319 6 15.9999 6C22.1839 6 27.4305 10.0093 29.2839 15.5707C29.3772 15.8467 29.3772 16.1453 29.2839 16.4227C27.4359 21.9867 22.1865 26 15.9999 26C9.81585 26 4.56785 21.9907 2.71452 16.4293Z"
										stroke={`${hoveredEye ? `#fff` : `#4CCAAC`}`}
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20C14.9391 20 13.9217 19.5786 13.1716 18.8284C12.4214 18.0783 12 17.0609 12 16C12 14.9391 12.4214 13.9217 13.1716 13.1716C13.9217 12.4214 14.9391 12 16 12C17.0609 12 18.0783 12.4214 18.8284 13.1716C19.5786 13.9217 20 14.9391 20 16Z"
										stroke={`${hoveredEye ? `#fff` : `#4CCAAC`}`}
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div
							onMouseEnter={handler.mouseOnMagnifier}
							onMouseLeave={handler.mouseOutMagnifier}
							className={`${
								hoveredMagnifier ? `bg-[#4CCAAC]` : ``
							} flex justify-center items-center w-[56px] h-[56px] rounded-full border-2 border-[#4CCAAC]`}
						>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
								>
									<path
										d="M28.0001 27.9999L21.0707 21.0706M21.0707 21.0706C22.9462 19.1952 23.9998 16.6515 23.9998 13.9993C23.9998 11.347 22.9462 8.80338 21.0707 6.92794C19.1953 5.05251 16.6517 3.9989 13.9994 3.9989C11.3471 3.9989 8.8035 5.05251 6.92807 6.92794C5.05263 8.80338 3.99902 11.347 3.99902 13.9993C3.99902 16.6515 5.05263 19.1952 6.92807 21.0706C8.8035 22.946 11.3471 23.9997 13.9994 23.9997C16.6517 23.9997 19.1953 22.946 21.0707 21.0706Z"
										stroke={`${hoveredMagnifier ? `#fff` : `#4CCAAC`}`}
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				) : (
					<div>
						<p className="">{content}</p>
						<p className="">{remark}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CashInBall;
