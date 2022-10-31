import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import type { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayEvent } from "aws-lambda";
import { appRouter } from "@spicy-soup/trpc-server";

interface AuthorizerContext {
  /* eslint-disable @typescript-eslint/naming-convention */
  "cognito:groups": null | string;
  principalId: string;
  given_name: string;
  family_name: string;
  email: string;
}
/* eslint-enable */

const createContext = ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayEvent>) => {
  const getUser = () => {
    const authContext = event.requestContext.authorizer as AuthorizerContext;

    return authContext
      ? {
          user: {
            id: authContext.principalId,
            name: `${authContext.given_name} ${authContext.family_name}`,
            email: authContext.email,
            groups: authContext["cognito:groups"]?.split(","),
          },
        }
      : null;
  };

  return {
    event,
    apiVersion: (event as { version?: string }).version || "1.0",
    session: getUser(),
  };
};

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
