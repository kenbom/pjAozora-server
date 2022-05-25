import JWT from "jsonwebtoken"
import { JSON_SIGNATURE } from "../keys"
require('dotenv').config()
const env = process.env
// const JSON_SIGNATURE:any = env.JSON_SIGNATURE

export const getUserFromToken = (token: string) => {
    console.log(`aferReceiveFromIndex:${token}`)
    console.log(`checkEnv:${env.DATABASE_URL}`)
    console.log(`checkEnv:${env.JSON_SIGNATURE}`)
    try {
        return JWT.verify(token, JSON_SIGNATURE) as {
            userId: number
        }
    } catch (error) {
        return null
    }}