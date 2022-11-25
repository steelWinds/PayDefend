<script lang="ts">
	import type { IOrganizationFeature } from '@/modules/api/ymaps/Types';

	import TitleSection from '$lib/UI/TitleSection.svelte';
	import {
		TextArea,
		FileUploader,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import Button from '$lib/UI/Button.svelte';
	import { field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	export let company: IOrganizationFeature | undefined;

	const files = field('files', [], [required()]);
	const comment = field('comment', '', [required()]);
	const appeal = field('appeal', 'sber', [required()]);
	// const companyForm = form(files, comment, appeal);

	$: companyMetaData = company?.properties?.CompanyMetaData;
</script>

{#if companyMetaData}
	<article class="tw-flex tw-flex-col">
		<TitleSection>
			<svelte:fragment slot="title">Адрес</svelte:fragment>

			{companyMetaData.address}
		</TitleSection>

		<h2 class="tw-text-lg tw-font-bold tw-my-3">Ваш отзыв</h2>

		<TextArea
			bind:value={$comment.value}
			class="tw-mb-2"
			placeholder={`Что вы думаете об организации "${companyMetaData.name}?"`}
		/>

		<h2 class="tw-text-md tw-font-bold tw-my-3">
			Куда вы хотите направить ваш отзыв?
		</h2>

		<RadioButtonGroup bind:selected={$appeal.value} class="custom-radio-group">
			<RadioButton labelText="ФАС" value="fas" />
			<RadioButton labelText="ИФНС" value="ifns" />
			<RadioButton labelText="СБЕРБАНК" value="sber" />
			<RadioButton labelText="РОСПОТРЕБНАДЗОР" value="rsp" />
			<RadioButton labelText="СЭС" value="ses" />
		</RadioButtonGroup>

		<FileUploader
			bind:files={$files.value}
			class="custom-file-uploader tw-mb-3"
			accept={['.jpg', '.jpeg', '.avif', '.webp', '.png']}
			status="edit"
			multiple
			buttonLabel="Добавьте фото места"
		/>

		<Button class="tw-bg-blue tw-text-white tw-text-center">Отправить</Button>
	</article>
{/if}
