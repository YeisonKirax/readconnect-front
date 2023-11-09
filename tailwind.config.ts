import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'node_modules/daisyui/dist/**/*.js',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['valentine', 'dark'],
	},
};
export default config;
