import '../styles/index.css'
import React from 'react'
import App from 'next/app'
import NProgressHandler from 'components/NProgressHandler'
import Head from 'next/head'
import { Libre_Baskerville, Raleway } from 'next/font/google'
import cx from 'classnames'
import { AuthContextProvider } from 'context/auth'
import { Toaster } from 'components/Toast'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line global-require
  require('mocks')
}

const fontSans = Raleway({
  variable: '--font-raleway',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const fontSerif = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Résumé Builder</title>
          <meta content="Résumé Builder" property="og:title" />
          <meta content="@dwarvesf" name="twitter:site" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="Résumé Builder" name="description" />
          <meta content="Résumé Builder" property="og:description" />
          <meta content="/thumbnail.jpeg" property="og:image" />
          <meta content="/thumbnail.jpeg" name="twitter:image" />
        </Head>
        <div
          className={cx(
            fontSans.className,
            fontSans.variable,
            fontSerif.variable,
          )}
        >
          <AuthContextProvider>
            <NProgressHandler />
            <Component {...pageProps} />
          </AuthContextProvider>
          <Toaster />
        </div>
      </>
    )
  }
}
export default MyApp
