<svelte:options immutable={false} />

<script lang="ts">
	import type { IOrganizationFeature } from '@/modules/api/ymaps/Types';

	import TitleSection from '$lib/UI/TitleSection.svelte';
	import CompanyAppealForm from '$lib/Forms/CompanyAppealForm.svelte';

	export let company: IOrganizationFeature | undefined;

	$: companyMetaData = company?.properties?.CompanyMetaData;
	$: companyCoords = company?.geometry.coordinates;
</script>

<article class="tw-flex tw-flex-col">
	<TitleSection>
		<svelte:fragment slot="title">Адрес</svelte:fragment>

		{companyMetaData?.address}
	</TitleSection>

	<h2 class="tw-text-lg tw-font-bold tw-my-3">Ваш отзыв</h2>

	{#if companyMetaData && companyCoords}
		<CompanyAppealForm company={companyMetaData} {companyCoords} on:success />
	{/if}
</article>
