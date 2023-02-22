<script lang="ts">
	import { contrast } from '$lib/contrast'
	import Icon from '$lib/components/Icon.svelte'
	import { createEventDispatcher } from 'svelte'
	import Button from './Button.svelte'
	import * as Icons from '@steeze-ui/heroicons'
	import { Colord, colord, extend } from 'colord'
	import namesPlugin from 'colord/plugins/names'
	extend([namesPlugin])

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
		'#f1f5f9',
		'#cbd5e1',
		'#64748b',
		'#334155',
		'#0f172a',
	]

	const dispatch = createEventDispatcher<{ pick: Colord }>()

	let custom = false
	let custom_input = ''
	$: custom_color = colord(custom_input).alpha(1)
</script>

{#if custom}
	<div class="p-2 flex flex-col gap-2">
		<span class="flex items-center gap-1 font-bold">
			<Button on:click={() => (custom = false)}>
				<Icon src={Icons.ChevronLeft} />
			</Button>
			Custom color
		</span>
		<input
			autofocus
			type="text"
			style="background-color: {custom_color.toHex()}; color: {contrast(
				custom_color
			).toHex()};"
			bind:value={custom_input}
			on:keypress={(e) => {
				if (e.code == 'Enter') dispatch('pick', custom_color)
			}}
			placeholder="Enter a custom color..."
		/>
	</div>
{:else}
	<div class="p-2 gap-2 grid grid-cols-6">
		{#each presets as preset}
			<Button
				class="w-8 h-8 hover:ring hover:ring-current"
				style="background-color: {preset};"
				on:click={() => dispatch('pick', colord(preset))}
			/>
		{/each}

		<Button class="justify-center p-0 w-8 h-8" on:click={() => (custom = true)}>
			<Icon src={Icons.EllipsisHorizontal} />
		</Button>
	</div>
{/if}
