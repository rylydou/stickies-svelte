<script lang="ts">
	import type { DocData, ListData } from '$lib/doc'
	import { selected_sticky } from '$lib/stores/board_state'
	import { getYjsValue, syncedStore } from '@syncedstore/core'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { IndexeddbPersistence } from 'y-indexeddb'
	import { WebsocketProvider } from 'y-websocket'
	import type { Doc as YDoc } from 'yjs'
	import ListView from './ListView.svelte'
	import Menubar from './Menubar.svelte'
	import StickyEditor from './StickyEditor.svelte'

	export let data: { doc_id: string }

	const synced_doc_store = syncedStore({
		doc: {} as DocData,
	})
	const doc_store = svelteSyncedStore(synced_doc_store)
	const y_doc = getYjsValue(synced_doc_store) as YDoc

	const indexdb_provider = new IndexeddbPersistence(data.doc_id, y_doc)
	setContext('y_indexdb_persistance', indexdb_provider)

	const websocket_provider = new WebsocketProvider(
		'ws://localhost:1234',
		data.doc_id,
		y_doc,
		{ connect: false }
	)
	websocket_provider.on('status', (e: any) => {
		console.log('websocket-sync', e.status)
	})
	setContext('y_websocket_provider', websocket_provider)

	$: doc = $doc_store.doc as DocData
	$: lists = doc.lists_order

	setContext('doc', $doc_store.doc as DocData)
	setContext('doc_store', synced_doc_store)

	let list_title_entry = ''
	function insert() {
		if (list_title_entry.trim().length == 0) {
			list_title_entry = 'New list'
		}

		const id = doc.next_id++
		const list: ListData = {
			id: id,
			title: list_title_entry,
			stickies: [],
		}
		doc.lists[id] = list
		doc.lists_order.push(id)

		list_title_entry = ''
	}

	var scroll_view: HTMLDivElement

	function scroll(e: WheelEvent) {
		if (e.target != scroll_view) return
		scroll_view.scrollLeft += e.deltaY
	}
</script>

<svelte:head>
	<title>Stickies</title>
	<meta name="description" content="Sticky note board" />
</svelte:head>

<div
	class="flex flex-col bg-[#0079bf] h-screen w-screen overflow-hidden text-sm text-gray-900"
>
	<Menubar />

	<div
		class="w-full h-full flex flex-row items-start gap-2 p-2 overflow-y-hidden overflow-x-auto"
		bind:this={scroll_view}
		on:wheel|passive={scroll}
	>
		{#if lists}
			{#each lists as list_id (list_id)}
				<ListView {list_id} />
			{/each}

			<input
				type="text"
				class="bg-gray-200 max-w-36"
				placeholder="Add a new list..."
				bind:value={list_title_entry}
				on:keypress={(e) => {
					if (e.code == 'Enter') insert()
				}}
			/>
		{:else}
			<div class="w-full h-full grid place-items-center text-2xl font-bold">
				~Uninitialized~
			</div>
		{/if}
	</div>
</div>

{#if $selected_sticky != 0}
	<StickyEditor />
{/if}

<style lang="postcss">
	:global(html) {
		user-select: none;
	}
</style>
