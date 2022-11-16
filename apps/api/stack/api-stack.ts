import { ApiAuthorizer, Cognito, Warmer } from "@spicy-soup/cdk/constructs";
import { importXrayPolicy } from "@spicy-soup/cdk/helpers";
import type { StackProps } from "aws-cdk-lib";
import { CfnOutput, Duration, Stack } from "aws-cdk-lib";
import { Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";
import { lambdaRoutes } from "../src/config/routes";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Fetch some base resources.
    const xray = importXrayPolicy();

    // Fetch the VPC.
    const vpc = Vpc.fromLookup(this, "vpc", {
      vpcId: "vpc-045004ec7e3b80270",
    });

    // Create the Security Group.
    const securityGroup = new SecurityGroup(this, "securityGroup", {
      vpc,
      securityGroupName: "spicy-soup",
      description: "Generic all-purpose internal group",
      allowAllOutbound: true,
    });
    securityGroup.addIngressRule(
      securityGroup,
      Port.allTraffic(),
      "Allow all inbound in the same SG"
    );

    // Fetch an AppConfig Layer.
    // const appConfig = new AppConfig(this, "appconfigLayer");

    // Fetch the DNS Zone.
    // const zone = HostedZone.fromLookup(this, "dnsZone", {
    //   domainName: "test.synergia.dev",
    // });

    // Ensure there is a Certificate and fetch the ARN.
    // const certificate = new DnsValidatedCertificate(this, "sslCertificate", {
    //   domainName: "test.synergia.dev",
    //   hostedZone: zone,
    //   region: Aws.REGION,
    // });

    // Create the Cognito User Pool & Client
    const cognito = new Cognito(this, "CognitoPool", {
      appUrl: "test.synergia.dev",
      supportEmail: "support@synergia.dev",
    });

    const apiAuth = new ApiAuthorizer(this, "Authorizer", {
      routes: lambdaRoutes,
      policies: [xray],
      environment: {
        userPoolClientId: cognito.userPoolClientId,
        userPoolId: cognito.userPoolId,
      },
    });

    const restApi = new RestApi(this, "spicy-soup", {
      defaultCorsPreflightOptions: {
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: ["*"],
        allowHeaders: ["*"],
        allowCredentials: false,
        maxAge: Duration.hours(1),
      },
      deployOptions: {
        stageName: "dev",
      },
      defaultMethodOptions: {
        authorizer: apiAuth.authorizer,
      },
    });

    lambdaRoutes.forEach((route) => {
      const resource = restApi.root.resourceForPath(route.resource);

      const fn = new NodejsFunction(this, route.name, {
        runtime: Runtime.NODEJS_16_X,
        entry: route.handler,
        tracing: Tracing.ACTIVE,
      });

      fn.addToRolePolicy(xray);
      // fn.addToRolePolicy(appConfig.policy);
      // fn.addToRolePolicy(
      //   new PolicyStatement({
      //     resources: ["*"],
      //     actions: ["secretsmanager:GetSecretValue"],
      //     effect: Effect.ALLOW,
      //   })
      // );

      const integration = new LambdaIntegration(fn, {
        proxy: true,
      });
      route.methods.forEach((method) => {
        resource.addMethod(method, integration, {
          authorizer: apiAuth.authorizer,
        });
      });

      if (route.warmer) {
        new Warmer(this, `${route.name}Warmer`, {
          concurrency: 5,
          function: fn,
        });
      }
    });

    new CfnOutput(this, "RestApiUrl", {
      value: restApi.url,
      exportName: "RestApiUrl",
    });
  }
}
