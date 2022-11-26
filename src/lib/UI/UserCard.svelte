<script lang="ts">
	import type { ICompany } from '@/modules/api/restdbio/Types';

	import { beforeUpdate } from 'svelte';
	import authUser from '@/stores/auth';
	import SwiperList from '$lib/UI/SwiperList.svelte';
	import ReviewTag from '$lib/UI/ReviewTag.svelte';
	import useRestDBIO from '@/modules/api/restdbio';
  import BarLoader from '$lib/UI/BarLoader.svelte';

	type ReviewGroupList = { [key: string]: ICompany[] };

	let getReviewListPromise: Promise<ReviewGroupList>;

	const getReviewList = () => {
		return useRestDBIO<ICompany, ReviewGroupList>({
			endpoint: 'companydata',
			method: 'GET',
			queries: {
				filter: $authUser?.idToken,
				groupby: 'companyName'
			}
		});
	};

	beforeUpdate(() => {
		getReviewListPromise = getReviewList();
	});
</script>

<div class="tw-flex tw-flex-col tw-justify-start tw-items-start">
	<SwiperList
		class="tw-mb-6 tw-mx-auto"
		items={[
			'U sdfsd fsdf sdf sdf',
			'I sdf sdf sdf sdf',
			'I sdfdf sdfdfsdfsd fsd',
			'I sdfdf sdfdfsdfsd fsd',
			'I sdfdf sdfdfsdfsd fsd'
		]}
		let:item
	>
		<li class="tw-grid tw-grid-row-2 tw-place-items-center">
			<img src="assets/achievement.svg" alt={`Achievement of ${item} icon`} />

			<span class="tw-text-center">
				{item}
			</span>
		</li>
	</SwiperList>

	<h3 class="tw-text-lg tw-font-bold tw-mb-3">Ваши обращения</h3>

	{#await getReviewListPromise}
		<BarLoader size="100" />
	{:then data}
		<div class="snap-proximity tw-snap-y tw-max-h-[25vmax] tw-overflow-auto">
			{#if !Object.values(data ?? {})?.length}
        <span> Упс! Кажется вы еще не оставили ни один отзыв </span>
      {:else}
        {#each Object.entries(data ?? {}) as [name, list]}
          <ReviewTag
            class="tw-snap-center"
            url={list[0]?.companyURL ?? ''}
            {name}
            count={list.length}
          />
        {/each}
      {/if}
		</div>
	{/await}
</div>
