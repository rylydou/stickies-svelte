<script lang="ts">
	export let filled = false
</script>

<button on:click class:filled {...$$restProps}>
	<slot>~Button~</slot>
</button>
