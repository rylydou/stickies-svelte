<script lang="ts">
	import { contrast_color } from '$lib/contrast'

	export let color = '#ff00ff'
</script>

<button
	on:click
	class="font-bold"
	style="background-color: {color}; color: {contrast_color(color)};"
	{...$$restProps}
>
	<slot>Label</slot>
</button>
