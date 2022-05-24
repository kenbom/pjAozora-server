import JWT from "jsonwebtoken"
// import { JSON_SIGNATURE } from "../keys"
//JSON_SIGNATURE = env("JSON_SIGNATURE")
require('dotenv').config()
const env = process.env
const JSON_SIGNATURE:any = env.JSON_SIGNATURE
export const getUserFromToken = (token: string) => {
    console.log(`aferReceiveFromIndex:${token}`)
    try {
        return JWT.verify(token, JSON_SIGNATURE) as {
            userId: number
        }
    } catch (error) {
        return null
    }}