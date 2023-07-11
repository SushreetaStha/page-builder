import { sendError } from "h3"
import { createUser } from "../../db/users.js"
import { userTransformer } from '../../transformers/user.js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password, name, is_archived } = body

    if (!email || !password || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const userData = {
        email,
        password,
        name,
        is_archived,
    }

    const user = await createUser(userData)

    return {
        body: userTransformer(user)
    }
})