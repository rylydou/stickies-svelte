<script lang="ts">
	import { contrast_color as contrast } from '$lib/contrast'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { createEventDispatcher } from 'svelte'
	import Button from './Button.svelte'
	import * as Icons from '@steeze-ui/heroicons'

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

	let custom = false
	let custom_color_raw = 'ff00ff'
	const regex = /^([A-Fa-f0-9]{6})$/
	$: custom_color =
		'#' +
		(regex.test(custom_color_raw) ? custom_color_raw.toLowerCase() : 'ffffff')
</script>

{#if custom}
	<div class="p-2 flex flex-col gap-2">
		<span class="flex items-center gap-1 font-bold">
			<Button on:click={() => (custom = false)}>
				<Icon src={Icons.ChevronLeft} size="20px" theme="mini" />
			</Button>
			Custom color
		</span>
		<span class="flex items-center gap-2 font-bold">
			#<input
				autofocus
				type="text"
				style="background-color: {custom_color}; color: {contrast(
					custom_color
				)};"
				bind:value={custom_color_raw}
				on:keypress={(e) => {
					if (e.code == 'Enter') dispatch('pick', custom_color)
				}}
				placeholder="Enter the code of a color..."
			/>
		</span>
	</div>
{:else}
	<div class="p-2 gap-2 grid grid-cols-6">
		{#each presets as preset}
			<Button
				class="w-8 h-8 hover:ring hover:ring-current"
				style="background-color: {preset};"
				on:click={() => dispatch('pick', preset)}
			/>
		{/each}

		<Button class="justify-center p-0 w-8 h-8" on:click={() => (custom = true)}>
			<Icon src={Icons.EllipsisHorizontal} size="20px" theme="mini" />
		</Button>
	</div>
{/if}
