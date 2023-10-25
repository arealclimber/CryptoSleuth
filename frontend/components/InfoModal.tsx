import React, {useState} from 'react';

interface IInfoModal {
	visible: boolean;
	btnClickHandler: () => void;
}

const InfoModal = ({visible, btnClickHandler}: IInfoModal) => {
	return (
		<>
			{visible && (
				<div className="fixed inset-0 z-90 flex bg-[#3C3C3C]/80 h-auto w-full items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
					<div className="relative">
						{' '}
						<div
							id=""
							className="relative flex h-auto min-h-[40rem] w-full flex-col rounded-[1.875rem] border-0 shadow-lg shadow-black/80 outline-none focus:outline-none"
						>
							<div className="flex items-start justify-between">
								<div className="flex justify-center items-center">
									<div className="text-base w-[56.375rem] h-[40rem] rounded-[1.875rem] bg-white p-[4.5rem]">
										<div className="mb-5">
											<div className="flex flex-col space-y-5">
												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">FROM</p>
													<p className="text-gray-50">
														0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5
													</p>
												</div>
												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">TO</p>
													<p className="text-gray-50">
														0xcdbf58a9a9b54a2c43800c50c7192946de858321
													</p>
												</div>
												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">TRANSACTION HASH</p>
													<p className="text-gray-50">
														0x6b1b6b1336fe2417adf2890a85f25e1956170242a87db95a7271d2c59ca7f716
													</p>
												</div>
											</div>
										</div>

										<div className="border-b border-gray"></div>

										<div className="my-5">
											<div className="flex flex-col space-y-5">
												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">STATUS</p>
													<div className="text-[#4CCAAC] flex space-x-2 justify-center items-center">
														<p className="">Success</p>
														<span className="">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="17"
																height="17"
																viewBox="0 0 17 17"
																fill="none"
															>
																<path
																	d="M6 9.125L7.875 11L11 6.625M16 8.5C16 9.48491 15.806 10.4602 15.4291 11.3701C15.0522 12.2801 14.4997 13.1069 13.8033 13.8033C13.1069 14.4997 12.2801 15.0522 11.3701 15.4291C10.4602 15.806 9.48491 16 8.5 16C7.51509 16 6.53982 15.806 5.62987 15.4291C4.71993 15.0522 3.89314 14.4997 3.1967 13.8033C2.50026 13.1069 1.94781 12.2801 1.5709 11.3701C1.19399 10.4602 1 9.48491 1 8.5C1 6.51088 1.79018 4.60322 3.1967 3.1967C4.60322 1.79018 6.51088 1 8.5 1C10.4891 1 12.3968 1.79018 13.8033 3.1967C15.2098 4.60322 16 6.51088 16 8.5Z"
																	stroke="#4CCAAC"
																	strokeWidth="1.5"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														</span>
													</div>
												</div>
												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">TIMESTAMP</p>
													<div className="flex space-x-2 text-gray-50">
														<p className="">18 hrs 13 mins ago</p>
														<p className="text-gray-10">
															(Aug-22-2023 06:43:47 AM +UTC)
														</p>
													</div>
												</div>
											</div>
										</div>

										<div className="border-b border-gray"></div>

										<div className="my-5">
											<div className="flex flex-col space-y-5">
												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">VALUE</p>
													<div className="flex space-x-2 text-gray-50">
														<p className="">0.102583805214228931 ETH</p>
														<p className="text-gray-10">($176.09)</p>
													</div>
												</div>

												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">TRANSACTION FEE</p>
													<div className="flex space-x-2 text-gray-50">
														<p className="">0.000398446962882116 ETH</p>
														<p className="text-gray-10">($0.68)</p>
													</div>
												</div>

												<div className="flex space-x-[2rem]">
													<p className="w-[9.6875rem]">GAS PRICE</p>
													<div className="flex space-x-2 text-gray-50">
														<p className="">18.020304956 Gwei</p>
														<p className="text-gray-10">
															(0.000000018020304956 ETH)
														</p>
													</div>
												</div>
											</div>
										</div>

										<div className="mt-[4rem]">
											<button
												onClick={btnClickHandler}
												className="font-bold text-2xl text-blue-350 border-[3px] border-blue-250 rounded-[0.9375rem] px-5 py-2 w-full hover:text-white hover:bg-blue-250 transition-all duration-200"
											>
												Close
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default InfoModal;
