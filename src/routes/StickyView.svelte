<script lang="ts">
	import type { DocData, ID } from '$lib/doc'
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition'
	import { selected_sticky } from './state_store'

	export let doc_data: DocData
	export let sticky_id: ID
	export let send: (
		node: Element,
		params: CrossfadeParams & {
			key: any
		}
	) => () => TransitionConfig
	export let receive: (
		node: Element,
		params: CrossfadeParams & {
			key: any
		}
	) => () => TransitionConfig

	$: sticky_data = doc_data.stickies_by_id[sticky_id]

	function click() {
		console.log(`clicked "${sticky_data.title}"#${sticky_id}`)
		selected_sticky.set(sticky_id)
	}
</script>

<button
	class="bg-white rounded border-b border-gray-300"
	title="id:{sticky_data.id}"
	on:click={click}
	in:receive={{ key: sticky_id }}
	out:send={{ key: sticky_id }}
>
	<div class="p-2">
		{sticky_data.title}
	</div>
</button>

<style lang="css">
</style>
