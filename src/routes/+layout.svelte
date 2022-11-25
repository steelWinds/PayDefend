<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import config from '@/configs/svelte-toast-config';

	import '../app.css';
</script>

<main data-sveltekit-prefetch>
	<slot />

	<div class="custom-toast">
		<SvelteToast options={config(1000)} />
	</div>
</main>
