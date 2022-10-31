import { TRPCError } from "@trpc/server";
import { middleware } from "../../lib/trpc";
import { loggedProcedure } from "./logged-procedure";

const isAuthenticated = middleware(async ({ ctx, next }) => {
  /*
    The session & user checks are a bit redundant in combination with the `isAuthenticated` policy,
     but it forces the downstream TS resolvers to know that session.user is not null
  */
  if (
    !ctx.session ||
    !ctx.session.user
    // !POLICIES.isAuthenticated({ session: ctx.session })
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = loggedProcedure.use(isAuthenticated);
