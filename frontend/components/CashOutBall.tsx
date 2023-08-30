import React from 'react';

interface ICashOutBall {
	w: string;
	h: string;
	title: string;
	content: string;
	remark: string;
}

const CashOutBall = ({w, h, title, content, remark}: ICashOutBall) => {
	// TODO: 把 w-[] h-[] 改成 props
	return (
		<div className={``}>
			<div
				className={`${w} ${h} rounded-full bg-white shadow-cashOutBlue flex justify-center items-center`}
			>
				<div
					className={`w-[19.25rem] h-[19.25rem] rounded-full border-2 border-blue-350 flex justify-center items-center`}
				>
					<div
						className={`w-[17.875rem] h-[17.875rem] rounded-full border-2 border-blue-250 flex justify-center items-center`}
					>
						<div
							className={`w-[16.84375rem] h-[16.84375rem] rounded-full border-2 border-blue-150 flex justify-center items-center`}
						>
							<div
								className={`w-[16.15625rem] h-[16.15625rem] rounded-full border-2 border-blue-50 flex flex-col justify-center items-center`}
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
