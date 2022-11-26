<script lang="ts">
	import type {
		ICompany,
		CheckingOrganization
	} from '@/modules/api/restdbio/Types';
	import type { ICompanyMetaData } from '@/modules/api/ymaps/Types';

	import Button from '$lib/UI/Button.svelte';
	import Form from '$lib/UI/Form.svelte';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { createEventDispatcher } from 'svelte';
	import {
		TextArea,
		FileUploader,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import imgReader from '@/modules/img-reader';
	import useRestDBIO from '@/modules/api/restdbio';
	import authStore from '@/stores/auth';
	import pointsStore from '@/stores/points';

	interface $$Events {
		success: CustomEvent;
		error: CustomEvent<{
			error: any;
		}>;
	}

	export let company: ICompanyMetaData;
	export let companyCoords: [number, number];

	const dispatch = createEventDispatcher();

	let pending = false;

	const files = field('files', [], []);
	const comment = field('comment', '', [required()]);
	const appeal = field<CheckingOrganization>('appeal', 'sber', [required()]);
	const companyForm = form(files, comment, appeal);

	const handler = async () => {
		await companyForm.validate();

		if (!$companyForm.valid || pending) return;

		try {
			pending = true;

			const images = await imgReader($files.value);

			console.log(company);

			await useRestDBIO<ICompany>({
				endpoint: 'companydata',
				method: 'POST',
				body: {
					companyName: company.name,
					companyURL: company.url,
					images: {
						data: images
					},
					comment: $comment.value,
					type: $appeal.value,
					userId: $authStore?.idToken
				}
			});

			await pointsStore.addPoint({
				companyId: company.id,
				companyName: company.name,
				checked: false,
				coords: companyCoords
			});

			companyForm.reset();

			dispatch('success');
		} catch (e) {
			dispatch('error', {
				error: e
			});
		} finally {
			pending = false;
		}
	};
</script>

<Form class="tw-flex tw-flex-col" on:submit={handler}>
	<TextArea
		bind:value={$comment.value}
		class="tw-mb-2"
		invalid={!$comment.valid}
	/>

	<label class="tw-text-md tw-font-bold tw-my-3" for="radio-group">
		Куда вы хотите направить ваш отзыв?
	</label>

	<RadioButtonGroup
		id="radio-group"
		bind:selected={$appeal.value}
		class="custom-radio-group"
	>
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

	<Button
		{pending}
		disabled={!$companyForm.valid || pending}
		class="tw-sticky tw-bottom-0 tw-bg-blue tw-text-white tw-text-center"
	>
		Отправить
	</Button>
</Form>
