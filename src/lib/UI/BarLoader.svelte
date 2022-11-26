<script lang="ts">
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';

	export let size: string;
</script>

<span
	class={`
    tw-inline-block
    tw-w-fit
    tw-overflow-hidden
    tw-rounded-xl
    ${$$restProps.class}
  `}
>
	<BarLoader {size} color="#0f62fe" unit="px" duration="1.50s" />
</span>
