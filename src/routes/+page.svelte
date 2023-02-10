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

<div class="doc">
	<div class="list">
		Todo

		{#each stickies as sticky, i}
			<div class="sticky">
				<div
					class="title"
					contenteditable="true"
					bind:innerHTML={sticky.title}
				/>
			</div>
		{/each}

		<input
			type="text"
			bind:value={new_todo}
			on:keypress={(e) => {
				if (e.code == 'Enter') {
					insert()
				}
			}}
		/>
	</div>
</div>

<style lang="scss">
	.doc {
		display: flex;
		flex-direction: row;
		gap: 8px;
		padding: 8px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 8px;

		width: 272px;
		padding: 8px;

		border-radius: 4px;
		background-color: #ebecf0;
	}

	.sticky {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 8px;
		// padding: 8px;

		border-radius: 4px;
		background-color: white;
		box-shadow: 0 2px lightgray;

		> .title {
			flex-grow: 1;
			word-wrap: break-word;

			padding: 8px;
		}
	}
</style>
