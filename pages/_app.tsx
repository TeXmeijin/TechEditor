import { AppProps } from "next/app";
import "../styles/base/reset.scss";
import 'react-markdown-editor-lite/lib/index.css';
import "../styles/markdownEditor/override.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
