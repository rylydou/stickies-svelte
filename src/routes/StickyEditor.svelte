<script lang="ts">
	import type { DescriptionPart, DocData, Part } from '$lib/doc'
	import code_theme from 'svelte-highlight/styles/base16-monokai'

	let store = svelteSyncedStore(doc_store)
	$: doc = $store.doc as DocData
	$: sticky = doc.stickies_by_id[$selected_sticky]
	$: description_part = sticky.parts['description'] as DescriptionPart

	import Button from '$lib/components/Button.svelte'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { Highlight, LineNumbers } from 'svelte-highlight'
	import json from 'svelte-highlight/languages/json'
	import { selected_sticky } from './state_store'
	import { doc_store } from './store'

	function click(e: MouseEvent) {
		const div = e.target as HTMLDivElement
		if (div.dataset.background) close()
	}

	function close() {
		$selected_sticky = 0
	}

	function has_part(type: string): boolean {
		return type in sticky.parts
	}

	function add_description() {
		console.log('adding description...')
		sticky.parts = {
			...sticky.parts,
			description: { text: '' as 'text' } as DescriptionPart,
		}

		// sticky.parts['description'] = { text: '' } as DescriptionPart
	}

	function get_part<T extends Part>(type: string): T {
		return sticky.parts[type] as T
	}
</script>

<svelte:head>
	{@html code_theme}
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	data-background={true}
	class="absolute left-0 top-0 w-full h-full max-h-full py-8 bg-black/50 overflow-y-auto backdrop-blur-lg backdrop-saturate-50 backdrop-brightness-50"
	on:click={click}
>
	<div class="mx-auto max-w-3xl">
		<div class="bg-gray-200 rounded min-h-max pb-2 shadow-2xl">
			<div class="p-2 flex flex-row">
				<input
					class="flat font-bold"
					type="text"
					bind:value={doc.stickies_by_id[$selected_sticky].title}
				/>
				<Button class="flat" on:click={close}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</Button>
			</div>

			<div class="px-4 py-2 block">
				<span>Description</span>
				{#if description_part}
					<textarea
						class="mt-1 bg-white"
						rows="4"
						placeholder="Add a more detailed description..."
						bind:value={sticky.parts.description.text}
					/>
				{:else}
					<Button on:click={add_description}>Add description</Button>
				{/if}
			</div>
		</div>

		<br />

		<Highlight
			language={json}
			code={JSON.stringify(sticky, null, ' ')}
			langtag
			let:highlighted
		>
			<LineNumbers {highlighted} hideBorder />
		</Highlight>
	</div>
</div>
