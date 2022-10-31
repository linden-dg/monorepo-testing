import { publicProcedure } from "./utils/public-procedure";

export const healthCheck = publicProcedure.query(() => "woop woop!");
