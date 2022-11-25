<script lang="ts">
	export let disabled = false;
</script>

<button
	class={`
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
	<slot />
</button>
