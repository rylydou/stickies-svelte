const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
// const flattenColorPalette = require('tailwindcss/util/flattenColorPalette')

const generateColors = (e, colors, prefix) =>
	Object.keys(colors).reduce((acc, key) => {
		if (typeof colors[key] === 'string') {
			return {
				...acc,
				[`${prefix}-${e(key)}`]: {
					'--ex-fg': colors[key],
				},
			}
		}

		const innerColors = generateColors(e, colors[key], `${prefix}-${e(key)}`)

		return {
			...acc,
			...innerColors,
		}
	}, {})

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
				primary: colors.sky,
				fg: 'rgb(var(--ex-fg) / <alpha-value>)',
			},
		},
	},
	plugins: [
		plugin.withOptions(({ className = 'fg' } = {}) => {
			return ({ e, addUtilities, theme, variants }) => {
				const colors = theme('colors')
				const fgColors = generateColors(e, colors, `.${className}`)
				addUtilities(fgColors, variants('fgColors'))
			}
		})
	],
}
