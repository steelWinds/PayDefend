<script lang="ts">
	import ImaskInput from '$lib/Modules/Input.svelte';
	import Button from '$lib/UI/Button.svelte';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { createEventDispatcher } from 'svelte';

	interface IResponse {
		phone: string;
	}

	interface $$Events {
		submit: CustomEvent<IResponse>;
	}

	const dispatch = createEventDispatcher();

	const phone = field('phone', '', [required()]);
	const loginForm = form(phone);

	const onSubmit = async () => {
		await loginForm.validate();

		if (!$loginForm.valid) return;

		dispatch('submit', {
			phone: $phone.value
		});
	};
</script>

<div class="tw-flex tw-flex-col">
	<ImaskInput
		class="tw-p-3 custom-input"
		value={$phone.value}
		mask={'{+7} (000) 000-00-00'}
		placeholder="Введите свой номер"
		invalid={!$phone.valid}
		on:change={({ detail }) => ($phone.value = detail.value)}
	/>

	<Button
		class="tw-bg-blue tw-text-white tw-mt-3"
		on:click={onSubmit}
		disabled={!$loginForm.valid}
	>
		Войти
	</Button>
</div>
