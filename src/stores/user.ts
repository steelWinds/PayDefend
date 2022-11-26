import { derived } from 'svelte/store';
import authStore from './auth';

const userStore = derived(authStore, ($store) => $store?.user);

export default userStore;
