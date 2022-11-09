import type { DefaultSeoProps } from 'next-seo'

const SEO: DefaultSeoProps = {
	defaultTitle: 'Gestion de PDFS',
	titleTemplate: '%s | Gestion de PDFS',
	description: 'Gestion de PDFS',
	additionalLinkTags: [{
		rel: 'icon',
		href: '/favicon/favicon-32x32.png',
		type: 'image/png',
		sizes: '32x32'
	}, {
		rel: 'icon',
		href: '/favicon/favicon-16x16.png',
		type: 'image/png',
		sizes: '16x16'
	}, {
		rel: 'apple-touch-icon',
		href: '/favicon/android-chrome-192x192.png',
		type: 'image/png',
		sizes: '192x192'
	}, {
		rel: 'manifest',
		href: '/favicon/site.webmanifest'
	}]
}

export default SEO
