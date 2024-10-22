import { useEffect } from 'react'
import Header from './Header'

import '@fontsource/inter'
import Footer from './Footer'
import { Web3Modal } from '../Common/Web3Wallet'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function Layout({ children }) {
  useEffect(() => {
    // Client-side code that runs after hydration
  }, [])

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between pr-10 pl-10 pt-24 pb-10 sm:p-24 md:p-24 bg-gradient-to-br from-white via-cyan-200 to-green-200">
        <Web3Modal>{children}</Web3Modal>
      </main>
      {/* <Footer /> */}
    </>
  )
}
