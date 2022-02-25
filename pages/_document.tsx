import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import Script from "next/script";
type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="https://rsms.me/inter/inter.css"
            as="font"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
            rel="stylesheet"
          />
         <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
