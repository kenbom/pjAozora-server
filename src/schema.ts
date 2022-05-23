import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    hello: String
    kamokus: [Kamoku!]!
    shiwakes: [Shiwake!]!
  }

  type Mutation {
    signup(credentials: CredentialsInput, userName: String ): AuthPayload
    signin(credentials: CredentialsInput): AuthPayload
    shiwakeCreate(input: ShiwakeCreateArgs): ShiwakePayload
    shiwakeDelete(input: ShiwakeDeleteArgs): ShiwakePayload
  }

  type AuthPayload {
    userErrors: [userError]
    token: String
  }

  type ShiwakePayload {
    userErrors: [userError]
    shiwake: Shiwake
  }

  type userError {
    message: String
  }

  input UserCreateArgs {
    userName: String
    mail: String
    password: String!
  }

  input ShiwakeCreateArgs {
    hasseiDate: String
    tekiyou: String
    kariCd: Int
    kariName: String
    kariKingaku: Int
    kashiCd: Int
    kashiName: String
    kashiKingaku: Int
    userId:Int
  }

  type User {
    id: ID!
    userName: String
    mail: String
    password: String!
  }

  type Kamoku {
    kamokuCd: ID!
    kamokuName: String
    kariKubun: Boolean
  }

  type Shiwake {
    id:Int
    hasseiDate: String
    tekiyou: String
    kariCd: Int!
    kariName: String!
    kariKingaku: Int
    kashiCd: Int!
    kashiName: String!
    kashiKingaku: Int
    userId: Int!
    createdAt:String
  }

  input CredentialsInput {
    mail: String!
    password: String!
  }

  input ShiwakeDeleteArgs {
    shiwakeId: String
  }
`;
