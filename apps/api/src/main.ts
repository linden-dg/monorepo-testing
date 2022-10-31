import { createExpressMiddleware } from "@trpc/server/adapters/express";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import * as express from "express";
import { appRouter } from "@spicy-soup/trpc-server";

const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const getUser = () => {
    // if (req.headers.authorization !== "secret") {
    //   return null;
    // }
    return {
      user: {
        id: "pop",
        name: "Testing",
        email: "test@test.com",
        role: "admin",
      },
    };
  };

  return {
    req,
    res,
    session: getUser(),
  };
};
async function main() {
  // express implementation
  const app = express();

  app.use((req, _res, next) => {
    // request logger
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.get("/", (_req, res) => res.send("hello"));
  app.listen(2021, () => {
    console.log("listening on port 2021");
  });
}

main();
