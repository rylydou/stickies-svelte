<script lang="ts">
	import { contrast } from '$lib/contrast'
	import { colord } from 'colord'

	export let color = colord('#f0f')
</script>

<button
	on:click
	class="font-bold border border-1 border-black/10"
	style="background-color: {color.toHex()}; color: {contrast(color).toHex()};"
	{...$$restProps}
>
	<slot>Label</slot>
</button>
