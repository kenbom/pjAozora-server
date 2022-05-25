import { Context } from "../../index"
import validator from "validator"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import { JSON_SIGNATURE } from "../../keys"
// require('dotenv').config()
// const env = process.env
// const JSON_SIGNATURE: any = env.JSON_SIGNATURE

interface SignupArgs {
    credentials: {
        mail: string
        password: string
    },
    userName: string
}

interface SigninArgs {
    credentials: {
        mail: string
        password: string
    },
}

interface UserPayload {
    userErrors: {
        message: string
    }[],
    token: string | null
}

export const authResolvers = {
    signup: async (
        parent: any,
        { credentials, userName }: SignupArgs,
        { prisma }: Context
    ): Promise<UserPayload> => {
        const { mail, password } = credentials

        if (!userName || !mail)
            return {
                userErrors: [{ message: "You must provide both userName and mail." }],
                token: null
            }

        const isEmail = validator.isEmail(mail)
        if (!isEmail) {
            return {
                userErrors: [{
                    message: "Inavalid mail"
                }],
                token: null
            }
        }

        const isValidPassword = validator.isLength(password, { min: 4 })
        if (!isValidPassword) {
            return {
                userErrors: [{
                    message: "Inavalid password"
                }],
                token: null
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                userName,
                mail,
                password: hashedPassword,
            }
        })

        return {
            userErrors: [],
            token: JWT.sign({ userId: user.id }, JSON_SIGNATURE, {
                expiresIn: 3000
            }),
        }
    },

    signin: async (_: any,
        { credentials }: SigninArgs,
        { prisma }: Context
    ): Promise<UserPayload> => {
        const { mail, password } = credentials

        const user = await prisma.user.findUnique({ where: { mail } })

        if (!user) {
            return {
                userErrors: [{ message: "Invalid credentials" }],
                token: null,
            }
        }

        //@ts-ignore
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return{
                userErrors:[{message:"InvalidCredentials"}],
                token:null,
            }
        }

        return {
            userErrors: [],
            token: JWT.sign({ userId:user.id}, JSON_SIGNATURE,{
                expiresIn: 3600000}),
        }
    },
}
