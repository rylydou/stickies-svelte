<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import ColorPicker from '$lib/components/ColorPicker.svelte'
	import Dropdown from '$lib/components/Dropdown.svelte'
	import DropdownItem from '$lib/components/DropdownItem.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import type { DocData } from '$lib/doc'
	import { doc_store } from '$lib/stores/board_state'
	import * as Icons from '@steeze-ui/heroicons'
	import { getContext } from 'svelte'
	import type { WebsocketProvider } from 'y-websocket'

	const doc = doc_store.doc as DocData

	const y_websocket_provider = getContext<WebsocketProvider>(
		'y_websocket_provider'
	)

	let ws_connected = false
	let ws_connecting = false

	y_websocket_provider.on('status', (e: any) => {
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

	function init_doc() {
		console.log('init doc')

		doc.title = 'Untitled Document'

		doc.lists = {}
		doc.lists_order = []

		doc.stickies = {}
		doc.labels = {}

		doc.next_id = 1
	}
</script>

<div class="flex flex-row items-center p-2 gap-1 bg-white z-10">
	<Button class="font-bold bg-primary-500">
		<Icon src={Icons.AdjustmentsHorizontal} /> Stickies
	</Button>
	<Dropdown placement="bottom-start">
		<div role="group">
			{#if ws_connecting}
				<DropdownItem disabled={true}>Connecting to websocket...</DropdownItem>
			{:else if ws_connected}
				<DropdownItem on:click={(e) => y_websocket_provider.disconnect()}>
					Disconnect from websocket
				</DropdownItem>
			{:else}
				<DropdownItem on:click={(e) => y_websocket_provider.connect()}>
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
