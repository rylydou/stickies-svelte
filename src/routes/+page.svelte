<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import type { DocData, ListData } from '$lib/doc'
	import { getYjsValue } from '@syncedstore/core'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { onMount } from 'svelte'
	import { listen } from 'svelte/internal'
	import { WebsocketProvider } from 'y-websocket'
	import type { Doc } from 'yjs'
	import ListView from './ListView.svelte'
	import { doc_store, websocket_provider } from './store'

	let store = svelteSyncedStore(doc_store)

	$: doc = $store.doc as DocData
	$: lists = doc.lists_order

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

	function init_doc() {
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

<div
	class="flex flex-col bg-[#d29034] h-screen w-screen overflow-hidden text-sm"
>
	<div class="flex flex-row p-2 gap-2 border-b border-white/25">
		{#if websocket_provider?.wsconnecting}
			<Button>Connecting...</Button>
		{:else if websocket_provider?.wsconnected}
			<Button on:click={websocket_provider.disconnect}>Disconnect</Button>
		{:else}
			<Button on:click={websocket_provider.connect}>Connect</Button>
		{/if}

		<Button on:click={init_doc}>New Document</Button>
	</div>

	<div
		class="w-full h-full flex flex-row items-start gap-2 p-2 overflow-y-hidden overflow-x-scroll text-white"
	>
		{#if lists}
			{#each lists as list (list.id)}
				<ListView doc_data={doc} list_id={list.id} />
			{/each}

			<input
				class="bg-transparent placeholder:text-white p-2 rounded text-black focus:outline focus:outline-primary-400 focus:bg-white focus:placeholder:text-gray-400 font-bold"
				type="text"
				placeholder="Add a new list..."
				bind:value={list_title_entry}
				on:submit={insert}
				on:keypress={(e) => {
					if (e.code == 'Enter') insert()
				}}
			/>
		{:else}
			~Uninitialized~
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(html) {
		@apply select-none;
	}

	:global(::selection) {
		@apply bg-primary-300;
	}
</style>
