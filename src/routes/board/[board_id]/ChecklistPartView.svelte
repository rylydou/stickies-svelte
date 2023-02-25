<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte'
	import type { ChecklistPart } from '$lib/doc'
	import Icon from '$lib/components/Icon.svelte'
	import * as Icons from '@steeze-ui/heroicons'
	import Button from '$lib/components/Button.svelte'
	import { fade, slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	export let part: ChecklistPart

	var new_item_entry = ''
	function add_item() {
		let value = new_item_entry
		new_item_entry = ''
		if (value.trim().length == 0) {
			value = 'Task ' + (part.items.length + 1)
		}
		part.items.push({ title: value, completed: false })
	}

	var hide_completed = false
</script>

<div>
	<div class="sticky top-4 bg-gray-200 py-2 z-10">
		<div class="flex flex-row gap-2 items-center pb-1">
			<Icon src={Icons.ListBullet} big class="flex-shrink-0" />

			<input class="flat font-bold" type="text" bind:value={part.title} />

			<label class="flex flex-row flex-none gap-2 items-center">
				<input class="switch" type="checkbox" bind:checked={hide_completed} />
				<span>Hide completed</span>
			</label>
		</div>

		<ProgressBar
			value={part.items.filter((item) => item.completed).length}
			max={part.items.length}
		/>
	</div>

	<ul class="flex flex-col gap-2 pt-2">
		{#each part.items as item, index (index)}
			{#if !hide_completed || !item.completed}
				<li
					class="flex flex-row gap-2 items-center"
					out:fade={{ delay: 500, duration: 100 }}
				>
					<input type="checkbox" bind:checked={item.completed} />
					<input
						class="flat"
						class:opacity-25={item.completed}
						class:line-through={item.completed}
						disabled={item.completed}
						type="text"
						bind:value={item.title}
					/></li
				>
			{/if}
		{/each}
	</ul>

	<input
		type="text"
		class="flat prompt mt-2"
		placeholder="New task..."
		bind:value={new_item_entry}
		on:keypress={(e) => {
			if (e.code == 'Enter') add_item()
		}}
	/>
</div>
