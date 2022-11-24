/** @type {import('tailwindcss').Config} */
module.exports = {
	//darkMode: 'class',
	prefix: 'tw-',
	important: true,
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	theme: {
		extend: {
			screens: {
				'ultra-mobile': '300px',
				mobile: '464px',
				tablet: '672px',
				laptop: '1024px',
				desktop: '1240px',
				'ultra-desktop': '1440px'
			}
		},

		colors: {
			teel: 'rgb(32 229 194)',
			green: 'rgb(61 232 34)',
			aqua: 'rgb(23 219 232)',
			x11: 'rgba(186 188 190 / .6)',
			white: 'rgb(255 255 255)',
			'raisin-black': 'rgb(36 33 36)',
			'white-crystal': 'rgba(255 255 255 / .8)'
		},

		transitionDuration: {
			50: '50ms',
			150: '150ms',
			250: '250ms',
			500: '500ms'
		}
	}
};
