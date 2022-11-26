<script lang="ts">
	import type { IOrganizationFeature } from '@/modules/api/ymaps/Types';

	import { onMount } from 'svelte';
	import Avatar from '$lib/UI/Avatar.svelte';
	import YMap from '$lib/Modules/YMap.svelte';
	import { Modal } from 'carbon-components-svelte';
	import useOrganizations from '@/modules/api/ymaps/useOrganization';
	import CompanyCard from '$lib/UI/CompanyCard.svelte';
	import BarLoader from '$lib/UI/BarLoader.svelte';
	import ItemsList from '@/lib/UI/ItemsList.svelte';
	import Button from '$lib/UI/Button.svelte';
	import UserCard from '$lib/UI/UserCard.svelte';
	import pointsStore from '@/stores/points';
	import userStore from '@/stores/user';

	let mapRef: any | undefined;
	let addPlacemarkModal: boolean;
	let showOrganizationModal: boolean;
	let showUserModal: boolean;
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

	onMount(async () => {
		const { ymaps, map } = await mapRef;

		pointsStore.subscribe(($points) => {
      map.geoObjects.removeAll();

			for (let [_, geo] of Object.entries($points)) {
				const reviewsCount = geo.length;
				const { coords, companyName, checked } = geo[0];
				const checkedMsg = checked ? 'Да' : 'Нет';
				const iconColor = checked ? 'rgb(102 204 153)' : 'rgba(204 51 0)';

        console.log(coords)

				if (!coords?.length) return;

				map.geoObjects.add(
					new ymaps.Placemark(
						coords?.reverse(),
						{
							balloonContent: `Компания ${companyName}, всего обращений - ${reviewsCount}, подтверждено: ${checkedMsg}`
						},
						{
							preset: 'islands#dotIcon',
							iconColor
						}
					)
				);
			}
		});
	});
</script>

<button
	class="tw-fixed tw-top-2 tw-right-2 tw-z-50 tw-drop-shadow-md"
	on:click={() => (showUserModal = true)}
>
	<Avatar
		class="
      tw-bg-white
      motion-safe:tw-transition-color
      motion-safe:tw-duration-150
      hover:tw-bg-x11
      tw-p-3
    "
		size={24}
		svgClass="tw-mix-blend-multiply"
		color={$userStore?.color ?? ''}
	/>
</button>

<YMap
	bind:map={mapRef}
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
	hasForm
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

	<CompanyCard
		company={currentOrganization}
		on:success={() => (showOrganizationModal = false)}
	/>
</Modal>

<Modal
	bind:open={showUserModal}
	passiveModal
	class="custom-modal no-footer min-size fit-size"
>
	<h4 slot="heading" class="tw-mr-3 tw-text-blue tw-font-bold">
		{$userStore?.name}
	</h4>

	<UserCard />
</Modal>
