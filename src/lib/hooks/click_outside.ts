import type { ActionReturn } from 'svelte/action'

interface Attributes {
	'on:outclick': (e: CustomEvent<HTMLElement>) => void
}

export function clickOutside(node: HTMLElement): ActionReturn<Attributes> {
	const handleClick = event => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent('outclick', node as any)
			)
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}
