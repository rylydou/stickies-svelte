<script lang="ts">
	type AllowedTags =
		| 'path'
		| 'circle'
		| 'rect'
		| 'polygon'
		| 'polyline'
		| 'line'
	type IconThemeSource = {
		a: { [attribute: string]: string }
	} & {
		[tag in AllowedTags]?: { [attribute: string]: string }[]
	}
	type IconSource = { default: IconThemeSource } & {
		[theme: string]: IconThemeSource
	}

	export let src: IconSource
	export let big = false

	$: size = big ? '24px' : '20px'
	$: icon = src?.[big ? 'default' : 'mini'] ?? src?.['default']
</script>

<svg
	{...icon?.a}
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	{...$$restProps}
>
	{#each icon?.path ?? [] as a}
		<path {...a} />
	{/each}
	{#each icon?.rect ?? [] as a}
		<rect {...a} />
	{/each}
	{#each icon?.circle ?? [] as a}
		<circle {...a} />
	{/each}
	{#each icon?.polygon ?? [] as a}
		<polygon {...a} />
	{/each}
	{#each icon?.polyline ?? [] as a}
		<polyline {...a} />
	{/each}
	{#each icon?.line ?? [] as a}
		<line {...a} />
	{/each}
</svg>
