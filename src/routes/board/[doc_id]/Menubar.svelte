<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import ColorPicker from '$lib/components/ColorPicker.svelte'
	import Dropdown from '$lib/components/Dropdown.svelte'
	import DropdownItem from '$lib/components/DropdownItem.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import { init_doc, type DocData } from '$lib/doc'
	import { doc_store } from '$lib/stores/board_state'
	import * as Icons from '@steeze-ui/heroicons'
	import { getContext } from 'svelte'
	import type { WebsocketProvider } from 'y-websocket'

	$: doc = $doc_store.doc as DocData

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

	const doc_id = getContext('doc_id') as string
</script>

<div class="flex flex-row items-stretch p-1 gap-1 bg-white z-10">
	<Button class="font-bold bg-primary-500">
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4 2C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H13L18 13V4C18 2.89543 17.1046 2 16 2H4ZM4 16V4H16V12H12V16H4Z"
				fill="currentColor"
			/>
			<path d="M6 6V8H14V6H6Z" fill="currentColor" />
			<path d="M6 12V10H10V12H6Z" fill="currentColor" />
		</svg>

		{doc_id}
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
			<DropdownItem
				on:click={() => {
					console.log('init doc')
					init_doc(doc)
				}}>Initialize board</DropdownItem
			>
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
