<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import type { DocData, ListData } from '$lib/doc'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { fly, scale } from 'svelte/transition'
	import { cubicIn, backOut, sineOut } from 'svelte/easing'
	import ListView from './ListView.svelte'
	import { selected_sticky } from './state_store'
	import { doc_store, websocket_provider } from './store'

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
	class="flex flex-col bg-[#0079bf] h-screen w-screen overflow-hidden text-sm"
>
	<div class="flex flex-row items-center p-2 gap-2 bg-white">
		<Button on:click={init_doc}>New Document</Button>
		<Button>Config</Button>

		<div class="flex-grow" />

		{#if ws_connecting}
			<Button disabled={true}>Connecting...</Button>
		{:else if ws_connected}
			<Button on:click={(e) => websocket_provider.disconnect()}
				>Disconnect</Button
			>
		{:else}
			<Button on:click={(e) => websocket_provider.connect()}>Connect</Button>
		{/if}
	</div>

	<div
		class="w-full h-full flex flex-row items-start gap-2 p-2 overflow-y-hidden overflow-x-scroll text-white"
		bind:this={scroll_view}
		on:wheel|passive={scroll}
	>
		{#if lists}
			{#each lists as list (list.id)}
				<ListView {doc} list_id={list.id} />
			{/each}

			<input
				type="text"
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
	<div
		class="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[40em] w-1/3 will-change-transform flex flex-col gap-4 p-4 justify-start rounded-lg shadow-2xl ring ring-gray-900 max-h-[90vh] overflow-y-auto"
		in:scale={{ duration: 400, easing: backOut }}
		out:scale={{ duration: 200, easing: cubicIn }}
	>
		<div class="block w-full">
			<span class="font-bold"> Edit Sticky </span>

			<Button
				class="float-right"
				on:click={(e) => {
					$selected_sticky = 0
				}}
			>
				Done
			</Button>

			<span class="text-gray-400 float-right mr-4">id:{$selected_sticky}</span>
		</div>

		<label class="block">
			<span>Title</span>
			<input
				class="mt-1"
				type="text"
				bind:value={doc.stickies_by_id[$selected_sticky].title}
				autofocus
			/>
		</label>

		<label class="block">
			<span>Description</span>
			<textarea class="mt-1" rows="6" />
		</label>

		<label class="block">
			<span>Priority</span>
			<select class="ml-1">
				<option>High</option>
				<option>Medium</option>
				<option>Low</option>
			</select>
		</label>

		<label class="flex flex-row items-center gap-2">
			<input type="radio" name="radio-group" />
			<span>Option 1</span>
		</label>
		<label class="flex flex-row items-center gap-2">
			<input type="radio" name="radio-group" />
			<span>Option 2</span>
		</label>
		<label class="flex flex-row items-center gap-2">
			<input type="radio" name="radio-group" />
			<span>Option 3</span>
		</label>

		<label class="flex flex-row items-center gap-2">
			<input type="checkbox" />
			<span>Receive notifications on updates</span>
		</label>
	</div>
{/if}

<style lang="postcss">
	:global(html) {
		@apply select-none;
	}

	:global(::selection) {
		@apply bg-primary-300;
	}
</style>
