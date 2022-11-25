<script lang="ts">
	import ImaskInput from '$lib/Modules/Input.svelte';
	import Button from '$lib/UI/Button.svelte';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import { createEventDispatcher } from 'svelte';

	interface IResponse {
		phone: string;
		name: string;
	}

	interface $$Events {
		submit: CustomEvent<IResponse>;
	}

	const dispatch = createEventDispatcher();

	const phone = field('phone', '', [required()]);
	const name = field('name', '', [required()]);
	const authForm = form(phone, name);

	const onSubmit = async () => {
		await authForm.validate();

		if (!$authForm.valid) return;

		dispatch('submit', {
			name: $name.value,
			phone: $phone.value
		});
	};
</script>

<div class="tw-flex tw-flex-col">
	<ImaskInput
		class="tw-mb-2 tw-p-3 custom-input"
		value={$phone.value}
		mask={'{+7} (000) 000-00-00'}
		placeholder="Введите свой номер"
		invalid={!$phone.valid}
		on:change={({ detail }) => ($phone.value = detail.value)}
	/>

	<ImaskInput
		bind:value={$name.value}
		placeholder="Введите своё имя"
		mask={/^\S*$/}
		class="tw-capitalize tw-p-3 custom-input"
		invalid={!$name.valid}
		on:change={({ detail }) => ($name.value = detail.value)}
	/>

	<Button
		class="tw-bg-blue tw-text-white tw-mt-3"
		on:click={onSubmit}
		disabled={!$authForm.valid}
	>
		Зарегестрироваться
	</Button>
</div>
