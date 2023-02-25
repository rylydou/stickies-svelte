<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import type { DocData, ListData } from '$lib/doc'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import ListView from './ListView.svelte'
	import { selected_sticky } from './state'
	import { doc_store, websocket_provider } from './store'
	import StickyEditor from './StickyEditor.svelte'
	import Dropdown from '$lib/components/Dropdown.svelte'
	import ColorPicker from '$lib/components/ColorPicker.svelte'
	import Dialog from '$lib/components/Dialog.svelte'
	import DropdownItem from '$lib/components/DropdownItem.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import * as Icons from '@steeze-ui/heroicons'

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
			stickies: [],
		}
		doc.lists[id] = list
		doc.lists_order.push(id)

		list_title_entry = ''
	}

	function init_doc() {
		console.log('init doc')

		doc.title = 'Untitled Document'

		doc.lists = {}
		doc.lists_order = []

		doc.stickies = {}
		doc.labels = {}

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
	class="flex flex-col bg-[#0079bf] h-screen w-screen overflow-hidden text-sm text-gray-900"
>
	<div class="flex flex-row items-center p-2 gap-1 bg-white z-10">
		<Button class="font-bold bg-primary-500">
			<Icon src={Icons.AdjustmentsHorizontal} /> Stickies
		</Button>
		<Dropdown placement="bottom-start">
			<div role="group">
				{#if ws_connecting}
					<DropdownItem disabled={true}>Connecting to websocket...</DropdownItem
					>
				{:else if ws_connected}
					<DropdownItem on:click={(e) => websocket_provider.disconnect()}>
						Disconnect from websocket
					</DropdownItem>
				{:else}
					<DropdownItem on:click={(e) => websocket_provider.connect()}>
						Connect via websocket
					</DropdownItem>
				{/if}
			</div>
			<div role="group">
				<DropdownItem
					on:click={() => {
						navigator.clipboard.writeText(JSON.stringify(doc, null, '\t'))
					}}>Copy JSON</DropdownItem
				>
				<DropdownItem
					on:click={() => {
						navigator.clipboard.readText().then((str) => {
							const obj = JSON.parse(str)
							if (obj) {
								doc = obj
							}
						})
					}}>Paste JSON</DropdownItem
				>
				<Button>Test Color & Submenu</Button>
				<Dropdown trigger="click" placement="right-start">
					<ColorPicker />
				</Dropdown>
			</div>
			<div role="group">
				<Button>Delete Board...</Button>
				<Dropdown placement="right">
					<div role="group">
						<DropdownItem on:click={init_doc}>Are you sure?</DropdownItem>
					</div>
				</Dropdown>
			</div>
		</Dropdown>

		<Button>
			<Icon src={Icons.MagnifyingGlass} /> Search
		</Button>
		<Button>
			<Icon src={Icons.BarsArrowDown} /> Sort
		</Button>
		<Button>
			<Icon src={Icons.Clock} /> History
		</Button>
		<Button>
			<Icon src={Icons.Trash} /> Trash
		</Button>
		<div class="flex-grow" />
		<Button>
			<Icon src={Icons.ArrowUpOnSquare} /> Share
		</Button>
	</div>

	<div
		class="w-full h-full flex flex-row items-start gap-2 p-2 overflow-y-hidden overflow-x-auto"
		bind:this={scroll_view}
		on:wheel|passive={scroll}
	>
		{#if lists}
			{#each lists as list_id (list_id)}
				<ListView {doc} {list_id} />
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
