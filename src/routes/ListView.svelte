<script lang="ts">
	import type { DocData, StickyData, ID, WrappedID } from '$lib/doc'

	import { dndzone, type DndEvent } from 'svelte-dnd-action'
	import StickyView from './StickyView.svelte'
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition'

	export let doc: DocData
	export let list_id: ID

	$: list_data = doc.lists_by_id[list_id]
	$: sticky_ids = list_data.sticky_uuids

	let todo_title_entry = ''
	function insert() {
		const id = doc.next_id++

		if (todo_title_entry.trim().length == 0) {
			todo_title_entry = 'New sticky #' + id
		}

		const sticky: StickyData = {
			id: id,
			title: todo_title_entry,
			parts: [],
		}

		doc.stickies_by_id[id] = sticky
		list_data.sticky_uuids.push({ id })

		todo_title_entry = ''
	}

	function handle_consider(e: CustomEvent<DndEvent<WrappedID>>) {
		console.log('consider: ', e.detail.info, e.detail.items)
		handleSort(e)
	}

	function handle_finalize(e: CustomEvent<DndEvent<WrappedID>>) {
		console.log('final: ', e.detail.info, e.detail.items)
		handleSort(e)
	}

	function handleSort(e: CustomEvent<DndEvent<WrappedID>>) {
		sticky_ids = e.detail.items
	}
</script>

<div
	class="bg-gray-200 w-80 max-h-full flex-shrink-0 flex flex-col gap-2 rounded"
	title="id: {list_data.id}"
>
	<div class="flex flex-row gap-2 px-2 pt-2">
		<input class="font-bold flat" type="text" bind:value={list_data.title} />
	</div>
	<div
		class="px-2 flex flex-col gap-2 overflow-y-auto"
		use:dndzone={{ items: sticky_ids, dragDisabled: true }}
		on:consider={handle_consider}
		on:finalize={handle_finalize}
	>
		{#each sticky_ids as { id } (id)}
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
