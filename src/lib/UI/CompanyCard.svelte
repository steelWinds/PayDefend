<script lang="ts">
	import type { IOrganizationFeature } from '@/modules/api/ymaps/Types';

	import { parseURL, normalizeURL, withQuery } from 'ufo';

	const getFaviconURL = import.meta.env.VITE_GET_FAVICON_URL;

	export let company: IOrganizationFeature;

	let companyMetaData = company.properties.CompanyMetaData;

	const buildURLToFavicon = () => {
		const parentURLHost = parseURL(companyMetaData.url).host;

		if (!parentURLHost) return '';

		console.log(withQuery(getFaviconURL, { domain: parentURLHost }));

		return withQuery(getFaviconURL, { domain: parentURLHost });
	};
</script>

<article class="tw-flex">
	<img src={`${buildURLToFavicon()}`} />
</article>
