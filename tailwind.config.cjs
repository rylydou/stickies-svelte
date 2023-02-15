/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: colors.sky
			}
		},
	},
	plugins: [
		// require('@tailwindcss/forms')({ strategy: 'base' }),
	],
}
