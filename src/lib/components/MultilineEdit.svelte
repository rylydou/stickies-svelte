<script lang="ts">
	export var value: string
	export var cols = 0
	export var rows = 5
</script>

<textarea bind:value {cols} {rows} />

<style lang="postcss">
	textarea {
		appearance: none;
		padding: theme(padding.1) theme(padding.2);
		border: none;
		border-radius: theme(borderRadius.DEFAULT);
		outline: none;
		text-align: left;

		&:hover {
			background-color: theme(colors.gray.300);
		}

		&:disabled {
			opacity: theme(opacity.25);
		}
	}
</style>
