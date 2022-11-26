<script lang="ts">
	import { Tag } from 'carbon-components-svelte';

	export let name: string;
	export let count: number;
	export let url = '';
</script>

{#if url}
  <a href={url} target="_blank" rel="noreferrer noopener">
    <Tag
      class={`
      tw-m-0
      tw-mr-2
      tw-mb-2
      tw-cursor-pointer
      tw-bg-blue tw-text-white
      ${$$restProps.class}
    `}
    >
      {`${name}: ${count}`}
    </Tag>
  </a>

{:else}
  <Tag
    class={`
    tw-m-0
    tw-mr-2
    tw-mb-2
    ${$$restProps.class}
  `}
  >
    {`${name}: ${count}`}
  </Tag>
{/if}
