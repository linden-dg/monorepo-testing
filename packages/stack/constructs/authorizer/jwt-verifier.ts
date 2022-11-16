import { CognitoJwtVerifier } from "aws-jwt-verify";

// Create the verifier outside the Lambda handler (= during cold start),
// so the cache can be reused for subsequent invocations. Then, only during the
// first invocation, will the verifier actually need to fetch the JWKS.
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID ?? "",
  clientId: process.env.CLIENT_ID ?? "",
  tokenUse: "id",
  // scope: "read",
});

interface Claim {
  sub: string;
  email?: string;
  family_name?: string;
  given_name?: string;
  "cognito:groups"?: string[];
}


export const verifyClaim = async (token: string) => {
  try {
    const claim: Claim = await jwtVerifier.verify(token);
    return {
      claim,
      error: null,
    };
  } catch (error) {
    return { error };
  }
};
