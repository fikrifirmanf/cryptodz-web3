// /pages/_app.js
import App from 'next/app'
import Layout from '@/components/Layout/Layout' // Import your root layout component here
import '../pages/globals.css' // Import your global styles here

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
