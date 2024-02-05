import {useState} from 'react';
import MenuMobile from './MenuMobile';
export default function XButton() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				className=' flex-col justify-center items-center flex'
				onClick={handleClick}
			>
				<span
					className={`bg-primary dark:bg-primaryLight block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${
						isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
					}`}
				></span>
				<span
					className={`bg-primary dark:bg-primaryLight block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
						isOpen ? 'opacity-0' : 'opacity-100'
					} `}
				></span>
				<span
					className={`bg-primary dark:bg-primaryLight block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
						isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
					} `}
				></span>
			</button>
			<MenuMobile
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
}
