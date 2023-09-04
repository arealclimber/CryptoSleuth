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
	const [hovered, setHovered] = useState(false);

	const handleMouseOver = () => {
		setHovered(true);
	};

	const handleMouseOut = () => {
		setHovered(false);
	};

	return (
		<div className={``}>
			{/* 用 TailwindCSS 自定義寫出陰影 */}
			<div
				className={`${w} ${h} ${
					hovered
						? `cashInBallHoverBg cursor-pointer shadow-cashBallHover`
						: `bg-white shadow-cashInGreen`
				} rounded-full flex flex-col justify-center items-center`}
				onMouseEnter={handleMouseOver}
				onMouseLeave={handleMouseOut}
			>
				{/* <div className="flex flex-col"> */}
				<p className="">{title}</p>
				<p className="">{content}</p>
				{/* </div> */}
				{/* <div className="flex"> */} <p className="">{remark}</p>
				{/* </div> */}
			</div>
		</div>
	);
};

export default CashInBall;
