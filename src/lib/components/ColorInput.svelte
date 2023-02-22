<script lang="ts">
	import { contrast } from '$lib/contrast'
	import Icon from '$lib/components/Icon.svelte'
	import Button from './Button.svelte'
	import ColorPicker from './ColorPicker.svelte'
	import Dropdown from './Dropdown.svelte'
	import * as Icons from '@steeze-ui/heroicons'
	import { colord } from 'colord'

	export let color = colord('#f0f')
</script>

<Button
	class="p-1"
	style="background-color: {color}; color: {contrast(color).toHex()};"
>
	<Icon src={Icons.Swatch} />
</Button>
<Dropdown placement="bottom-start">
	<ColorPicker on:pick={(picked_color) => (color = picked_color.detail)} />
</Dropdown>
