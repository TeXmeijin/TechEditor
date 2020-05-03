import { AppProps } from "next/app";
import "../styles/base/reset.scss";

import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "../styles/markdownEditor/override.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
