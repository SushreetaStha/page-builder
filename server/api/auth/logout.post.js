import { removeRefreshToken } from "~/server/db/refreshTokens"
import { sendRefreshToken } from "~~/server/utils/jwt"

export default defineEventHandler(async (event) => {
    try {
        const cookies = parseCookies(event)
        const refreshToken = cookies.refresh_token
        await removeRefreshToken(refreshToken)
    } catch (error) { }

    sendRefreshToken(event, null)
    return {
        message: 'done'
    }
})