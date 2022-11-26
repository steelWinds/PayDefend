<script lang="ts">
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { successToast, errorToast } from '@/configs/svelte-toasts/toasts';
	import SignUpForm from '@/lib/Forms/SignUpForm.svelte';
	import SignInForm from '@/lib/Forms/SignInForm.svelte';

	let isLogin = false;
</script>

<div class="tw-fixed tw-h-full tw-w-full map-image" aria-hidden />

<div
	class="
    tw-fixed
    tw-w-full
    tw-h-full
    tw-grid
    tw-place-items-center
    tw-bg-blue-crystal
    tw-backdrop-blur
  "
>
	<div class="tw-flex tw-flex-col tw-max-w-md tw-w-full tw-p-2">
		<section class="tw-flex tw-items-center tw-space-x-6 tw-text-white tw-mb-3">
			<h1 class="tw-text-3xl tw-font-bold">PayDefend</h1>

			<img width="64" src="assets/logo-medium.png" alt="PayDefend logo" />
		</section>

		<div class="out-in-transition">
			{#if isLogin}
				<div transition:fly={{ x: 100 }}>
					<SignInForm
						class="tw-w-full"
						on:success={() =>
							successToast('Успешная авторизация', () => goto('/map'))}
						on:error={(e) => errorToast('Такого пользователя не существует')}
					/>
				</div>
			{:else}
				<div transition:fly={{ x: -100 }}>
					<SignUpForm
						class="tw-w-full"
						on:success={() =>
							successToast('Успешная регистрация', () => goto('/map'))}
						on:error={(e) => errorToast('Такой пользователь уже существует')}
					/>
				</div>
			{/if}
		</div>

		{#key isLogin}
			<button
				in:fly={{ y: -20 }}
				class="tw-inline-block tw-text-white tw-self-center tw-mt-3"
				on:click={() => {
					isLogin = !isLogin;
				}}
			>
				{isLogin ? 'Зарегестрироваться' : 'Войти'}
			</button>
		{/key}
	</div>
</div>
