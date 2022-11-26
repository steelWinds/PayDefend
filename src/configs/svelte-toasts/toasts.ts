import toastConnector from '../../modules/toast-connector';
import NotificationToast from '$lib/Modules/Toasts/NotificationToast.svelte';

const successToast = (msg: string, callback: () => void) => {
	toastConnector(NotificationToast, {
		duration: 2500,
		title: msg,
		limit: true,
		classes: ['toast', 'success'],
		onpop: () => {
			callback?.();
		}
	});
};

const errorToast = (fallbackMsg: string) => {
	toastConnector(NotificationToast, {
		duration: 2500,
		title: fallbackMsg,
		limit: true,
		classes: ['toast', 'danger']
	});
};

export { successToast, errorToast };
