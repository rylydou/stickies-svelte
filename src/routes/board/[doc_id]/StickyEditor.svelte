<script lang="ts">
	import type { ChecklistPart, DocData, LabelData, LinkPart } from '$lib/doc'

	import Button from '$lib/components/Button.svelte'
	import ColorInput from '$lib/components/ColorInput.svelte'
	import Dropdown from '$lib/components/Dropdown.svelte'
	import DropdownItem from '$lib/components/DropdownItem.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import Label from '$lib/components/Label.svelte'
	import { contrast } from '$lib/contrast'
	import { new_id } from '$lib/id'
	import { doc_store, selected_sticky } from '$lib/stores/board_state'
	import * as Icons from '@steeze-ui/heroicons'
	import { colord } from 'colord'
	import { Highlight, LineNumbers } from 'svelte-highlight'
	import json from 'svelte-highlight/languages/json'
	import { cubicOut } from 'svelte/easing'
	import { fade, scale } from 'svelte/transition'
	import ChecklistPartView from './ChecklistPartView.svelte'
	import LinkPartView from './LinkPartView.svelte'

	$: doc = $doc_store.doc as DocData

	$: sticky = doc.stickies[$selected_sticky!]

	function close() {
		$selected_sticky = null
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

	function add_link() {
		console.log('adding link...')
		let link: LinkPart = {
			type: 'link',
			title: '',
			href: '',
		}

		sticky.parts.push(link)
	}

	let new_label_entry = ''
	let new_label_color = colord('#eab308')
	function add_label() {
		let name = new_label_entry
		if (name.trim().length == 0) name = 'New label'
		new_label_entry = ''

		const id = new_id()
		const label: LabelData = {
			id,
			color: new_label_color.toHex(),
			name,
		}
		doc.labels[id] = label
	}

	const parts_lut: { [key: string]: ConstructorOfATypedSvelteComponent } = {
		checklist: ChecklistPartView,
		link: LinkPartView,
	}

	let show_json = false
</script>

<!-- Wrapper -->
<div
	data-background={true}
	class="absolute left-0 top-0 w-full h-full max-h-full md:py-8 overflow-y-auto text-sm"
	style="pointer-events: {$selected_sticky ? 'all' : 'none'};"
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
			{#if $selected_sticky}
				<!-- Header -->
				<div
					class="p-2 flex flex-row items-stretch gap-2 sticky top-0 md:-top-8 bg-white border-b-2 border-b-gray-200 md:rounded-t-lg"
				>
					<!-- class="bg-red-500 text-white md:bg-transparent md:text-current" -->
					<Button
						class="bg-gray-200 md:bg-transparent 2md:hidden fat"
						on:click={close}
					>
						<Icon src={Icons.XMark} size="24px" />
					</Button>

					<input
						class="flat font-bold text-base"
						type="text"
						bind:value={sticky.title}
					/>

					<!-- #ff8172 -->
					<Button class="bg-primary-500 fat">
						<Icon src={Icons.Plus} />
						Add part
					</Button>
					<Dropdown placement="bottom-end">
						<div role="group">
							<DropdownItem on:click={add_checklist} class="fat">
								<Icon src={Icons.ListBullet} />
								<div class="block">
									<span class="font-bold">Checklist</span>
									<p class="whitespace-pre-wrap opacity-50"
										>A checklist of tasks</p
									>
								</div>
							</DropdownItem>
							<DropdownItem class="fat" on:click={add_link}>
								<Icon src={Icons.Link} />
								Link
							</DropdownItem>
						</div>
						<div role="group">
							<DropdownItem class="fat">
								<Icon src={Icons.Photo} />
								Image
							</DropdownItem>
							<DropdownItem class="fat">
								<Icon src={Icons.Calendar} />
								Due date
							</DropdownItem>
						</div>
					</Dropdown>
				</div>

				<!-- Content -->
				<div class="w-full p-4 flex flex-col gap-4">
					<!-- Labels -->
					<div class="flex flex-row gap-1 flex-wrap z-10">
						{#each sticky.labels as label_id (label_id)}
							{@const label = doc.labels[label_id]}
							<Label
								color={colord(label.color)}
								on:click={(e) =>
									sticky.labels.splice(sticky.labels.indexOf(label_id))}
							>
								{label.name}
							</Label>
						{/each}
						<Button>
							<Icon src={Icons.PlusSmall} />
						</Button>
						<Dropdown placement="bottom-start">
							<div class="p-1 gap-1 flex !flex-row flex-wrap w-80">
								{#each Object.values(doc.labels).filter((label) => !sticky.labels.includes(label.id)) as label (label.id)}
									<Label
										class="w-fit !py-1 font-bold"
										on:click={(e) => sticky.labels.push(label.id)}
										style="background-color: {label.color}; color: {contrast(
											colord(label.color)
										).toHex()};"
									>
										{label.name}
									</Label>
								{:else}
									<span class="opacity-50 px-2 py-1">
										No {#if sticky.labels.length > 0}more{/if} labels...
									</span>
								{/each}
							</div>
							<div class="p-2 flex flex-col">
								<Label color={new_label_color} class="p-2">
									<ColorInput bind:color={new_label_color} />
									<input
										class="superflat"
										type="text"
										placeholder="Create a new label..."
										bind:value={new_label_entry}
										on:keypress={(e) => {
											if (e.code == 'Enter') add_label()
										}}
									/>
								</Label>
							</div>
						</Dropdown>
					</div>
					<!-- Description -->
					<div class="block">
						<span>Description</span>
						<textarea
							class="mt-1 bg-white"
							rows="4"
							placeholder="Add a more detailed description..."
							bind:value={sticky.description}
						/>
					</div>

					<!-- Parts -->
					{#each sticky.parts as part}
						<svelte:component this={parts_lut[part.type]} {part} />
					{/each}
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
