<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte'
	export let href: string | undefined = undefined
	export let autoclose = true

	const closeMenu = getContext<{ (): void }>('menu-context')

	const dispatch = createEventDispatcher<{ click: MouseEvent }>()
	function click(e: MouseEvent) {
		if (autoclose) {
			closeMenu()
		}
		dispatch('click', e)
	}
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	type={href ? undefined : 'button'}
	{...$$restProps}
	on:click={click}
	on:change
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:mouseenter
	on:mouseleave
>
	<slot />
</svelte:element>
