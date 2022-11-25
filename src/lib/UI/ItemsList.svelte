<script lang="ts">
	type T = $$Generic;

	export let list: T[];
</script>

<ul class={$$restProps.class}>
	{#if list?.length}
		{#each list as item, idx (`btn-list-item_${idx}`)}
			<li>
				<slot {item} />
			</li>
		{/each}
	{/if}
</ul>
