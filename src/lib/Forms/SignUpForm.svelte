<script lang="ts">
	import type { IUser } from '@/modules/api/restdbio/Types';

	import randomcolor from 'randomcolor';
	import ImaskInput from '$lib/Modules/Input.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Form from '$lib/UI/Form.svelte';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { createEventDispatcher } from 'svelte';
	import useRestDBIO from '@/modules/api/restdbio';
	import authStore from '@/stores/auth';

	interface $$Events {
		success: CustomEvent;
		error: CustomEvent<{
			error: any;
		}>;
	}

	const dispatch = createEventDispatcher();

	let pending = false;

	const phone = field('phone', '', [required()]);
	const name = field('name', '', [required()]);
	const authForm = form(phone, name);

	const handler = async () => {
		await authForm.validate();

		if (!$authForm.valid || pending) return;

		try {
			pending = true;

			const result = await useRestDBIO<IUser>({
				endpoint: 'usersdata',
				method: 'POST',
				body: {
					...authForm.summary(),
					color: randomcolor()
				}
			});

			dispatch('success');

			authStore.setUser(result);
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
	<div class="tw-grid tw-grid-cols-2 tw-gap-3">
		<ImaskInput
			class="tw-p-3 custom-input"
			mask={'{+7} (000) 000-00-00'}
			placeholder="Ваш мобильный"
			invalid={!$phone.valid}
			on:change={({ detail }) => ($phone.value = detail.unmaskedValue)}
		/>

		<ImaskInput
			bind:value={$name.value}
			placeholder="Ваше имя"
			mask={/^\S*$/}
			class="tw-capitalize tw-p-3 custom-input"
			invalid={!$name.valid}
			on:change={({ detail }) => ($name.value = detail.value)}
		/>
	</div>

	<Button
		class="tw-bg-blue tw-text-white tw-mt-3"
		disabled={!$authForm.valid}
		{pending}
	>
		Зарегестрироваться
	</Button>
</Form>
