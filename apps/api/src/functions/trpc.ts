import { appRouter, createLambdaContext } from "@spicy-soup/trpc";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: createLambdaContext,
});
