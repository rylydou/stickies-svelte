<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Label from '$lib/components/Label.svelte'
	import type { DocData, ID } from '$lib/doc'
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition'
	import { selected_sticky } from './state_store'
	import { crossfade } from 'svelte/transition'

	export let doc: DocData
	export let id: ID

	$: sticky = doc.stickies_by_id[id]

	function click() {
		selected_sticky.set(id)
	}

	const [send, receive] = crossfade({
		duration: 1000,
	})
</script>

<button
	class="sticky reset"
	title="id: {sticky.id}"
	on:click={click}
	in:receive={{ key: 'anim' }}
	out:send={{ key: 'anim' }}
>
	<div class="p-2 pb-1 whitespace-pre-wrap">
		{sticky.title}
	</div>
	<div class="flex flex-row flex-wrap gap-1 p-2 pt-0">
		{#each sticky.labels as label_id (label_id)}
			{@const label = doc.labels_by_id[label_id]}
			<Label color={label.color}>
				{label.name}
			</Label>
		{/each}
	</div>
</button>

<style lang="postcss">
	.sticky {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: flex-start;
		padding: 0;
		background-color: theme(backgroundColor.white);
		text-align: left;
		box-shadow: 0 1px hsla(0 0% 0% / 0.1);
	}
</style>
