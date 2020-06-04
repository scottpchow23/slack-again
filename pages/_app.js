import { SWRConfig } from "swr";
import fetch from "isomorphic-unfetch";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((resp) => resp.json()),
      }}
    >
      <Component {...pageProps} />;
    </SWRConfig>
  );
}

export default MyApp;
