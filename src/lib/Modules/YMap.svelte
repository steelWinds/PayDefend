<script lang="ts">
	import type { IEvent, IMapState, IMapOptions } from 'yandex-maps';

	import { onMount, createEventDispatcher } from 'svelte';
	import initMap from '@/modules/ymaps';
  import BarLoader from '../UI/BarLoader.svelte';

	interface $$Events {
		mapClick: CustomEvent<{
			yevent: IEvent;
		}>;
	}

	export let id: string;
	export let state: IMapState;
	export let options: IMapOptions;
	export let handlers: boolean;

	const dispatch = createEventDispatcher();

	export let map: any;

	$: mapId = `map-cart_${id}`;

	const API_KEY = import.meta.env.VITE_YANDEX_API_KEY;

	const handler = (yevent: IEvent) => {
		dispatch('mapClick', {
			yevent
		});
	};

	onMount(() => {
		map = initMap(API_KEY, {
			state,
			options,
			id: mapId,
			event: handlers
				? {
						name: 'click',
						handler
				  }
				: undefined
		});
	});
</script>

{#await map}
  <div class="tw-fixed tw-w-full tw-h-full tw-grid tw-place-items-center">
    <BarLoader size="100" />
  </div>
{/await}

<div
    class={$$restProps.class}
    id={mapId}
    role="application"
    aria-label="Interactive map's element"
  >
    <!-- Yandex-Map content -->
  </div>
