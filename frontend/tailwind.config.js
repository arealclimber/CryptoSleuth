/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/tw-elements/dist/js/**/*.js',
	],
	theme: {
		extend: {
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
					DEFAULT: '#6c7782',
					50: '#FFFFFF',
				},
				blue: {
					DEFAULT: '#89bdf5',
				},
			},
		},
	},
	plugins: [require('tw-elements/dist/plugin')],
	darkMode: 'class',
	safelist: [
		'animate-[fade-in_1s_ease-in-out]',
		'animate-[fade-in-down_1s_ease-in-out]',
	],
};
