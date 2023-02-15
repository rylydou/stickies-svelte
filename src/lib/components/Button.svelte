<script lang="ts">
	export let disabled = false
</script>

<button on:click class={$$props.class} {disabled}>
	<slot>~Button~</slot>
</button>

<style lang="postcss">
	/* button {
		@apply px-2 py-1 rounded font-bold bg-white/90 text-gray-900;
	} */
</style>
