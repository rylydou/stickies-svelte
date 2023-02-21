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
			screens: {
				'2md': '864px'
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
				'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
				'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
				'in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
				'in-sine': 'cubic-bezier(0.12, 0, 0.39, 0)',
				'out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
			}
		},
	},
	plugins: [],
}
