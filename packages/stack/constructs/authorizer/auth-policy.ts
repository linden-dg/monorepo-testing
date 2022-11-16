import type { APIGatewayAuthorizerResult } from "aws-lambda/trigger/api-gateway-authorizer";
import { HttpMethod } from "../common/http-methods";

interface Condition {
  [key: string]: string | string[];
}

type AuthConditions = Condition | Condition[] | null;

type AuthMethod = { conditions: AuthConditions; resourceArn: string };

/* eslint-disable @typescript-eslint/naming-convention */
type AuthStatement = {
  Action: string;
  Effect: string;
  Resource: string[];
  Condition?: AuthConditions;
};

/* eslint-enable @typescript-eslint/naming-convention */

/**
 * AuthPolicy receives a set of allowed and denied methods and generates a valid
 * AWS policy for the API Gateway authorizer. The constructor receives the calling
 * user principal, the AWS account ID of the API owner, and an apiOptions object.
 * The apiOptions can contain an API Gateway RestApi Id, a region for the RestApi, and a
 * stage that calls should be allowed/denied for. For example
 * {
 *   restApiId: "xxxxxxxxxx",
 *   region: "us-east-1",
 *   stage: "dev"
 * }
 *
 * var testPolicy = new AuthPolicy("[principal user identifier]", "[AWS account id]", apiOptions);
 * testPolicy.allowMethod(AuthPolicy.HttpVerb.GET, "/users/username");
 * testPolicy.denyMethod(AuthPolicy.HttpVerb.POST, "/pets");
 * context.succeed(testPolicy.build());
 *
 * @class AuthPolicy
 * @constructor
 */
export class AuthPolicy {
  private readonly awsAccountId: string;
  private readonly principalId: string;
  private readonly version: string;
  private readonly pathRegex: RegExp;
  private readonly allowMethods: AuthMethod[];
  private readonly denyMethods: AuthMethod[];
  private readonly restApiId: string;
  private readonly region: string;
  private readonly stage: string;

  constructor(
    principal: string,
    awsAccountId: string,
    apiOptions: {
      restApiId?: string;
      region?: string;
      stage?: string;
    }
  ) {
    /**
     * The AWS account id the policy will be generated for. This is used to create
     * the method ARNs.
     *
     * @property awsAccountId
     * @type {String}
     */
    this.awsAccountId = awsAccountId;

    /**
     * The principal used for the policy, this should be a unique identifier for
     * the end user.
     *
     * @property principalId
     * @type {String}
     */
    this.principalId = principal;

    /**
     * The policy version used for the evaluation. This should always be "2012-10-17"
     *
     * @property version
     * @type {String}
     * @default "2012-10-17"
     */
    this.version = "2012-10-17";

    /**
     * The regular expression used to validate resource paths for the policy
     *
     * @property pathRegex
     * @type {RegExp}
     * @default '^\/[/.a-zA-Z0-9-\*]+$'
     */
    this.pathRegex = new RegExp("^[/.a-zA-Z0-9-*?]+$");

    // these are the internal lists of allowed and denied methods. These are lists
    // of objects and each object has 2 properties: A resource ARN and a nullable
    // conditions statement.
    // the build method processes these lists and generates the approriate
    // statements for the final policy
    this.allowMethods = [];
    this.denyMethods = [];

    if (!apiOptions || !apiOptions.restApiId) {
      // Replace the placeholder value with a default API Gateway API id to be used in the policy.
      // Beware of using '*' since it will not simply mean any API Gateway API id, because stars will greedily expand over '/' or other separators.
      // See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html for more details.
      this.restApiId = "<<restApiId>>";
    } else {
      this.restApiId = apiOptions.restApiId;
    }
    if (!apiOptions || !apiOptions.region) {
      // Replace the placeholder value with a default region to be used in the policy.
      // Beware of using '*' since it will not simply mean any region, because stars will greedily expand over '/' or other separators.
      // See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html for more details.
      this.region = "<<region>>";
    } else {
      this.region = apiOptions.region;
    }
    if (!apiOptions || !apiOptions.stage) {
      // Replace the placeholder value with a default stage to be used in the policy.
      // Beware of using '*' since it will not simply mean any stage, because stars will greedily expand over '/' or other separators.
      // See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html for more details.
      this.stage = "<<stage>>";
    } else {
      this.stage = apiOptions.stage;
    }
  }

  /**
   * Adds a method to the internal lists of allowed or denied methods. Each object in
   * the internal list contains a resource ARN and a condition statement. The condition
   * statement can be null.
   *
   * @method addMethod
   * @param effect {String} The effect for the policy. This can only be "Allow" or "Deny".
   * @param verb {HttpMethod} The HTTP verb for the method, this should ideally come from the
   *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
   * @param resource {String} The resource path. For example "/pets"
   * @param conditions {AuthConditions} The conditions object in the format specified by the AWS docs.
   * @return {void}
   */
  private addMethod(
    effect: string,
    verb: HttpMethod,
    resource: string,
    conditions: AuthConditions
  ) {
    if (verb != "*" && !(verb in HttpMethod)) {
      throw new Error(
        "Invalid HTTP verb " + verb + ". Allowed verbs in AuthPolicy.HttpVerb"
      );
    }

    if (!this.pathRegex.test(resource)) {
      throw new Error(
        "Invalid resource path: " +
          resource +
          ". Path should match " +
          this.pathRegex
      );
    }

    let cleanedResource = resource;
    if (resource.substring(0, 1) == "/") {
      cleanedResource = resource.substring(1, resource.length);
    }
    const cleanedVerb = verb === HttpMethod.ANY ? "*" : verb;
    const resourceArn =
      "arn:aws:execute-api:" +
      this.region +
      ":" +
      this.awsAccountId +
      ":" +
      this.restApiId +
      "/" +
      this.stage +
      "/" +
      cleanedVerb +
      "/" +
      cleanedResource;

    if (effect.toLowerCase() == "allow") {
      this.allowMethods.push({
        resourceArn: resourceArn,
        conditions: conditions,
      });
    } else if (effect.toLowerCase() == "deny") {
      this.denyMethods.push({
        resourceArn: resourceArn,
        conditions: conditions,
      });
    }
  }

