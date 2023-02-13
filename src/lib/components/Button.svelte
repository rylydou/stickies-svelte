<script lang="ts">
</script>

<button on:click class={$$props.class}>
	<slot>~Button~</slot>
</button>

<style lang="postcss">
	button {
		@apply px-2 py-1 bg-white rounded shadow-sm text-black font-bold ring-primary-400 hover:ring;
	}
</style>
