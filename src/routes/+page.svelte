<script lang="ts">
	import type { DocData, ListData } from '$lib/doc'
	import { getYjsValue } from '@syncedstore/core'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { onMount } from 'svelte'
	import { listen } from 'svelte/internal'
	import { WebsocketProvider } from 'y-websocket'
	import type { Doc } from 'yjs'
	import ListView from './ListView.svelte'
	import { globalStore } from './store'

	let store = svelteSyncedStore(globalStore)

	$: doc = $store.doc as DocData
	$: lists = doc.lists_order

	onMount(() => {
		try_init_doc()
		// let wsp = new WebsocketProvider(
		// 	'ws://localhost:1234',
		// 	'test_room',
		// 	getYjsValue(globalStore) as Doc
		// )
		// wsp.on('status', (event: any) => {
		// 	const status: string = event.status
		// 	console.log('yjs websocket:', status) // logs "connected" or "disconnected"
		// 	if (status === 'connected') {
		// 		try_init_doc()
		// 	}
		// })
	})

	let list_title_entry = ''
	function insert() {
		console.log(`adding ${list_title_entry} list`)

		const id = doc.next_id++
		const list: ListData = {
			id: id,
			title: list_title_entry,
			sticky_uuids: [],
		}
		doc.lists_by_id[id] = list
		doc.lists_order.push({ id })

		list_title_entry = ''
	}

	function clear() {
		lists.pop()
	}

	function try_init_doc() {
		if (doc.lists_by_id) {
			// console.info('ignore init doc')
			return
		}

		console.log('init doc')

		doc.title = 'Untitled Document'

		doc.lists_by_id = {}
		doc.lists_order = []

		doc.stickies_by_id = {}

		doc.next_id = 1
	}
</script>

<svelte:head>
	<title>Stickies</title>
	<meta name="description" content="Sticky note board" />
</svelte:head>

<div class="flex flex-row bg-gray-500 h-screen w-screen overflow-hidden">
	<div
		class="max-w-full flex flex-row items-start gap-2 p-2 overflow-y-hidden overflow-x-scroll"
	>
		{#if lists}
			{#each lists as list (list.id)}
				<ListView doc_data={doc} list_id={list.id} />
			{/each}
		{:else}
			~~Document is not initialized~~
		{/if}

		<input
			class="bg-transparent placeholder:text-white p-2 rounded focus:outline focus:outline-primary-400 focus:bg-white focus:placeholder:text-gray-400"
			type="text"
			placeholder="Add a new list..."
			bind:value={list_title_entry}
			on:submit={insert}
			on:keypress={(e) => {
				if (e.code == 'Enter') insert()
			}}
		/>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		@apply select-none selection:bg-red-500 selection:text-white;
	}
</style>
