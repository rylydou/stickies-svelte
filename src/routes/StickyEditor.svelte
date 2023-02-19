<script lang="ts">
	import type { ChecklistPart, DocData } from '$lib/doc'

	let store = svelteSyncedStore(doc_store)
	$: doc = $store.doc as DocData
	$: sticky = doc.stickies_by_id[$selected_sticky]

	import Button from '$lib/components/Button.svelte'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { Highlight, LineNumbers } from 'svelte-highlight'
	import json from 'svelte-highlight/languages/json'
	import { selected_sticky } from './state_store'
	import { doc_store } from './store'
	import ChecklistPartView from './ChecklistPartView.svelte'
	import Dropdown from '$lib/components/Dropdown.svelte'
	import DropdownItem from '$lib/components/DropdownItem.svelte'
	import { scale } from 'svelte/transition'

	function click(e: MouseEvent) {
		const div = e.target as HTMLDivElement
		if (div.dataset.background) close()
	}

	function close() {
		$selected_sticky = 0
	}

	function add_checklist() {
		console.log('adding checklist...')
		let checklist: ChecklistPart = {
			type: 'checklist',
			title: 'Checklist',
			items: [],
		}

		sticky.parts.push(checklist)
	}

	const parts_lut: { [key: string]: ConstructorOfATypedSvelteComponent } = {
		checklist: ChecklistPartView,
	}

	let show_json = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	data-background={true}
	class="absolute left-0 top-0 w-full h-full max-h-full md:py-8 bg-black/50 overflow-y-auto md:backdrop-blur-md md:backdrop-saturate-50 md:backdrop-brightness-50 text-sm"
	on:click={click}
>
	<div class="mx-auto max-w-screen-md">
		<div
			class="bg-gray-200 md:rounded h-screen md:h-fit shadow-2xl relative"
			in:scale={{ start: 0.9, duration: 200 }}
			out:scale={{ start: 0.9, duration: 200 }}
		>
			{#if $selected_sticky != 0}
				<!-- Header -->
				<div
					class="p-2 flex flex-row gap-2 sticky top-0 md:-top-8 bg-gray-200 z-10 shadow"
				>
					<input
						class="flat font-bold text-base"
						type="text"
						bind:value={doc.stickies_by_id[$selected_sticky].title}
					/>
					<Button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
						Add part
					</Button>
					<Dropdown>
						<DropdownItem on:click={add_checklist}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z"
									clip-rule="evenodd"
								/>
							</svg>
							Checklist
						</DropdownItem>
						<DropdownItem on:click={add_checklist}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
									clip-rule="evenodd"
								/>
							</svg>
							Image
						</DropdownItem>
						<DropdownItem on:click={add_checklist}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
									clip-rule="evenodd"
								/>
							</svg>
							Due date
						</DropdownItem>
						<DropdownItem on:click={add_checklist}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z"
								/>
								<path
									d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"
								/>
							</svg>
							Link
						</DropdownItem>
					</Dropdown>

					<!-- class="bg-red-500 text-white md:bg-transparent md:text-current" -->
					<Button class="bg-gray-300 md:bg-transparent" on:click={close}>
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

				<div class="flex flex-row">
					<!-- Content -->
					<div class="w-full p-4 flex flex-col gap-4">
						<!-- Description -->
						<div class="block">
							<span>Description</span>
							<textarea
								class="mt-1 bg-white"
								rows="4"
								placeholder="Add a more detailed description..."
								bind:value={sticky.description}
								spellcheck={false}
							/>
						</div>

						<!-- Parts -->
						{#each sticky.parts as part}
							<svelte:component this={parts_lut[part.type]} {part} />
						{/each}
					</div>

					<!-- Sidebar -->
					<!-- <div class="w-72 p-4 pl-2 flex flex-col gap-1 hidden">
					<div class="text-xs font-bold"> Add to sticky </div>
					<Button on:click={add_checklist} filled>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5"
						>
							<path
								fill-rule="evenodd"
								d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z"
								clip-rule="evenodd"
							/>
						</svg>
						Checklist
					</Button>
				</div> -->
				</div>

				<label class="flex flex-row gap-2 items-center p-4">
					<input class="switch" type="checkbox" bind:checked={show_json} />
					<span>Show raw json</span>
				</label>

				{#if show_json}
					<Highlight
						language={json}
						code={JSON.stringify(sticky, null, ' ')}
						langtag
						let:highlighted
					>
						<LineNumbers {highlighted} hideBorder />
					</Highlight>
				{/if}
			{/if}
		</div>
	</div>
</div>
