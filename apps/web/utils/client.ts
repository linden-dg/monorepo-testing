import type { AppRouter } from "@spicy-soup/trpc-server";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { GetInferenceHelpers } from "@trpc/server";
// import { transformer } from "@spicy-soup/trpc";
import superjson from "superjson";
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env["PORT"] ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      },
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});

export type TAppRouter = GetInferenceHelpers<AppRouter>;
