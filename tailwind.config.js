/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/utils/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		fontFamily: {
			'fuente-raleway': [`Raleway`, `sans-serif`],
			'fuente-montserrat': [`Montserrat`, `sans-serif`],
			'fuente-roboto': [`Roboto`, `sans-serif`]
		},
		extend: {
			colors: {
			},
			blur: {
				xs: '1px',
			},
			backgroundImage: {
				'cabecera': `url('/background.jpg')`
			},
			width: {
			},
			height: {
			},
			maxHeight: {
			}
		}
	},
	variants: {
		backgroundColor: ['checked'],
		borderColor: ['checked'],
		opacity: ['disabled'],
		display: ['group-hover']
	},
	plugins: [
	]
}
