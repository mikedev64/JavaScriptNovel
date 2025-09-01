// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'JavaScriptNovel',
			logo: {
				src: "./src/assets/library_editor__logo.png",
				alt: "JavaScriptNovel - Visual Novel Game Engine",
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/mikdev64/JavaScriptNovel' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
