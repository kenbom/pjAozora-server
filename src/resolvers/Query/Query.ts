import { Context } from "../../index"

export const Query = {
    users: async (_: any, __: any, { prisma }: Context) => {
        const users = await prisma.user.findMany()

        return users
    },

    hello: (parent: any, args: any, context: any) => "World!",

    kamokus: async (_: any, __: any, { prisma }: Context) => {
        const kamokus = await prisma.kamoku.findMany()

        return kamokus
    },

    shiwakes: async (_: any, __: any, { prisma, userInfo }: Context) => {
        if (!userInfo) {
            return {
                userErrors: [{ message: "Not authenticated." }],
                shiwake: null,
            }
        }
        const shiwakesMade = await prisma.shiwake.findMany({
            where:{
                userId:userInfo.userId
            },
            orderBy: {
               hasseiDate: 'desc'
            }
        }
        )

        return shiwakesMade
    }
}
