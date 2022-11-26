<script lang="ts">
	import PendingLoader from '$lib/UI/PendingLoader.svelte';

	export let disabled = false;
	export let pending = false;
</script>

<button
	class={`
    tw-relative
    tw-break-words
    tw-w-full
    tw-text-base
    tw-py-3.5
    tw-px-1
    motion-safe:tw-transition-color
    motion-safe:tw-duration-150
    ${$$restProps.class}
  `}
	{disabled}
	on:click
>
	<PendingLoader state={pending} zIndex="10" position="absolute" svgClass="tw-w-[32px]" />

	<slot />
</button>
