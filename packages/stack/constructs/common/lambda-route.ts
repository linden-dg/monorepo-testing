import { HttpMethod } from "./http-methods";

export interface LambdaRoute {
  name: string;
  handler: string;
  resource: string;
  methods: HttpMethod[];
  warmer?: boolean;
}