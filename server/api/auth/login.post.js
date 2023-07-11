import { getUserByEmail } from "../../db/users.js"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js"
import { createRefreshToken } from "~/server/db/refreshTokens.js"
import { sendError } from "h3"
import { userTransformer } from '../../transformers/user.js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password } = body

    if (!email || !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    //is the user registered?
    const user = await getUserByEmail(email)
    const doesThePasswordMatch = await bcrypt.compare(password, user.password)


    //compare passwords


    if (!user || !doesThePasswordMatch) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'username or password is invalid.' }))
    }

    //generate token
    //Access token
    //Refresh token

    const { accessToken, refreshToken } = generateTokens(user)

    //save refresh token to db

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    //add http only cookie
    sendRefreshToken(event, refreshToken)


    return {
        refreshToken,
        access_token: accessToken,
        user: userTransformer(user)
    }

})