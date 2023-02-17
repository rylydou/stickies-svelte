<script lang="ts">
	import { clickOutside } from '$lib/directives/click_outside'
	import { backOut } from 'svelte/easing'
	import { scale } from 'svelte/transition'
	import type { DocData } from '$lib/doc'

	let store = svelteSyncedStore(doc_store)
	$: doc = $store.doc as DocData
	$: sticky = doc.stickies_by_id[$selected_sticky]

	import { selected_sticky } from './state_store'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { doc_store } from './store'
	import Button from '$lib/components/Button.svelte'

	function click(e: MouseEvent) {
		const div = e.target as HTMLDivElement
		if (div.dataset.background) close()
	}

	function close() {
		$selected_sticky = 0
	}
</script>

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
				<textarea
					class="mt-1 bg-white"
					rows="4"
					placeholder="Add a more detailed description..."
					bind:value={sticky.description}
				/>
			</div>
		</div>
		<div
			class="p-2 pt-3 text-white/40 font-mono text-xs flex gap-8 select-text"
		>
			<span>id: {$selected_sticky}</span>
			<span>parts: {sticky.parts.length}</span>
			<span>size: {JSON.stringify(sticky).length}</span>
		</div>
	</div>
</div>
