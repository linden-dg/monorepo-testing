import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerAuthSession } from "./get-server-auth-session";
// import { Session } from "next-auth";
// import { prisma } from "~/lib/prisma/prisma";
// import { getServerAuthSession } from "~/lib/trpc/get-server-auth-session";

type ISession = {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    groups?: string[];
  };
};
type CreateContextOptions = {
  session: ISession | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    // prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession(opts);

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContextInner>;
