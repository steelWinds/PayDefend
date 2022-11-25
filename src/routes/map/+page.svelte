<script lang="ts">
	import type { IOrganizationFeature } from '@/modules/api/ymaps/Types';

	import YMap from '$lib/Modules/YMap.svelte';
	import { Modal } from 'carbon-components-svelte';
	import useOrganizations from '@/modules/api/ymaps/useOrganization';
	import CompanyCard from '$lib/UI/CompanyCard.svelte';
	import BarLoader from '$lib/UI/BarLoader.svelte';
	import ItemsList from '@/lib/UI/ItemsList.svelte';
	import Button from '$lib/UI/Button.svelte';

	let addPlacemarkModal: boolean;
	let showOrganizationModal: boolean;
	let getGealocationDataPromise: Promise<IOrganizationFeature[]>;
	let currentOrganization: IOrganizationFeature | undefined;

	const getGealocationData = async (coords: [number, number]) => {
		const organizations = await useOrganizations({
			coords,
			results: 10,
			lang: 'ru_RU'
		});

		return organizations;
	};
</script>

<YMap
	handlers
	state={{
		controls: ['geolocationControl'],
		center: [62.033, 129.73],
		zoom: 13
	}}
	options={{
		restrictMapArea: [
			[61.88, 129.37],
			[62.18, 130.14]
		]
	}}
	id="YKT-map"
	class="tw-h-screen tw-w-full"
	on:mapClick={(e) => {
		getGealocationDataPromise = getGealocationData(
			e.detail.yevent.get('coords')
		);

		addPlacemarkModal = true;
	}}
/>

<Modal
	bind:open={addPlacemarkModal}
	passiveModal
	class="custom-modal no-footer min-size"
>
	<h4 slot="heading">
		{#await getGealocationDataPromise}
			<span class="motion-safe:tw-animate-pulse"> Загрузка... </span>
		{:then data}
			<span>
				{#if data?.length > 1}
					Уточните Организацию из {data?.length} возможных
				{:else if data?.length === 1}
					Подтвердите организацию
				{:else}
					Пусто!
				{/if}
			</span>
		{/await}
	</h4>

	<div class="tw-grid tw-place-items-center tw-h-full">
		{#await getGealocationDataPromise}
			<BarLoader size="100" />
		{:then data}
			{#if !data?.length}
				<h4>Увы, мы не смогли найти организации в указаном вами месте...</h4>
			{/if}

			<ItemsList class="tw-w-full" list={data} let:item>
				<Button
					class="hover:tw-bg-blue hover:tw-text-white tw-text-start"
					on:click={() => {
						currentOrganization = item;

						showOrganizationModal = true;
					}}
				>
					{item.properties.CompanyMetaData.name}
				</Button>
			</ItemsList>
		{/await}
	</div>
</Modal>

<Modal
	bind:open={showOrganizationModal}
	passiveModal
	class="custom-modal no-footer min-size fixed-inline-size"
>
	<a
		class="link:tw-underline"
		title="Перейти на сайт компании"
		target="_blank"
		rel="noreferrer noopener"
		href={currentOrganization?.properties.CompanyMetaData.url}
		slot="heading"
	>
		{currentOrganization?.properties.CompanyMetaData.name}
	</a>

	<CompanyCard company={currentOrganization} />
</Modal>
