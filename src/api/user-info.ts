import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { endpoint } from "./client";
import { parse } from "graphql";
import { request, gql } from "graphql-request";

interface UserInfoResponse {}

export async function userInfo(token: string): Promise<UserInfoResponse> {
  const query: TypedDocumentNode<UserInfoResponse> = parse(gql`
    query userDetails {
      userDetails {
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
    }
  `);

  const response = await request<UserInfoResponse>(endpoint, query, undefined, {
    authorization: `Bearer ${token}`,
  });

  return response;
}
