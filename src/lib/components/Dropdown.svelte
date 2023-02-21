<script lang="ts">
	import type { Placement } from '@popperjs/core'
	import { setContext } from 'svelte'
	import Popper from './Popper.svelte'
	export let open = false
	export let placement: Placement = 'bottom'
	export let trigger: 'hover' | 'click' = 'click'
	export let arrow = false

	setContext('menu-context', closeMenu)

	function closeMenu() {
		open = false
	}
</script>

<Popper
	activeContent
	{placement}
	{trigger}
	{arrow}
	{...$$restProps}
	on:show
	bind:open
>
	<slot />
</Popper>
