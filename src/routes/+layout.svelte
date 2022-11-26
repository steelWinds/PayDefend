<script lang="ts">
  import { onMount } from 'svelte'
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import config from '@/configs/svelte-toasts/svelte-toast-config';
	import pointsStore from '@/stores/points';

	import '../app.css';

  onMount(() => {
    pointsStore.updatePoints();
  })
</script>

<main data-sveltekit-prefetch>
	<slot />

	<div class="custom-toast">
		<SvelteToast options={config(1000)} />
	</div>
</main>
