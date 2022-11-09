import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps (ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return initialProps
	}

	render (): JSX.Element {
		return (
			<Html lang='es'>
				<Head />
				<body>
					<Main />
					<div id='modal' />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
