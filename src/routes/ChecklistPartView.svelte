<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte'
	import type { ChecklistPart } from '$lib/doc'

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
</script>

<div>
	<div class="flex flex-row gap-2 items-center pb-1">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
			/>
		</svg>

		<input class="flat font-bold" type="text" bind:value={part.title} />
	</div>

	<ProgressBar
		value={part.items.filter((item) => item.completed).length}
		max={part.items.length}
	/>

	<ul class="flex flex-col gap-1 pt-1">
		{#each part.items as item}
			<li class="flex flex-row gap-2 items-center">
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
