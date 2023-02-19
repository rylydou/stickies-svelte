<script lang="ts">
	import Wrapper from './Wrapper.svelte'
	import classNames from 'classnames'
	export let defaultClass: string = ''
	export let href: string | undefined = undefined
	let liClass: string
	$: liClass = classNames(
		defaultClass,
		href
			? 'block'
			: 'w-full text-left gap-2 p-2 hover:bg-violet-500 hover:text-white',
		$$props.class
	)
	let wrap: boolean = true
	function init(node: HTMLElement) {
		wrap = node.parentElement?.tagName === 'UL'
	}
</script>

<Wrapper tag="li" show={wrap} use={init}>
	<svelte:element
		this={href ? 'a' : 'button'}
		{href}
		type={href ? undefined : 'button'}
		{...$$restProps}
		class={liClass}
		on:click
		on:change
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:mouseenter
		on:mouseleave
	>
		<slot />
	</svelte:element>
</Wrapper>
