<script lang="ts">
	import type { DocData, ID } from '$lib/doc'
	import { scale, blur } from 'svelte/transition'

	export let doc_data: DocData
	export let sticky_id: ID

	$: sticky_data = doc_data.stickies_by_id[sticky_id]
</script>

<div
	in:scale
	out:blur
	class="bg-white rounded border-b border-gray-300"
	title="id:{sticky_data.id}"
>
	<div class="p-2">
		{sticky_data.title}
	</div>
</div>

<style lang="css">
</style>
