<script lang="ts">
	import BoardView from './BoardView.svelte'
	import * as Y from 'yjs'
	import { WebsocketProvider } from 'y-websocket'
	import { onMount } from 'svelte'

	const doc = new Y.Doc()

	onMount(() => {
		const websocketProvider = new WebsocketProvider(
			'ws://localhost:1234',
			'test-room',
			doc
		)

		websocketProvider.on('status', (event: any) => {
			console.log(event.status) // logs "connected" or "disconnected"
		})
	})

	const yarray = doc.getArray('my-array')
	yarray.observe((event) => {
		console.log('yarray was modified')
	})

	function insert(event: any) {
		// every time a local or remote client modifies yarray, the observer is called
		yarray.insert(0, ['val']) // => "yarray was modified"
	}
</script>

<svelte:head>
	<title>Stickies</title>
	<meta name="description" content="Sticky note board" />
</svelte:head>

<BoardView />

<button on:click={insert}>Insert</button>

<style>
</style>
