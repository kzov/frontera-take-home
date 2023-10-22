import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { endpoint } from "./client";
import { parse } from "graphql";
import { request, gql } from "graphql-request";

interface Edge {
  node: {
    id: string;
    name: string;
  };
}

interface LoginQueryVariables {
  username: string;
  password: string;
}

interface LoginResponse {
  tokenAuth: {
    isVerified: boolean;
    firstLogin: boolean;
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      lastLogin: string;
      groups: {
        edges: Edge[];
      };
      staff: null;
      students: {
        id: string;
        firstname: string;
        lastname: string;
        parentFirstname: string;
        parentLastname: string;
      };
    };
    token: string;
  };
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const query: TypedDocumentNode<LoginResponse, LoginQueryVariables> =
    parse(gql`
      mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(input: { username: $username, password: $password }) {
          isVerified
          firstLogin
          user {
            id
            username
            firstName
            lastName
            email
            lastLogin
            groups {
              edges {
                node {
                  id
                  name
                }
              }
            }
            staff {
              id
              firstname
              lastname
            }
            students {
              id
              firstname
              lastname
              parentFirstname
              parentLastname
            }
          }
          firstLogin
          token
        }
      }
    `);

  const variables = {
    username,
    password,
  };

  const response = await request<LoginResponse>(endpoint, query, variables);

  return response;
}
