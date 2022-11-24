<script lang="ts">
	import YMap from '$lib/Modules/YMap.svelte';
</script>

<YMap
  state={{
    controls: ['geolocationControl'],
    center: [62.033, 129.73],
    zoom: 13
  }}
  options={{
    restrictMapArea: [
		[61.88, 129.37],
		[62.18, 130.14]
	]
  }}
	id="YKT-map"
	class="tw-h-screen tw-w-full"
  on:mapClick={(e) => {
    console.log(e.detail.yevent.get('coords'))
  }}
/>
