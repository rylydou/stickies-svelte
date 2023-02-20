<script lang="ts">
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import Popper from './Popper.svelte'
	export let open = false
	$: {
		// set default values
		$$restProps.arrow = $$restProps.arrow ?? false
		$$restProps.trigger = $$restProps.trigger ?? 'click'
		$$restProps.placement = $$restProps.placement ?? 'bottom-end'
	}

	setContext('menu-context', closeMenu)

	function closeMenu() {
		open = false
	}
</script>

<Popper activeContent {...$$restProps} on:show bind:open>
	<slot />
</Popper>
