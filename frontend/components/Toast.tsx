import React from 'react';

interface IToast {
	visible: boolean;
	btnClickHandler: () => void;
}

const Toast = ({visible, btnClickHandler}: IToast) => {
	return (
		<>
			{visible && (
				<div className="">
					<div className="fixed inset-0 z-40 flex bg-[#3C3C3C]/80 h-auto w-screen items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
						<div className="relative">
							{' '}
							<div
								id=""
								className="container relative mt-[7.7rem] flex w-screen flex-col border-0 outline-none focus:outline-none"
							>
								<div className="bg-[#40BE9E] px-6 py-3 flex rounded-[0.3125rem] items-center justify-between">
									<p className="text-white text-lg">
										The search results are derived from the most recent collection of
										one thousand records
									</p>{' '}
									<button className="" onClick={btnClickHandler}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="19"
											height="20"
											viewBox="0 0 19 20"
											fill="none"
										>
											<path
												d="M17 17.5L2 2.5M17 2.5L2 17.5"
												stroke="white"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Toast;
