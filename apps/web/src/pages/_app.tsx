import { Montserrat } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { trpc } from "~/utils/trpc-client";
import "@spicy-soup/theme/globals.scss";

const inter = Montserrat({ subsets: ["latin"] });

interface App
  extends AppProps<{
    session: unknown;
  }> {
  blah?: unknown;
  // Component: NextApplicationPage;
}

const App = ({ Component, pageProps }: App) => (
  <ThemeProvider attribute="class">
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  </ThemeProvider>
);

export default trpc.withTRPC(App);
