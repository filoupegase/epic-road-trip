import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '@/_core/styles/modern-normalize.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../_core/styles/theme';
import Layout from "../_common/components/Layout";


//https://nextjs.org/docs/basic-features/layouts#with-typescript
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{ page }</Layout>)

    return <ThemeProvider theme={ theme }>{ getLayout(<Component { ...pageProps } />) }</ThemeProvider>
}
