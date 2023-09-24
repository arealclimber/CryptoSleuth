/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/tw-elements/dist/js/**/*.js',
	],
	theme: {
		container: {
			center: true,
			margin: {
				DEFAULT: '0',
			},
			padding: {
				DEFAULT: '9.75rem',
				// sm: '156px',
				// md: '156px',
				// lg: '156px',
				// xl: '156px',
				// '2xl': '156px',
			},
			screens: {
				DEFAULT: '100%',
				// 'sm': '100%',
				// 'md': '100%',
				// 'lg': '1024px',
				// 'xl': '1280px',
				// '2xl': '1600px',
			},
			minWidth: {
				DEFAULT: '100%',
				// sm: '640px',
				// md: '768px',
				// lg: '1024px',
				// xl: '1280px',
				// '2xl': '1536px',
			},
			maxWidth: {
				DEFAULT: '100%',
				// sm: '640px',
				// md: '768px',
				// lg: '1024px',
				// xl: '1280px',
				// '2xl': '1536px',
			},
		},
		extend: {
			boxShadow: {
				'innerCustom': '0px 0px 20px 0px rgba(0, 0, 0, 0.15) inset',
				'cashInGreen': '0px 0px 40px 0px #65D6BC',
				'cashOutBlue': '0px 4px 20px 0px #94CBF4',
				'cashBallHover': '0px 4px 25px rgba(0, 0, 0, 0.20)',
			},
			borderRadius: {
				'21xl': '21.875rem',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': {transform: 'rotate(-3deg)'},
					'50%': {transform: 'rotate(3deg)'},
				},
				move: {
					'0%': {transform: 'translateX(-100%)'},
					'100%': {transform: 'translateX(0)'},
					// '0%': {transform: 'translateX(0)'},
					// '100%': {transform: 'translateX(100%)'},
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite',
				move: 'move 2s ease-in-out',
			},
			fontFamily: {
				mPlus: ['M PLUS Rounded 1c', 'sans-serif'],
				barlow: ['Barlow', 'sans-serif', 'ui-sans-serif', 'system-ui'],
				nunito: ['Nunito', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
			colors: {
				primary: {
					DEFAULT: '#87c1ff',
					50: '#218cff',
					500: '#3798E9',
				},
				secondary: {
					DEFAULT: '#FF9800',
					50: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#FF5722',
					50: '#FFFFFF',
				},
				gray: {
					DEFAULT: '#F0F0F0',
					10: '#C2C2C2',
					50: '#979797',
					150: '#E4F2FC',
					250: '#F5F5F5',
					750: '#818181',
					850: '#606060',
				},
				blue: {
					DEFAULT: '#89bdf5',
					50: '#E4F2FC',
					150: '#BDDFF8',
					250: '#94CBF4',
					350: '#6CB6EF',
				},
				green: {
					DEFAULT: '#65D6BC',
				},
			},
		},
	},
	plugins: [],
	// darkMode: 'class',
};
