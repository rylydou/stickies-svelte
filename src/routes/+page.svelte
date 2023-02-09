<script lang="ts">
	import { getYjsValue } from '@syncedstore/core'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { onMount } from 'svelte'
	import { WebsocketProvider } from 'y-websocket'
	import type { Doc } from 'yjs'
	import { globalStore } from './store'

	var store = svelteSyncedStore(globalStore)

	$: stickies = $store.todos

	var new_todo = ''
	function insert() {
		stickies.push({ title: new_todo, completed: false })
		new_todo = ''
	}

	onMount(() => {
		let wsp = new WebsocketProvider(
			'ws://localhost:1234',
			'test_room',
			getYjsValue(globalStore) as Doc
		)

		wsp.on('status', (event: any) => {
			console.log(event.status) // logs "connected" or "disconnected"
		})
	})
</script>

<svelte:head>
	<title>Stickies</title>
	<meta name="description" content="Sticky note board" />
</svelte:head>

{#each stickies as sticky, i}
	<div class="sticky">
		<input type="checkbox" bind:checked={sticky.completed} />
		<input type="text" bind:value={sticky.title} />
	</div>
{/each}
<hr />
<input
	type="text"
	bind:value={new_todo}
	on:keypress={(e) => {
		if (e.code == 'Enter') {
			insert()
		}
	}}
/>
<button on:click={insert}>Insert</button>

<style>
	.sticky {
		display: flex;
	}
</style>
