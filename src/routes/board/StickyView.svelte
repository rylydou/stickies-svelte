<script lang="ts">
	import Label from '$lib/components/Label.svelte'
	import type { ChecklistPart, DocData, ID } from '$lib/doc'
	import { selected_sticky } from './state'
	import { crossfade } from 'svelte/transition'
	import { colord } from 'colord'
	import Icon from '$lib/components/Icon.svelte'
	import * as Icons from '@steeze-ui/heroicons'

	export let doc: DocData
	export let id: ID

	$: sticky = doc.stickies[id]

	function click() {
		selected_sticky.set(id)
	}

	const [send, receive] = crossfade({
		duration: 1000,
	})

	$: checklist_completed_sum = sticky.parts.reduce(
		(sum, part) =>
			part.type !== 'checklist'
				? sum
				: sum +
				  (part as ChecklistPart).items.filter((item) => item.completed).length,
		0
	)
	$: checklist_total_sum = sticky.parts.reduce(
		(sum, part) =>
			part.type !== 'checklist'
				? sum
				: sum + (part as ChecklistPart).items.length,
		0
	)

	function acronym(text: string): string {
		return text.split(/\s/).reduce(function (accumulator, word) {
			return accumulator + word.charAt(0)
		}, '')
	}
</script>

<button
	class="sticky reset"
	title="id: {sticky.id}"
	on:click={click}
	in:receive={{ key: 'anim' }}
	out:send={{ key: 'anim' }}
>
	{#if sticky.labels.length > 0}
		<div class="flex flex-row flex-wrap gap-1">
			{#each sticky.labels as label_id (label_id)}
				{@const label = doc.labels[label_id]}
				<Label
					color={colord(label.color)}
					class="px-1 py-0 text-xs rounded"
					title={label.name}
				>
					{acronym(label.name)}
				</Label>
			{/each}
		</div>
	{/if}

	<div class="whitespace-pre-wrap">
		{sticky.title}
	</div>

	<!-- Badges -->
	<div class="flex flex-row flex-wrap gap-1 text-gray-500">
		<!-- Description Badge -->
		{#if sticky.description.trim().length > 0}
			<div class="p-1 rounded">
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
						d="M18 3H2V5H18V3ZM18 7H2V9H18V7ZM2 11H18V13H2V11ZM12 15H2V17H12V15Z"
						fill="currentColor"
					/>
				</svg>
			</div>
		{/if}

		<!-- Link Badge -->
		{#if sticky.parts.find((part) => part.type === 'link')}
			<div class="p-1 rounded">
				<Icon src={Icons.Link} />
			</div>
		{/if}

		<!-- Checklist Badge -->
		{#if sticky.parts.find((part) => part.type === 'checklist')}
			<div class="p-1 rounded flex flex-row gap-1">
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
						d="M2 16V3.99999C2 2.89542 2.89543 1.99999 4 1.99999H14V3.99999L4 3.99999V16L16 16V10H18V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16ZM17.7071 5.70711L9.70711 13.7071L9 14.4142L8.29289 13.7071L5.29289 10.7071L6.70711 9.29289L9 11.5858L16.2929 4.29289L17.7071 5.70711Z"
						fill="currentColor"
					/>
				</svg>

				{checklist_completed_sum}/{checklist_total_sum}
			</div>
		{/if}
	</div>
</button>

<style lang="postcss">
	.sticky {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: theme(padding.2);
		gap: theme(gap.1);
		background-color: theme(backgroundColor.white);
		text-align: left;
		box-shadow: 0 1px hsla(0 0% 0% / 0.1);
	}
</style>
