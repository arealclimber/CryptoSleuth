module.exports = {
	extends: ['plugin:tailwindcss/recommended'],
	// 加上 no console log 規則
	rules: {
		'tailwindcss/no-contradicting-classname': 'error',
		'tailwindcss/classnames-order': 'off',
		'tailwindcss/enforces-negative-arbitrary-values': 'error',
		'tailwindcss/enforces-shorthand': 'off',
		'tailwindcss/migration-from-tailwind-2': 'error',
		'tailwindcss/no-arbitrary-value': 'error',
		'tailwindcss/no-custom-classname': 'warn',
	},

	// 整合 prettier 和解決 prettier 衝突問題
	plugins: ['tailwindcss', 'prettier'],
	settings: {
		tailwindcss: {
			// These are the default values but feel free to customize
			callees: ['classnames', 'clsx', 'ctl'],
			config: 'tailwind.config.js',
			cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
			cssFilesRefreshRate: '5_000',
			removeDuplicates: true,
			whitelist: [],
		},
	},
};
