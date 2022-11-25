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
			transparent: 'transparent',
			green: 'rgb(102 204 153)',
			aqua: 'rgb(23 219 232)',
			x11: 'rgba(186 188 190 / .5)',
			blue: 'rgb(15 98 254 / 1)',
			'blue-crystal': 'rgb(15 98 254 / .6)',
			white: 'rgb(255 255 255)',
			'white-crystal': 'rgba(255 255 255 / .8)',
			red: 'rgba(204 51 0)'
		},

		transitionDuration: {
			50: '50ms',
			150: '150ms',
			250: '250ms',
			500: '500ms'
		}
	}
};
