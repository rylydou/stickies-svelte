const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
			serif: ['"Roboto Slab"', ...defaultTheme.fontFamily.serif],
			mono: ['"Fira Mono"', ...defaultTheme.fontFamily.mono],
		},
		extend: {
			colors: {
				primary: colors.amber,
			},
		},
	},
	plugins: [],
}
