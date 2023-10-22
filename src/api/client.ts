import { GraphQLClient } from "graphql-request";

export const endpoint = "https://neurona.cogniable.ai/apis/graphql";

const client = new GraphQLClient(endpoint);

export default client;
