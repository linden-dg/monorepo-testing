import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";

export const helloRouter = router({
  world: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => `Hello ${input.text ?? "World"}!!`),
});
