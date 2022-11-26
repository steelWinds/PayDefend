<script lang="ts">
	import type { IUser } from '@/modules/api/restdbio/Types';

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
		error: CustomEvent<{ error: any }>;
	}

	const dispatch = createEventDispatcher();

	let pending = false;

	const phone = field('phone', '', [required()]);
	const loginForm = form(phone);

	const handler = async () => {
		await loginForm.validate();

		if (!$loginForm.valid || pending) return;

		try {
			pending = true;

			const response = await useRestDBIO<IUser, IUser[]>({
				endpoint: 'usersdata',
				method: 'GET',
				body: loginForm.summary()
			});

			const user = response?.[0];

			if (!user?.id) throw new Error();

			dispatch('success');

			authStore.setUser(user);
		} catch (e) {
			dispatch('error', {
				error: e
			});
		} finally {
			pending = false;
		}
	};
</script>

<Form class="tw-flex tw-flex-col tw-w-full" on:submit={handler}>
	<ImaskInput
		class="tw-p-3 custom-input"
		mask={'{+7} (000) 000-00-00'}
		placeholder="Ваш мобильный"
		invalid={!$phone.valid}
		on:change={({ detail }) => ($phone.value = detail.unmaskedValue)}
	/>

	<Button
		{pending}
		class="tw-bg-blue tw-text-white tw-mt-3"
		disabled={!$loginForm.valid || pending}
	>
		Войти
	</Button>
</Form>
