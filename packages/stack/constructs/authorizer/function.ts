import type {
  APIGatewayAuthorizerCallback,
  APIGatewayEventDefaultAuthorizerContext,
} from "aws-lambda";
import type { APIGatewayTokenAuthorizerEvent } from "aws-lambda/trigger/api-gateway-authorizer";
import { AuthPolicy } from "./auth-policy";
import { verifyClaim } from "./jwt-verifier";
import { HttpMethod } from "../common/http-methods";

const tokenPrefix = "Bearer ";

const lambdaRoutes: [string, HttpMethod][] = (
  JSON.parse(process.env.ROUTES ?? "[]") || []
).map((r: string) => r.split("::"));

// NOTE: Using the following blueprint as a base:
// - https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints/blob/master/blueprints/nodejs/index.js

type LambdaHandler = (
  event: APIGatewayTokenAuthorizerEvent,
  context: APIGatewayEventDefaultAuthorizerContext,
  callback: APIGatewayAuthorizerCallback
) => Promise<void>;
export const handler: LambdaHandler = async (event, context, callback) => {
  // Do not print the auth token unless absolutely necessary
  // console.log('Client token: ' + event.authorizationToken);
  console.log("Method ARN: " + event.methodArn);

  // validate the incoming token
  // and produce the principal user identifier associated with the token
  if (!event.authorizationToken.startsWith(tokenPrefix)) {
    console.error("Token must be a bearer token");
    callback("Unauthorized", undefined);
  }
  const token = event.authorizationToken.slice(tokenPrefix.length);

  const { claim, error } = await verifyClaim(token);

  // checking claim is for type safety further down
  if (error || !claim) {
    console.error(`Error decoding token: ${error}`);
    callback("Unauthorized", undefined);
    return;
  }
  const claimString = JSON.stringify(claim);
  console.log(`Decoded: ${claimString}`);

  // this could be accomplished in a number of ways:
  // 1. Call out to OAuth provider
  // 2. Decode a JWT token inline
  // 3. Lookup in a self-managed DB
  const principalId = claim.sub;

  // Unpack attributes
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { email, given_name, family_name } = claim;
  const groups = claim["cognito:groups"];

  // you can send a 401 Unauthorized response to the client by failing like so:
  // callback("Unauthorized", null);

  // if the token is valid, a policy must be generated which will allow or deny access to the client

  // if access is denied, the client will receive a 403 Access Denied response
  // if access is allowed, API Gateway will proceed with the backend integration configured on the method that was called

  // build apiOptions for the AuthPolicy
  const tmp = event.methodArn.split(":");
  const apiGatewayArnTmp = tmp[5].split("/");
  const apiOptions = {
    region: tmp[3],
    restApiId: apiGatewayArnTmp[0],
    stage: apiGatewayArnTmp[1],
  };

  const awsAccountId = tmp[4];
  // const method = apiGatewayArnTmp[2];
  // let resource = "/"; // root resource
  // if (apiGatewayArnTmp[3]) {
  //   resource += apiGatewayArnTmp.slice(3, apiGatewayArnTmp.length).join("/");
  // }

  // this function must generate a policy that is associated with the recognized principal user identifier.
  // depending on your use case, you might store policies in a DB, or generate them on the fly

  // keep in mind, the policy is cached for 5 minutes by default (TTL is configurable in the authorizer)
  // and will apply to subsequent calls to any method/resource in the RestApi
  // made with the same token

  // the example policy below denies access to all resources in the RestApi
  const policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
  // policy.denyAllMethods();

  lambdaRoutes.forEach(([resource, method]) => {
    const cleanedResource = resource.replace("{proxy+}", "*");
    policy.allowMethod(method, cleanedResource);
  });

  // finally, build the policy
  const authResponse = policy.build();

  // new! -- add additional key-value pairs
  // these are made available by APIGW like so: $context.authorizer.<key>
  // additional context is cached
  authResponse.context = {
    email,
    given_name,
    family_name,
    // Groups is comma-separated otherwise won't be accepted by API Gateway
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "cognito:groups": groups ? groups.join(",") : null,
  };
  // authResponse.context.arr = ['foo']; <- this is invalid, APIGW will not accept it
  // authResponse.context.obj = {'foo':'bar'}; <- also invalid

  console.log(`Auth Res: ${JSON.stringify(authResponse, null, 2)}`);

  callback(null, authResponse);
};
