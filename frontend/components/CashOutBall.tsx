import React, {useState} from 'react';

interface ICashOutBall {
	w: string;
	h: string;
	title: string;
	content: string;
	remark: string;
}

const CashOutBall = ({w, h, title, content, remark}: ICashOutBall) => {
	// TODO: 把 w-[] h-[] 改成 props
	const [hovered, setHovered] = useState(false);

	const handleMouseOver = () => {
		setHovered(true);
	};

	const handleMouseOut = () => {
		setHovered(false);
	};

	return (
		<div className={``}>
			{/* bg-gradient-to-tl from-[#BDDFF8] via-[#e1f0fb] to-[#fff]  */}
			<div
				className={`${w} ${h} rounded-full ${
					hovered
						? `cashOutBallHoverBg cursor-pointer shadow-cashBallHover`
						: `bg-white shadow-cashOutBlue`
				} transition-all duration-300 flex justify-center items-center`}
				onMouseEnter={handleMouseOver}
				onMouseLeave={handleMouseOut}
			>
				<div
					className={`w-[19.25rem] h-[19.25rem] rounded-full ${
						hovered ? `` : `border-2`
					} border-blue-350 flex justify-center items-center`}
				>
					<div
						className={`w-[17.875rem] h-[17.875rem] rounded-full ${
							hovered ? `` : `border-2`
						} border-blue-250 flex justify-center items-center`}
					>
						<div
							className={`w-[16.84375rem] h-[16.84375rem] rounded-full ${
								hovered ? `` : `border-2`
							} border-blue-150 flex justify-center items-center`}
						>
							<div
								className={`w-[16.15625rem] h-[16.15625rem] rounded-full ${
									hovered ? `` : `border-2`
								} border-blue-50 flex flex-col justify-center items-center`}
							>
								<p className="">{title}</p>
								<p className="">{content}</p>
								<p className="">{remark}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CashOutBall;
