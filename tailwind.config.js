/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dark: '#1b1b1b',
				light: '#f5f5f5',
				primary: '#c29739',
				primaryLight: '#eabf36',
				primaryDark: '#efdc97',
				secondary: '#fffad6',
			},
		},
	},
	plugins: [],
};
