import {motion} from 'framer-motion';

const Ball = ({content}: {content: string | number}) => {
	return (
		<motion.div
			className="w-16 h-16 bg-blue-500 rounded-full hover:cursor-pointer flex justify-center items-center"
			whileTap={{scale: 10}}
			animate={{y: ['100%', '-100%', '100%']}}
			transition={{
				duration: 0.6,
				ease: 'easeInOut',
				times: [0, 0.5, 1],
				loop: Infinity,
				repeatDelay: 1,
			}}
		>
			{content}
		</motion.div>
	);
};

export default Ball;
