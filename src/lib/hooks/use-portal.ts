export function portal(
	element: HTMLElement,
	target: HTMLElement | null | undefined
) {
	if (target) {
		target.append(element)
	}
	return {
		update(newTarget: HTMLElement) {
			target = newTarget
			newTarget.append(element)
		},
		destroy() {
			// Need to detach ourselves--we can't rely on Svelte always detaching
			// us since we moved in the component tree.
			if (target?.contains(element)) {
				target.removeChild(element)
			}
			if (target && target.childNodes.length <= 0) {
				target.parentElement?.removeChild(target)
			}
		},
	}
}

/*
// adapted from romkor/svelte-portal
import { tick } from 'svelte'
import type { Action } from '../types/action'

type Target = HTMLElement | string

/**
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 *
 * @param target- DOM element or CSS selector to be appended to
 * @see https://svelteui.org/actions/use-portal
 * /
export function portal(node: HTMLElement, target: Target = 'body'): ReturnType<Action> {
	let targetNode
	async function update(newTarget: Target) {
		target = newTarget
		if (typeof target === 'string') {
			targetNode = document.querySelector(target)
			if (targetNode === null) {
				await tick()
				targetNode = document.querySelector(target)
			}
			if (targetNode === null) {
				throw new Error(`No element found matching css selector: "${target}"`)
			}
		} else if (target instanceof HTMLElement) {
			targetNode = target
		} else {
			throw new TypeError(
				`Unknown portal target type: ${target === null ? 'null' : typeof target
				}. Allowed types: string (CSS selector) or HTMLElement.`
			)
		}
		targetNode.appendChild(node)
		node.hidden = false
	}
	function destroy() {
		if (node.parentNode) {
			node.parentNode.removeChild(node)
		}
	}
	update(target)
	return {
		update,
		destroy
	}
}
*/
