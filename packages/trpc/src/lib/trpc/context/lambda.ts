import type { CreateAWSLambdaContextOptions } from "@trpc/server/dist/adapters/aws-lambda";
import type { APIGatewayProxyEventBase } from "aws-lambda/trigger/api-gateway-proxy";
import type { CreateContextOptions } from "./common";

interface AuthorizerContext {
  principalId: string;
  email: string;

  /* eslint-disable @typescript-eslint/naming-convention */
  "cognito:groups": null | string;
  given_name?: string;
  family_name?: string;
  /* eslint-enable */
}

export const createLambdaContext = ({
  event,
}: CreateAWSLambdaContextOptions<
  APIGatewayProxyEventBase<AuthorizerContext>
>) => {
  const getSession = (): CreateContextOptions["session"] => {
    const authContext = event.requestContext.authorizer;

    return authContext
      ? {
          user: {
            id: authContext?.principalId,
            name: `${authContext?.given_name} ${authContext?.family_name}`,
            email: authContext?.email,
            groups: authContext["cognito:groups"]?.split(","),
          },
        }
      : null;
  };

  return {
    event,
    apiVersion: (event as { version?: string }).version || "1.0",
    session: getSession(),
  };
};
