import {Menu, Transition} from '@headlessui/react';
import {Fragment, useEffect, useRef, useState} from 'react';

interface IDropdown {
	title: string;
	items: string[];
}

export default function Dropdown({title, items}: IDropdown) {
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(title);

	const selectItemHandler = (item: string) => {
		setSelectedItem(item);
	};

	const btnClickHandler = () => {
		setOpen(!open);
	};

	return (
		<div className="text-right">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button
						onClick={btnClickHandler}
						className={`${
							open ? `ring-white ring-2` : ``
						} hover:opacity-90 inline-flex justify-between px-5 items-center text-center rounded-xl bg-white/50 bg-opacity-20 w-[220px] py-2 text-xl text-white hover:bg-opacity-30`}
					>
						<p> {selectedItem}</p>
						<div className="" aria-hidden="true">
							{/* 點了之後旋轉 */}
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="10"
								fill="none"
								viewBox="0 0 16 10"
								className={`transform transition-transform duration-300 ${
									open ? `-rotate-180` : ``
								}`}
							>
								<path fill="#fff" d="M16 .765l-8 8.47-8-8.47"></path>
							</svg> */}

							{/* 點了之後換一個 svg */}

							{!open ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="10"
									fill="none"
									viewBox="0 0 16 10"
								>
									<path fill="#fff" d="M16 .765l-8 8.47-8-8.47"></path>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="10"
									fill="none"
									viewBox="0 0 16 10"
								>
									<path fill="#fff" d="M0 9.235l8-8.47 8 8.47"></path>
								</svg>
							)}
						</div>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="text-base mt-2 w-[220px] origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<Menu.Item>
							{({active}) => (
								<div
									className={`bg-gray-250 text-black group flex w-full items-center justify-between pl-6 rounded-t-xl px-2 py-2 `}
								>
									{/* {active ? (
											<EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<EditInactiveIcon
												className="mr-2 h-5 w-5"
												aria-hidden="true"
											/>
										)} */}
									None
								</div>
							)}
						</Menu.Item>

						<div className="px-1 py-1" onClick={btnClickHandler}>
							{items.map((item, index) => (
								<Menu.Item key={index}>
									{({active}) => (
										<button
											onClick={() => setSelectedItem(item)}
											className={`${
												active ? 'bg-gray-250' : 'text-gray-750 bg-white'
											} group flex w-full items-center justify-between pl-5 rounded-xl px-2 py-2`}
										>
											{item}
										</button>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}

function EditInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 13V16H7L16 7L13 4L4 13Z"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
		</svg>
	);
}

function EditActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 13V16H7L16 7L13 4L4 13Z"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
		</svg>
	);
}

function DuplicateInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4 4H12V12H4V4Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 8H16V16H8V8Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function DuplicateActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4 4H12V12H4V4Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 8H16V16H8V8Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}

function ArchiveInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="8"
				width="10"
				height="8"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<rect
				x="4"
				y="4"
				width="12"
				height="4"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function ArchiveActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="8"
				width="10"
				height="8"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<rect
				x="4"
				y="4"
				width="12"
				height="4"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function MoveInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function MoveActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}

function DeleteInactiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="6"
				width="10"
				height="10"
				fill="#EDE9FE"
				stroke="#A78BFA"
				strokeWidth="2"
			/>
			<path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function DeleteActiveIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="5"
				y="6"
				width="10"
				height="10"
				fill="#8B5CF6"
				stroke="#C4B5FD"
				strokeWidth="2"
			/>
			<path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}
