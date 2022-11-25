<script lang="ts">
	import { imask } from '@imask/svelte';
	import { createEventDispatcher } from 'svelte';

	interface $$Events {
		change: CustomEvent<HTMLInputElement>;
	}

	export let value: string;
	export let mask: string | RegExp | null = null;
	export let lazy = true;
	export let invalid = false;

	const dispatch = createEventDispatcher();

	const onChange = (event: CustomEvent<HTMLInputElement>) => {
		dispatch('change', event.detail);
	};
</script>

{#if mask}
	<input
		{value}
		use:imask={{
			mask,
			lazy
		}}
		on:accept={onChange}
		type={$$restProps.type}
		class:invalid
		class={$$restProps.class}
		placeholder={$$restProps.placeholder}
	/>
{:else}
	<input bind:value class:invalid {...$$restProps} />
{/if}
