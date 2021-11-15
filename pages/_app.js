import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp

