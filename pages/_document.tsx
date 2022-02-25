import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
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
