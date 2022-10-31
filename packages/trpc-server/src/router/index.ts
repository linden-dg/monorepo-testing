import { router } from "../lib/trpc";
import { healthCheck } from "./health";
import { helloRouter } from "./subroutes/hello";

export const appRouter = router({
  healthz: healthCheck,
  hello: helloRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