  /**
   * Returns an empty statement object prepopulated with the correct action and the
   * desired effect.
   *
   * @method getEmptyStatement
   * @param effect {String} The effect of the statement, this can be "Allow" or "Deny"
   * @return {Object} An empty statement object with the Action, Effect, and Resource
   *                  properties prepopulated.
   */
  private getEmptyStatement(effect: string) {
    effect =
      effect.substring(0, 1).toUpperCase() +
      effect.substring(1, effect.length).toLowerCase();
    return {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: [],
    } as AuthStatement;
  }

  /**
   * This function loops over an array of objects containing a resourceArn and
   * conditions statement and generates the array of statements for the policy.
   *
   * @method getStatementsForEffect
   * @param effect {String} The desired effect. This can be "Allow" or "Deny"
   * @param methods {Array} An array of method objects containing the ARN of the resource
   *                and the conditions for the policy
   * @return {AuthMethod[]} an array of formatted statements for the policy.
   */
  private getStatementsForEffect(effect: string, methods: AuthMethod[]) {
    const statements = [];

    if (methods.length > 0) {
      const statement = this.getEmptyStatement(effect);

      for (let i = 0; i < methods.length; i++) {
        const curMethod = methods[i];
        if (
          curMethod.conditions === null ||
          curMethod.conditions.length === 0
        ) {
          statement.Resource.push(curMethod.resourceArn);
        } else {
          const conditionalStatement = this.getEmptyStatement(effect);
          conditionalStatement.Resource.push(curMethod.resourceArn);
          conditionalStatement.Condition = curMethod.conditions;
          statements.push(conditionalStatement);
        }
      }

      if (statement.Resource !== null && statement.Resource.length > 0) {
        statements.push(statement);
      }
    }

    return statements;
  }

  /**
   * Adds an allow "*" statement to the policy.
   *
   * @method allowAllMethods
   */
  public allowAllMethods() {
    this.addMethod("allow", HttpMethod.ANY, "*", null);
  }

  /**
   * Adds a deny "*" statement to the policy.
   *
   * @method denyAllMethods
   */
  denyAllMethods() {
    this.addMethod("deny", HttpMethod.ANY, "*", null);
  }

  /**
   * Adds an API Gateway method (Http verb + Resource path) to the list of allowed
   * methods for the policy
   *
   * @method allowMethod
   * @param verb {HttpMethod} The HTTP verb for the method, this should ideally come from the
   *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
   * @param resource {string} The resource path. For example "/pets"
   * @return {void}
   */
  allowMethod(verb: HttpMethod, resource: string) {
    this.addMethod("allow", verb, resource, null);
  }

  /**
   * Adds an API Gateway method (Http verb + Resource path) to the list of denied
   * methods for the policy
   *
   * @method denyMethod
   * @param verb {HttpMethod} The HTTP verb for the method, this should ideally come from the
   *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
   * @param resource {string} The resource path. For example "/pets"
   * @return {void}
   */
  denyMethod(verb: HttpMethod, resource: string) {
    this.addMethod("deny", verb, resource, null);
  }

  /**
   * Adds an API Gateway method (Http verb + Resource path) to the list of allowed
   * methods and includes a condition for the policy statement. More on AWS policy
   * conditions here: http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Condition
   *
   * @method allowMethodWithConditions
   * @param verb {HttpMethod} The HTTP verb for the method, this should ideally come from the
   *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
   * @param resource {string} The resource path. For example "/pets"
   * @param conditions {AuthConditions} The conditions object in the format specified by the AWS docs
   * @return {void}
   */
  allowMethodWithConditions(
    verb: HttpMethod,
    resource: string,
    conditions: AuthConditions
  ) {
    this.addMethod("allow", verb, resource, conditions);
  }

  /**
   * Adds an API Gateway method (Http verb + Resource path) to the list of denied
   * methods and includes a condition for the policy statement. More on AWS policy
   * conditions here: http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Condition
   *
   * @method denyMethodWithConditions
   * @param verb {HttpMethod} The HTTP verb for the method, this should ideally come from the
   *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
   * @param resource {string} The resource path. For example "/pets"
   * @param conditions {AuthConditions} The conditions object in the format specified by the AWS docs
   * @return {void}
   */
  denyMethodWithConditions(
    verb: HttpMethod,
    resource: string,
    conditions: AuthConditions
  ) {
    this.addMethod("deny", verb, resource, conditions);
  }

  /**
   * Generates the policy document based on the internal lists of allowed and denied
   * conditions. This will generate a policy with two main statements for the effect:
   * one statement for Allow and one statement for Deny.
   * Methods that includes conditions will have their own statement in the policy.
   *
   * @method build
   * @return {Object} The policy object that can be serialized to JSON.
   */
  build() {
    if (
      (!this.allowMethods || this.allowMethods.length === 0) &&
      (!this.denyMethods || this.denyMethods.length === 0)
    ) {
      throw new Error("No statements defined for the policy");
    }

    return {
      principalId: this.principalId,
      policyDocument: {
        Version: this.version,
        Statement: [
          ...this.getStatementsForEffect("Allow", this.allowMethods),
          ...this.getStatementsForEffect("Deny", this.denyMethods),
        ],
      },
    } as APIGatewayAuthorizerResult;
  }
}
