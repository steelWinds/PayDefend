<script lang="ts">
	import { Tag } from 'carbon-components-svelte';

	export let name: string;
	export let count: number;
	export let url = '';
</script>

<a href={url} target="_blank" rel="noreferrer noopener">
	<Tag
		class={`
    tw-m-0
    tw-mr-2
    tw-mb-2
    tw-cursor-pointer
    ${$$restProps.class}
    ${url ? 'tw-bg-blue tw-text-white' : ''}
  `}
	>
		{`${name}: ${count}`}
	</Tag>
</a>
