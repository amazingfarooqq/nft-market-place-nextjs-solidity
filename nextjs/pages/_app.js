import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ContextAPIProvider } from '../lib/context/ContextAPI'
import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }) {
  return (

    <Web3ReactProvider getLibrary={getLibrary}>
      <ContextAPIProvider>
        <Component {...pageProps} />
      </ContextAPIProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
