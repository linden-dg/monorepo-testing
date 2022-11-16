import type { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    console.log(`Event: ${JSON.stringify(event?.requestContext, null, 2)}`);
    return { statusCode: 200, body: JSON.stringify({ data: "popsicles" }) };
  } catch (e) {
    console.log(e);
    return { statusCode: 200, body: JSON.stringify({ data: "bananas" }) };
  }
};
