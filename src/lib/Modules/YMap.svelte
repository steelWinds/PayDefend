<script lang="ts">
  import { onMount } from 'svelte'
  import initMap from '@/modules/ymaps'

  export let id: string;
  export let center: [number, number];
  export let zoom: number;
  export let controls: string[] | undefined;
  export let restrictMapArea: [[number, number], [number, number]] | undefined;
  export let map: any;

  $: mapId = `map-cart_${id}` 

  const API_KEY = import.meta.env.VITE_YANDEX_API_KEY

  onMount(async () => {
    map = await initMap(API_KEY, {
      center,
      zoom,
      controls,
      restrictMapArea,
      id: mapId
    })
  })
</script>

<div 
  class={$$restProps.class}
  id={mapId}
  role="application"
  aria-label="Interactive map's element"
>
  <!-- Yandex-Map content -->
</div>