import { t, middleware } from "../lib/trpc";

const logger = middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  result.ok
    ? console.log("OK request timing:", { path, type, durationMs })
    : console.log("Non-OK request timing", { path, type, durationMs });

  return result;
});

export const loggedProcedure = t.procedure.use(logger);
