<script lang="ts">
	import type { IUser } from '../modules/api/restdbio/Types';

	import { goto } from '$app/navigation';
	import useUsers from '@/modules/api/restdbio/useUsers';
	import toastConnector from '@/modules/toast-connector';
	import NotificationToast from '$lib/Modules/Toasts/NotificationToast.svelte';
	import authStore from '@/stores/auth';
	import RegForm from '$lib/Forms/RegForm.svelte';
	import LoginForm from '$lib/Forms/LoginForm.svelte';

	let isLogin = false;

	$: componentType = isLogin ? LoginForm : RegForm;
	$: callback = isLogin ? loginUser : regUser;

	const successToast = (msg: string) => {
		toastConnector(NotificationToast, {
			duration: 2500,
			title: msg,
			limit: true,
			classes: ['toast', 'success'],
			onpop: () => {
				goto('/map');
			}
		});
	};

	const errorToast = (e: any, clientMsg: string, serverMsg: string) => {
		const error = e as Response;

		const clientError = error.status < 500;
		const errorMsg = !clientError ? serverMsg : clientMsg;

		toastConnector(NotificationToast, {
			duration: 2500,
			title: errorMsg,
			limit: true,
			classes: ['toast', 'danger']
		});
	};

	const regUser = async (user: IUser) => {
		try {
			const result = (await useUsers('POST', user)) as IUser;

			successToast('Вы успешно зарегестрировались!');

			authStore.setUser(result);
		} catch (e) {
			errorToast(
				e,
				'Такой номер уже был зарегестрирован!',
				'Сервис временно недоступен'
			);
		}
	};

	const loginUser = async (user: IUser) => {
		try {
			const result = (await useUsers('GET', user)) as IUser;

			if (!result) throw new Error();

			successToast('Вы успешно авторизировались!');

			authStore.setUser(result);
		} catch (e) {
			errorToast(
				e,
				'Такого номера не существует!',
				'Сервис временно недоступен'
			);
		}
	};
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
	<div class="tw-flex tw-flex-col">
		<section class="tw-flex tw-items-center tw-space-x-6 tw-text-white tw-mb-3">
			<h1 class="tw-text-3xl tw-font-bold">PayDefend</h1>

			<img width="64" src="assets/logo-medium.png" alt="PayDefend logo" />
		</section>

		<svelte:component
			this={componentType}
			on:submit={(e) => callback(e.detail)}
		/>

		<button
			class="tw-text-white tw-self-center tw-mt-3"
			on:click={() => {
				isLogin = !isLogin;
			}}
		>
			{isLogin ? 'Зарегестрироваться' : 'Войти'}
		</button>
	</div>
</div>
