import { z } from "zod";
import { router } from "../lib/trpc";
import { loggedProcedure } from "../procedures/logger";

export const helloRouter = router({
  world: loggedProcedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => `Hello ${input?.text ?? "World"}!!`),
});
