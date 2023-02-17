<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import type { DocData, ListData } from '$lib/doc'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { fly, scale } from 'svelte/transition'
	import { cubicIn, backOut, sineOut, cubicOut } from 'svelte/easing'
	import ListView from './ListView.svelte'
	import { selected_sticky } from './state_store'
	import { doc_store, websocket_provider } from './store'
	import { clickOutside } from '$lib/directives/click_outside'
	import StickyEditor from './StickyEditor.svelte'

	let store = svelteSyncedStore(doc_store)

	$: doc = $store.doc as DocData
	$: lists = doc.lists_order

	let list_title_entry = ''
	function insert() {
		if (list_title_entry.trim().length == 0) {
			list_title_entry = 'New list'
		}

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

	var scroll_view: HTMLDivElement

	function scroll(e: WheelEvent) {
		if (e.target != scroll_view) return
		scroll_view.scrollLeft += e.deltaY
	}

	let ws_connected = false
	let ws_connecting = false

	websocket_provider.on('status', (e: any) => {
		if (e.status == 'connecting') {
			ws_connecting = true
			return
		}
		if (e.status == 'connected') {
			ws_connecting = false
			ws_connected = true
			return
		}
		ws_connecting = false
		ws_connected = false
	})
</script>

<svelte:head>
	<title>Stickies</title>
	<meta name="description" content="Sticky note board" />
</svelte:head>

<div
	class="flex flex-col bg-[#0079bf] h-screen w-screen overflow-hidden text-sm text-gray-900 font-serif"
>
	<div class="flex flex-row items-center p-2 gap-2 bg-white">
		<Button class="flat" on:click={init_doc}>New Document</Button>
		<Button class="flat">Config</Button>

		<div class="flex-grow" />

		{#if ws_connecting}
			<Button class="flat" disabled={true}>Connecting...</Button>
		{:else if ws_connected}
			<Button class="flat" on:click={(e) => websocket_provider.disconnect()}
				>Disconnect</Button
			>
		{:else}
			<Button class="flat" on:click={(e) => websocket_provider.connect()}
				>Connect</Button
			>
		{/if}
	</div>

	<div
		class="w-full h-full flex flex-row items-start gap-2 p-2 overflow-y-hidden overflow-x-auto"
		bind:this={scroll_view}
		on:wheel|passive={scroll}
	>
		{#if lists}
			{#each lists as list (list.id)}
				<ListView {doc} list_id={list.id} />
			{/each}

			<input
				type="text"
				class="bg-gray-200 max-w-36"
				placeholder="Add a new list..."
				bind:value={list_title_entry}
				on:submit={insert}
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
		@apply select-none;
	}

	:global(::selection) {
		@apply bg-primary-300;
	}
</style>
