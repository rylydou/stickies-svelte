<script lang="ts">
	import type { DocData, StickyData } from '$lib/doc'
	import { new_id } from '$lib/id'
	import { doc_store } from '$lib/stores/board_state'
	import { SyncedText } from '@syncedstore/core'

	import StickyView from './StickyView.svelte'

	export let list_id: string

	$: doc = $doc_store.doc as DocData

	$: list_data = doc.lists[list_id]
	$: sticky_ids = list_data.stickies

	let todo_title_entry = ''
	function insert() {
		const id = new_id()

		if (todo_title_entry.trim().length == 0) {
			todo_title_entry = 'New sticky'
		}

		const sticky: StickyData = {
			id,
			title: todo_title_entry,
			description: new SyncedText(''),
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
		{#each sticky_ids as sticky_id (sticky_id)}
			{#if sticky_id}
				<!-- <div class="sticky">
					{doc_data.stickies_by_id[id].title}
				</div> -->
				<StickyView {sticky_id} />
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
