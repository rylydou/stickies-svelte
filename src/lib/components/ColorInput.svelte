<script lang="ts">
	import { contrast_color } from '$lib/contrast'
	import { Icon } from '@steeze-ui/svelte-icon'
	import Button from './Button.svelte'
	import ColorPicker from './ColorPicker.svelte'
	import Dropdown from './Dropdown.svelte'
	import * as Icons from '@steeze-ui/heroicons'

	export let color = '#ff00ff'
</script>

<Button
	class="p-1"
	style="background-color: {color}; color: {contrast_color(color)};"
>
	<Icon src={Icons.Swatch} size="20px" theme="mini" />
</Button>
<Dropdown placement="bottom-start">
	<ColorPicker on:pick={(picked_color) => (color = picked_color.detail)} />
</Dropdown>
