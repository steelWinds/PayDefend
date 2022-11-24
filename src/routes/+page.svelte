<script lang="ts">
	import type { IOrganizationFeature } from '@/modules/api/ymaps/Types';

	import YMap from '$lib/Modules/YMap.svelte';
	import { Modal } from 'carbon-components-svelte';
	import useOrganizations from '@/modules/api/ymaps/useOrganization';
	import CompanyCard from '$lib/UI/CompanyCard.svelte';

	let addPlacemarkModal: boolean;
	let showOrganizationModal: boolean;
	let getGealocationDataPromise: Promise<IOrganizationFeature[]>;
	let currentOrganization: IOrganizationFeature;

	$: {
		console.log(currentOrganization);
	}

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
			Загрузка...
		{:then data}
			{#if data?.length > 1}
				Уточните Организацию
			{:else if data?.length === 1}
				Подтвердите организацию
			{:else}
				Пусто!
			{/if}
		{/await}
	</h4>

	{#await getGealocationDataPromise then data}
		<div class="tw-flex tw-flex-col">
			{#if !data?.length}
				<h4>Увы, мы не смогли найти организации в указаном вами месте...</h4>
			{/if}

			{#if data?.length}
				{#each data as geoOrganization, idx (idx)}
					<button
						class="tw-break-words tw-w-full tw-text-start tw-text-base tw-py-3.5 tw-px-1 hover:tw-bg-x11 tw-transition-color tw-duration-150"
						on:click={() => {
							currentOrganization = geoOrganization;

							showOrganizationModal = true;
						}}
					>
						{geoOrganization.properties.CompanyMetaData.name}
					</button>
				{/each}
			{/if}
		</div>
	{/await}
</Modal>

<Modal
	bind:open={showOrganizationModal}
	passiveModal
	class="custom-modal no-footer min-size"
>
	<h4 slot="heading">
		{currentOrganization?.properties?.CompanyMetaData.name}
	</h4>

	{#if currentOrganization}
		<CompanyCard company={currentOrganization} />
	{/if}
</Modal>
