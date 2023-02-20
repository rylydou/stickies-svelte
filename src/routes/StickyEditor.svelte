<script lang="ts">
	import type { ChecklistPart, DocData } from '$lib/doc'

	let store = svelteSyncedStore(doc_store)
	$: doc = $store.doc as DocData
	$: sticky = doc.stickies_by_id[$selected_sticky]

	import Button from '$lib/components/Button.svelte'
	import * as Icons from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { svelteSyncedStore } from '@syncedstore/svelte'
	import { Highlight, LineNumbers } from 'svelte-highlight'
	import json from 'svelte-highlight/languages/json'
	import { cubicOut, linear } from 'svelte/easing'
	import { fade, scale } from 'svelte/transition'
	import ChecklistPartView from './ChecklistPartView.svelte'
	import { selected_sticky } from './state_store'
	import { doc_store } from './store'
	import Dropdown from '$lib/components/Dropdown.svelte'
	import DropdownItem from '$lib/components/DropdownItem.svelte'

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

<!-- Wrapper -->
<div
	data-background={true}
	class="absolute left-0 top-0 w-full h-full max-h-full md:py-8 overflow-y-auto text-sm"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- Backdrop -->
	<div
		class="fixed top-0 left-0 bottom-0 right-0 md:bg-black/75 md:backdrop-grayscale md:backdrop-blur-sm will-change-transform"
		in:fade={{ duration: 300, easing: cubicOut }}
		out:fade={{ duration: 200, easing: cubicOut }}
		on:click={close}
	/>
	<!-- Window -->
	<div class="mx-auto max-w-screen-md">
		<div
			class="bg-gray-200 md:rounded-lg min-h-screen md:min-h-0 shadow-2xl relative"
			in:scale={{ start: 0.9, duration: 300, easing: cubicOut }}
			out:scale={{ start: 0.9, duration: 200, easing: cubicOut }}
		>
			{#if $selected_sticky != 0}
				<!-- Header -->
				<div
					class="p-2 flex flex-row items-stretch gap-2 sticky top-0 md:-top-8 bg-white z-50 border-b-2 border-b-gray-200 md:rounded-t-lg"
				>
					<!-- class="bg-red-500 text-white md:bg-transparent md:text-current" -->
					<Button
						class="bg-gray-200 md:bg-transparent 2md:hidden"
						on:click={close}
					>
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

					<input
						class="flat font-bold text-base"
						type="text"
						bind:value={doc.stickies_by_id[$selected_sticky].title}
					/>

					<!-- #ff8172 -->
					<Button class="bg-primary-500">
						<Icon src={Icons.Plus} theme="mini" size="20px" />
						Add part
					</Button>
					<Dropdown>
						<div role="group">
							<DropdownItem>
								<Icon src={Icons.Tag} theme="mini" size="20px" />
								<div class="block">
									<span class="font-bold">Tag</span>
									<p class="whitespace-pre-wrap opacity-50"
										>Add a tag to this sticky</p
									>
								</div>
							</DropdownItem>
						</div>
						<div role="group">
							<DropdownItem on:click={add_checklist}>
								<Icon src={Icons.ListBullet} theme="mini" size="20px" />
								<div class="block">
									<span class="font-bold">Checklist</span>
									<p class="whitespace-pre-wrap opacity-50"
										>A checklist of tasks</p
									>
								</div>
							</DropdownItem>
							<DropdownItem>
								<Icon src={Icons.Link} theme="mini" size="20px" />
								Link
							</DropdownItem>
						</div>
						<div role="group">
							<DropdownItem>
								<Icon src={Icons.Photo} theme="mini" size="20px" />
								Image
							</DropdownItem>
							<DropdownItem>
								<Icon src={Icons.Calendar} theme="mini" size="20px" />
								Due date
							</DropdownItem>
						</div>
					</Dropdown>
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
