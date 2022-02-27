import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Script from 'next/script'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></Script>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
