import { AppProps } from "next/app";
import "react-markdown-editor-lite/lib/index.css";
import "../styles/markdownEditor/override.css"
import "../styles/base/reset.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
