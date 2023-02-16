<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import type { DocData, ID } from '$lib/doc'
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition'
	import { selected_sticky } from './state_store'
	import { crossfade } from 'svelte/transition'

	export let doc: DocData
	export let id: ID

	$: sticky_data = doc.stickies_by_id[id]

	function click() {
		console.log(`clicked "${sticky_data.title}"#${id}`)
		selected_sticky.set(id)
	}

	const [send, receive] = crossfade({
		duration: 1000,
	})
</script>

<button
	class="sticky reset"
	title="id:{sticky_data.id}"
	on:click={click}
	in:receive={{ key: 'anim' }}
	out:send={{ key: 'anim' }}
>
	<div class="p-2">
		{sticky_data.title}
	</div>
</button>

<style lang="postcss">
	.sticky {
		@apply flex flex-row p-0 justify-start
			bg-white rounded
			text-left text-gray-900;
		box-shadow: 0 1px hsla(0 0% 0% / 0.1);
	}
</style>
