<script lang="ts">
	import type { DocData, StickyData, ID } from '$lib/doc'

	import StickyView from './StickyView.svelte'

	export let doc: DocData
	export let list_id: ID

	$: list_data = doc.lists[list_id]
	$: sticky_ids = list_data.stickies

	let todo_title_entry = ''
	function insert() {
		const id = doc.next_id++

		if (todo_title_entry.trim().length == 0) {
			todo_title_entry = 'New sticky #' + id
		}

		const sticky: StickyData = {
			id: id,
			title: todo_title_entry,
			description: '',
			parts: [],
			labels: [],
		}

		doc.stickies[id] = sticky
		list_data.stickies.push(id)

		todo_title_entry = ''
	}
</script>

<div
	class="bg-gray-200 w-80 max-h-full flex-shrink-0 flex flex-col gap-2 rounded"
	title="id: {list_data.id}"
>
	<div class="flex flex-row gap-2 px-2 pt-2">
		<input class="font-bold flat" type="text" bind:value={list_data.title} />
	</div>
	<div class="px-2 flex flex-col gap-2 overflow-y-auto">
		{#each sticky_ids as id (id)}
			{#if id}
				<!-- <div class="sticky">
					{doc_data.stickies_by_id[id].title}
				</div> -->
				<StickyView {doc} {id} />
			{:else}
				~~Error~~
			{/if}
		{/each}
	</div>

	<div class="flex flex-row px-2 pb-2">
		<input
			type="text"
			class="flat prompt"
			placeholder="Add a new sticky..."
			bind:value={todo_title_entry}
			on:keypress={(e) => {
				if (e.code == 'Enter') insert()
			}}
		/>
	</div>
</div>

<style lang="postcss">
</style>
