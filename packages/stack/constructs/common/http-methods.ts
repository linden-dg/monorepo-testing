/**
 * A set of existing HTTP verbs supported by API Gateway. This property is here
 * only to avoid spelling mistakes in the policy/methods.
 */

export enum HttpMethod {
  ANY = "ANY",
  ALL = "*",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  PUT = "PUT",
  POST = "POST",
}
