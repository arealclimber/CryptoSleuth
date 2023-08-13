/**
 * TODO:
 * 0. Layout: Ball, History
 * 1. Scroll bar decoration
 * 2. Call API and render data
 *
 */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
	return (
		<div className="">
			<div className="py-5 px-10 w-[500px]">
				<Link href="/">
					<Image
						className="hover:opacity-80 transition-all duration-300"
						src="/elements/crypto_sleuth.svg"
						alt="logo"
						width={208}
						height={10}
					/>
				</Link>
			</div>
			{/* <div className="">
				<Image
					src="/elements/banner.svg"
					alt="banner"
					width={0}
					height={0}
					sizes="100vw"
					style={{width: '100%', height: 'auto'}}
				/>
			</div> */}

			{/* <div
				style={{
					backgroundImage: `url('/elements/banner.svg')`,
					objectFit: 'contain',
					// backgroundSize: `${WIDTH_OF_SHARING_RECORD}px ${HEIGHT_OF_SHARING_RECORD}px`,
					backgroundPosition: 'relative',
					backgroundRepeat: 'no-repeat',

					display: 'flex',
					// flexDirection: 'column',
					// alignItems: 'flex-start',
					// justifyContent: 'flex-center',
					height: '100vh',
					width: '100vw',

					// height: `${HEIGHT_OF_SHARING_RECORD}px`,
					// width: `${WIDTH_OF_SHARING_RECORD}px`,
				}}
			></div> */}
			<div className="flex flex-col justify-start space-y-6 items-center bg-cover bg-center w-screen h-[400px] bg-[url('/elements/banner.svg')]">
				<div className="text-white text-[40px] fold-bold mt-16">
					Lorem ipsum dolor sit amet consectetur.{' '}
				</div>
				<div className="flex justify-center space-x-10 w-full">
					<input
						placeholder="Search by Address"
						type="text"
						className="text-black text-[20px] tracking-wider px-8 bg-white/50 h-[50px] w-2/3 xl:max-w-[936px] rounded-3xl focus:outline-none placeholder:text-white"
					/>

					<button className="px-10 py-2 border-white border-[3px] bg-transparent rounded-3xl text-[20px] text-white hover:text-black hover:border-black transition-all duration-300">
						Search
					</button>
				</div>
			</div>

			{/* ---Card--- */}
			<div className="flex justify-center mt-12 w-full">
				<div
					className="bg-white rounded-3xl mx-10 p-10 min-h-40 w-4/5 xl:max-w-[1128px] -mt-40"
					style={{boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)'}}
				>
					<div className="text-[32px] font-bold">iven.eth</div>
					<div className="flex space-x-3">
						<div className="">0x18a4489a739ac9835da14e006b35d65040e53a4a</div>
						<div className="">
							<Image
								className="hover:cursor-pointer"
								src="elements/copy_icon.svg"
								alt="icon"
								width={24}
								height={24}
							/>
						</div>
					</div>

					<div className="flex space-x-10 mt-10 w-2/3">
						<div className="">
							<div className="text-gray-600">ETH BALANCE</div>

							<div className="flex space-x-1 mt-2">
								<div className="min-w-[32px]">
									<Image
										className="hover:cursor-pointer"
										src="elements/eth.svg"
										alt="icon"
										width={32}
										height={32}
									/>
								</div>{' '}
								<div className="font-bold text-lg lg:text-2xl">
									3,844.653070438940336094 ETH
								</div>
							</div>
						</div>

						<div className="">
							<div className="text-gray-600">ETH VALUE</div>
							<div className="font-bold text-lg lg:text-2xl mt-2">$7,036,330.26</div>
						</div>
					</div>
				</div>
			</div>

			{/* ---Card--- */}

			{/* <div className='mx-10'></div> */}

			<div className="container w-1/2 lg:w-[1128px] hidden lg:flex justify-start space-x-5 mt-10 flex-nowrap">
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
				<button className="px-10 py-3 bg-gray text-gray-50 rounded-xl">Now</button>
			</div>
			{/* ---Ball Section--- */}
			<div className="container w-2/3 mt-40">
				<button
					className={`bg-white w-[500px] h-[500px] border-2 border-blue text-center flex-col flex items-center justify-center
					} rounded-full opacity-100 cursor-pointer duration-500 shadow-2xl`}
				>
					<div className="">iven.eth</div>
					<div className="">0x18a4489a739ac9835da14e006b35d65040e53a4a</div>
				</button>{' '}
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
			</div>

			{/* ---Ball Section--- */}
			{/* ---History Section--- */}
			<div className=""></div>

			{/* Footer */}
			<div className="bg-gray-700 h-[600px] mt-40"></div>
		</div>
	);
};

export default Home;
