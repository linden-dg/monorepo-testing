import { join } from "path";
import { HttpMethod } from "@spicy-soup/cdk/constructs";
import type { LambdaRoute } from "@spicy-soup/cdk/constructs";

export const lambdaRoutes: LambdaRoute[] = [
  {
    name: "trpcFunction",
    handler: join(__dirname, "../functions/trpc.ts"),
    resource: "trpc/{proxy+}",
    methods: [HttpMethod.GET, HttpMethod.POST],
  },
  {
    name: "testingFunction",
    handler: join(__dirname, "../functions/testing.ts"),
    resource: "testing",
    methods: [HttpMethod.GET],
  },
];
