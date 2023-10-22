import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { endpoint } from "./client";
import { parse } from "graphql";
import { request, gql } from "graphql-request";

interface RegisterQueryVariables {
  confirmPassword: string;
  country: string;
  dob: string;
  email: string;
  firstname: string;
  gender: string;
  lastname: string;
  parentFirstname: string;
  parentLastname: string;
  password: string;
}

interface RegisterResponse {
  studentSignup: {
    student: {
      id: string;
      firstname: string;
      lastname: string;
      zipCode?: null;
      parentFirstname: string;
      parentLastname: string;
      email: string;
      country: {
        id: string;
        name: string;
      };
      parent: {
        id: string;
        username: string;
      };
    };
    message: string;
    status: boolean;
  };
}

export async function register(registration: {
  confirmPassword: string;
  dob: string;
  email: string;
  firstname: string;
  gender: string;
  lastname: string;
  parentFirstname: string;
  parentLastname: string;
  password: string;
}): Promise<RegisterResponse> {
  const query: TypedDocumentNode<RegisterResponse, RegisterQueryVariables> =
    parse(gql`
      mutation parentSignUp(
        $email: String!
        $firstname: String!
        $lastname: String
        $dob: Date!
        $gender: String
        $country: ID!
        $parentFirstname: String
        $parentLastname: String
        $password: String
      ) {
        studentSignup(
          input: {
            studentData: {
              email: $email
              firstname: $firstname
              lastname: $lastname
              dob: $dob
              gender: $gender
              country: $country
              password: $password
              parentFirstname: $parentFirstname
              parentLastname: $parentLastname
            }
          }
        ) {
          student {
            id
            firstname
            lastname
            zipCode
            parentFirstname
            parentLastname
            email
            country {
              id
              name
            }
            parent {
              id
              username
            }
            email
          }
          message
          status
        }
      }
    `);

  const variables = {
    ...registration,
    country: "Q291bnRyeVR5cGU6MTAz",
  };

  const response = await request<RegisterResponse>(endpoint, query, variables);

  return response;
}
