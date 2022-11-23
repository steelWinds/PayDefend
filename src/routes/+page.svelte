<script lang="ts">
  import YMap from '$lib/Modules/YMap.svelte'

  
</script>

<YMap
  controls={['geolocationControl']}
  restrictMapArea={[
    [61.88, 129.37],
    [62.18, 130.14]
  ]}
  center={[50, 50]}
  zoom={1}
  class="tw-h-screen tw-w-full"
/>
