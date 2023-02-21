<script lang="ts">
	export let show = false

	let dialog: HTMLDialogElement

	function open() {
		console.log('open')

		show = true
		dialog?.showModal()
	}

	function close() {
		console.log('close')

		show = true
		dialog?.close()
	}

	$: {
		console.log(show)

		if (show) {
			open()
		} else {
			close()
		}
	}
</script>

<dialog bind:this={dialog}>
	<slot />
</dialog>

<style lang="postcss">
	dialog {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: theme(backgroundColor.white);
		width: theme(screens.lg);
		height: theme(screens.lg);
	}
</style>
