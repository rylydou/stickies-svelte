<script lang="ts">
	import { contrast_color } from '$lib/contrast'
	import { createEventDispatcher } from 'svelte'
	import Button from './Button.svelte'

	const presets = [
		'#ef4444',
		'#f97316',
		'#f59e0b',
		'#eab308',
		'#84cc16',
		'#22c55e',
		'#10b981',
		'#14b8a6',
		'#06b6d4',
		'#0ea5e9',
		'#3b82f6',
		'#6366f1',
		'#8b5cf6',
		'#a855f7',
		'#d946ef',
		'#ec4899',
		'#f43f5e',
		'#bfa094',
		'#f8fafc',
		'#cbd5e1',
		'#64748b',
		'#334155',
		'#0f172a',
	]

	const dispatch = createEventDispatcher<{ pick: string }>()
</script>

<div class="p-2 gap-2 flex flex-row flex-wrap">
	{#each presets as preset}
		<Button
			class="w-8 h-8"
			style="background-color: {preset};"
			on:click={() => dispatch('pick', preset)}
		/>
	{/each}
</div>
