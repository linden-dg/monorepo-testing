import { trpc } from "@spicy-soup/trpc/client";
import type { AppProps } from "next/app";
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
