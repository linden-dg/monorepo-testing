import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc-client";
import "@spicy-soup/theme/globals.scss";

interface App
  extends AppProps<{
    session: unknown;
  }> {
  blah?: unknown;
  // Component: NextApplicationPage;
}

const App = ({ Component, pageProps }: App) => (
  <>
    <Component {...pageProps} />
  </>
);

export default trpc.withTRPC(App);
