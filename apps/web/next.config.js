// @ts-check
const { env } = require("./env/server.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require("@nrwl/next/plugins/with-nx");

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

module.exports = withNx(
  getConfig({
    /**
     * Dynamic configuration available for the browser and server.
     * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
     * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
     */
    publicRuntimeConfig: {
      NODE_ENV: env.NODE_ENV,
    },
    // sassOptions: {
    //   includePaths: [path.join(__dirname, 'path_to_scss_folder')]
    // },
    reactStrictMode: true,
  })
);
