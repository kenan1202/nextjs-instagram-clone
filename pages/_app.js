import '../styles/globals.css'
import Head from 'next/head'
import ModalProvider from '../context/modalContext'
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <UserProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </UserProvider>
    </>
  )
  

}

export default MyApp
