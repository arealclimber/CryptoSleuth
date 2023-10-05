import {Menu, Transition} from '@headlessui/react';
import {Fragment, useEffect, useRef, useState} from 'react';
import useGlobalStore, {SearchType, TimeRange, TimeString} from '../store/basic';

interface IDropdown {
	title: string;
	items: string[];
	getActiveItem: (item: string) => void;
}

export default function Dropdown({title, items, getActiveItem}: IDropdown) {
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(title);

	const [searchType, setSearchType, timeRange, setTimeRange] = useGlobalStore(
		state => [
			state.searchType,
			state.setSearchType,
			state.timeRange,
			state.setTimeRange,
		]
	);

	const selectItemHandler = (item: string) => {
		console.log('item', item);
		setSelectedItem(item);

		getActiveItem(item);

		const timeString = TimeString[item as keyof typeof TimeString];

		if (title.includes('time') && timeString) {
			const timeRange = TimeRange[timeString];
			setTimeRange(timeRange);
		}

		//else if (title.includes('variable')) {
		// 	setSearchType(SearchType[item]);
		// }
	};

	const btnClickHandler = () => {
		setOpen(!open);

		console.log('TimeString', TimeString['1 hour']);
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
						<p>{selectedItem}</p>
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
									None
								</div>
							)}
						</Menu.Item>

						<div className="px-1 py-1" onClick={btnClickHandler}>
							{items.map((item, index) => (
								<Menu.Item key={index}>
									{({active}) => {
										return (
											<button
												onClick={() => selectItemHandler(item)}
												className={`${
													active ? 'bg-gray-250' : 'text-gray-750 bg-white'
												} group flex w-full items-center justify-between pl-5 rounded-xl px-2 py-2`}
											>
												{item}
											</button>
										);
									}}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
