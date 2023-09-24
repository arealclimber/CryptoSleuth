import React from 'react';

interface ISidebarItem {
	toggleDrawer: () => void;
	title: string;
	content: string;
	isEarliest: boolean;
	isLastest: boolean;
}

const SidebarItem = ({
	toggleDrawer,
	title,
	content,
	isEarliest,
	isLastest,
}: ISidebarItem) => {
	const circleColor = isLastest ? 'bg-green' : 'bg-blue-150';
	return (
		<>
			{isLastest && (
				<>
					<div className="ml-[2.85rem]">
						<svg
							width="6"
							height="6"
							viewBox="0 0 10 10"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polygon points="5,0 10,10 0,10" fill="#979797" />
						</svg>{' '}
					</div>
				</>
			)}
			{/* dashed vertical line */}
			<div
				className={`ml-12 ${
					isLastest ? `h-3` : `h-10`
				} w-[1px] border-[0.5px] border-dashed border-gray-50`}
			></div>

			<li onClick={toggleDrawer} className="">
				<a
					href="#"
					className="flex items-center px-12 pt-[0.1rem] rounded-lg hover:bg-gray-100"
				>
					{/* dashed vertical line */}
					<div
						className={`relative ${
							isEarliest ? `h-9 mb-5` : `h-16`
						} w-[1px] border-[0.5px] border-dashed border-gray-50`}
					></div>

					{/* draw a filled circle */}
					<div
						className={`absolute left-[3.3rem] w-6 h-6 rounded-full ${circleColor}`}
					></div>

					<span className="ml-[2.5rem] space-y-2">
						<div className="font-bold text-base">{title}</div>
						<div className="text-gray-750 text-xs font-normal leading-5 tracking-normal">
							{content}
						</div>
					</span>
				</a>
			</li>
		</>
	);
};

const Sidebar = () => {
	const [show, setShow] = React.useState(false);

	const toggleDrawer = () => {
		setShow(prev => {
			console.log('!prev', !prev);
			return !prev;
		});
	};

	const title = '0x18a...53a4a';
	const content = '0x18a4489a739ac9835da14e006b35d65040e53a4a';

	return (
		<div>
			{/* drawer button */}
			<div
				className={`fixed right-0 top-1/3 transform transition-transform duration-300 ${
					show ? 'translate-x-[-30.4375rem]' : 'translate-x-0'
				} z-50 `}
			>
				<button
					className="text-white bg-blue-350 transition-all duration-300 font-medium rounded-tl-lg rounded-bl-lg text-base px-[1rem] py-[1.5rem]"
					type="button"
					onClick={toggleDrawer}
					aria-controls="drawer-navigation"
				>
					<p className="[writing-mode:vertical-lr] rotate-180">
						More search history
					</p>
				</button>
			</div>

			{/* <!-- drawer component --> */}
			{show && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-10"
					onClick={toggleDrawer} // Close the drawer when clicking on the background
				></div>
			)}
			<div dir="ltr">
				<div
					id="drawer-navigation"
					className={`fixed top-0 right-0 z-40 w-[30.4375rem] border-s-[0.3rem] border-blue h-screen p-4 overflow-y-auto transition-transform duration-300 bg-white ${
						show ? 'translate-x-0' : ' translate-x-[99.1%]'
					}`}
					aria-labelledby="drawer-navigation-label"
				>
					{/* <h5
						id="drawer-navigation-label"
						className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
					>
						Menu
					</h5> */}

					<div className="py-4 overflow-y-auto">
						<ul className="space-y-0 font-medium">
							<SidebarItem
								title={title}
								content={content}
								toggleDrawer={toggleDrawer}
								isEarliest={false}
								isLastest={true}
							/>
							<SidebarItem
								title={title}
								content={content}
								toggleDrawer={toggleDrawer}
								isEarliest={false}
								isLastest={false}
							/>
							<SidebarItem
								title={title}
								content={content}
								toggleDrawer={toggleDrawer}
								isEarliest={false}
								isLastest={false}
							/>
							<SidebarItem
								title={title}
								content={content}
								toggleDrawer={toggleDrawer}
								isEarliest={true}
								isLastest={false}
							/>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
