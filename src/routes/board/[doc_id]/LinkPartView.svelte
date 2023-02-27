<script lang="ts">
	import type { LinkPart } from '$lib/doc'
	import Icon from '$lib/components/Icon.svelte'
	import * as Icons from '@steeze-ui/heroicons'
	import Button from '$lib/components/Button.svelte'
	import Dropdown from '$lib/components/Dropdown.svelte'

	export let part: LinkPart
</script>

<div class="flex flex-row gap-4 items-center">
	<Icon src={Icons.Link} big />
	<a href={part.href} target="_blank" rel="noreferrer">{part.title}</a>
	<Button><Icon src={Icons.PencilSquare} /></Button>
	<Dropdown placement="bottom-end">
		<div role="group">
			<label>
				<span>Text</span>
				<input type="text" bind:value={part.title} />
			</label>
			<label>
				<span>Url</span>
				<input type="url" bind:value={part.href} />
			</label>
		</div>
	</Dropdown>
</div>
