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

		//colors: {},

		transitionDuration: {
			50: '50ms',
			150: '150ms',
			250: '250ms',
			500: '500ms'
		}
	}
};