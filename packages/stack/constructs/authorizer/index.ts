import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { TokenAuthorizer } from "aws-cdk-lib/aws-apigateway";
import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import { LambdaRoute } from "../common/lambda-route";

export interface AuthorizerProps {
  routes: LambdaRoute[];
  environment: {
    userPoolId: string;
    userPoolClientId: string;
  };
  policies: PolicyStatement[];
}

export class ApiAuthorizer extends Construct {
  public authorizer: TokenAuthorizer;
  constructor(scope: Construct, id: string, props: AuthorizerProps) {
    super(scope, id);

    // Create Authorizer Lambda function
    const authorizerFunction = new NodejsFunction(this, "Function", {
      entry: join(__dirname, "./function.ts"),
      runtime: Runtime.NODEJS_16_X,
      environment: {
        region: Stack.of(this).region,
        CLIENT_ID: props.environment.userPoolClientId,
        USER_POOL_ID: props.environment.userPoolId,
        //TODO: figure out a better way to pass routes to handler
        ROUTES: JSON.stringify(
          props.routes.flatMap((route) =>
            route.methods.map((m) => `${route.resource}::${m}`)
          )
        ),
      },
      tracing: Tracing.ACTIVE,
    });
    props.policies.forEach((policy) => {
      authorizerFunction.addToRolePolicy(policy);
    });

    // Create HTTP Authorizer Handler
    this.authorizer = new TokenAuthorizer(this, "TokenAuth", {
      handler: authorizerFunction,
      validationRegex: "Bearer .*",
    });
  }
}
