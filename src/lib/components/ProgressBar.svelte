<script lang="ts">
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'

	export let value = 0
	export let min = 0
	export let max = 0

	$: progress_raw = (value - min) / (max - min)

	$: {
		progress_tweened.set(isNaN(progress_raw) ? 0 : progress_raw)
	}

	let progress_tweened = tweened(progress_raw, {
		duration: 1000,
		easing: cubicOut,
	})
</script>

<div class="progressbar w-full flex flex-row gap-2 items-center">
	<div
		class="progressbar-label w-8 tabular-nums text-xs text-right text-gray-600 will-change-contents"
	>
		{#if max > 0}
			{Math.round($progress_tweened * 100)}%
		{:else}
			0%
		{/if}
	</div>
	<div class="progressbar-track w-full h-1 overflow-clip">
		<div
			class="progressbar-fill h-full border-r-2 border-r-primary-600 will-change-transform"
			style="width: {$progress_tweened * 100}%;"
		/>
	</div>
	<div
		class="progressbar-label w-11 tabular-nums text-xs text-right text-gray-600"
	>
		<span class="font-bold text-gray-800">{value}</span>/<span
			class="text-gray-400">{max}</span
		>
	</div>
</div>

<style lang="postcss">
	.progressbar-track {
		background-color: theme(colors.white);
		border-radius: theme(borderRadius.full);
	}

	.progressbar-fill {
		background-color: theme(colors.primary.500);
	}
</style>
