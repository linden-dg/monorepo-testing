import { publicProcedure } from "../procedures/public";

export const healthCheck = publicProcedure.query(() => "woop woop!")
