import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import * as config from '../_core/config';

//https://nextjs.org/docs/advanced-features/custom-document
export default function Document() {
    return (
        <Html lang={ config.siteLocale }>
            <Head />
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
