<script lang="ts">
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Navigation } from 'swiper';

	// Import Swiper styles
	import 'swiper/css';

	type T = $$Generic;

	export let items: T[];
	export let visibleItems = 3;
</script>

{#if items?.length}
	<div class={`tw-relative tw-flex tw-flex-col tw-w-full ${$$restProps.class}`}>
		<Swiper
			modules={[Navigation]}
			navigation={{
				nextEl: '.next-arr',
				prevEl: '.prev-arr'
			}}
			loop
			class="tw-w-full"
			spaceBetween={50}
			slidesPerView={visibleItems}
		>
			{#each items as item, idx (idx)}
				<SwiperSlide>
					<slot {item} />
				</SwiperSlide>
			{/each}
		</Swiper>

		<div
			class="
      tw-mx-auto
      tw-mt-3
      tw-space-x-3
    "
		>
			<button
				class="
          tw-group
          prev-arr
          tw-bg-blue
          tw-p-2
          tw-aspect-square
          tw-rounded-full
          tw--rotate-90
        "
			>
				<svg
					class="
            tw-transition-all
            tw-duration-500
            tw-w-[24px]
            tw-fill-white
          "
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 47.255 47.255"
				>
					<path
						d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
					/>
				</svg>
			</button>

			<button
				class="
          tw-group
          next-arr
          tw-bg-blue
          tw-p-2
          tw-aspect-square
          tw-rounded-full
          tw-rotate-90
        "
			>
				<svg
					class="
            tw-transition-all
            tw-duration-500
            tw-w-[24px]
            tw-fill-white
          "
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 47.255 47.255"
				>
					<path
						d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}
