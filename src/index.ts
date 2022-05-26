import { ApolloServer } from "apollo-server"
import { typeDefs } from './schema'
import { Query, Mutation } from "./resolvers"
import { PrismaClient, Prisma } from "@prisma/client"
import { getUserFromToken } from "./utils/getUserFromToken"

export const prisma = new PrismaClient()
export interface Context {
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
    userInfo: {
        userId: number
    } | null;
}

const server = new ApolloServer({
    cors: {
        origin: "*",
        //["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
    },
    typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    context: async ({ req }: any): Promise<Context> => {
        // console.log(`atIndexReq:${JSON.stringify(req)}`)
        // console.log(`atIndexReqHeader:${JSON.stringify(req.headers)}`)
        console.log(`atIndexReqHeader:${JSON.stringify(req.headers)}`)
        // console.log(`atIndexReq:${JSON.stringify(req)}`)
        // console.log(`atIndexAuth:${req.headers.authorization}`)
        const userInfo = await getUserFromToken(req.headers.authorization)
        // console.log(`afterGetUserFT:${userInfo}`)
        return {
            prisma,
            userInfo,
        }
    },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server ready on ${url}`)
})