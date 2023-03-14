import * as React from 'react';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import theme from '../_core/styles/theme';
import * as config from '../_core/config';


interface MyDocumentProps extends DocumentProps {
    styledComponentsTags: JSX.Element[];
}

//https://nextjs.org/docs/advanced-features/custom-document
export default function MyDocument({ styledComponentsTags }: MyDocumentProps) {
    return (
        <Html lang={ config.siteLocale }>
            <Head>
                {/* PWA primary color */ }
                <meta name="theme-color" content={ theme.palette.primary.main } />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="emotion-insertion-point" content="" />

            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}


// import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
// import { ServerStyleSheet } from 'styled-components'
//
//
// export default class MyDocument extends Document { static async getInitialProps( ctx: DocumentContext ): Promise<DocumentInitialProps> {
//         const sheet = new ServerStyleSheet()
//         const originalRenderPage = ctx.renderPage
//
//         try {
//             ctx.renderPage = () =>
//                 originalRenderPage({
//                     enhanceApp: (App) => (props) =>
//                         sheet.collectStyles(<App { ...props } />),
//                 })
//
//             const initialProps = await Document.getInitialProps(ctx)
//             return {
//                 ...initialProps,
//                 styles: (
//                     <>
//                         { sheet.getStyleElement() }
//                         { initialProps.styles }
//                     </>
//                 ),
//             }
//         } finally {
//             sheet.seal()
//         }
//     }
// }
