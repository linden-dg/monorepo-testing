import { middleware } from "../../lib/trpc";
import { publicProcedure } from "./public-procedure";

const logger = middleware(async ({ path, type, next, ctx }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  result.ok
    ? console.log("✅ ", "OK request timing:", {
        path,
        type,
        durationMs,
        authContext: ctx.session ? ctx.session.user : null,
      })
    : console.log("❌ ", "Non-OK request timing", { path, type, durationMs });

  return result;
});

export const loggedProcedure = publicProcedure.use(logger);
