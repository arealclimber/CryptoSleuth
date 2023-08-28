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
			padding: {
				// DEFAULT: '1rem',
				// sm: '2rem',
				// lg: '4rem',
				// xl: '5rem',
				// '2xl': '6rem',
			},
		},
		padding: {
			DEFAULT: '1rem',
			sm: '2rem',
			lg: '4rem',
			xl: '5rem',
			'2xl': '6rem',
		},
		spacing: {},
		extend: {
			boxShadow: {
				'innerCustom': '0px 0px 20px 0px rgba(0, 0, 0, 0.15) inset',
			},
			ringColor: {},
			backgroundImage: theme => ({
				'gradientRadial':
					'linear-gradient(230deg, #4fa7ec 0%, #fcfeff 49.48%, #8fe3cf 100%)',
			}),
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
					50: '#979797',
				},
				blue: {
					DEFAULT: '#89bdf5',
					50: '#BDDFF8',
				},
			},
		},
	},
	plugins: [],
	// darkMode: 'class',
};
