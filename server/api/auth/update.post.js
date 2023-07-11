import { sendError } from "h3"
import { updateUser } from "../../db/users.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id, email, name } = body

    if (!email || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const userData = {
        email,
        name,
    }

    const user = await updateUser(id, userData)

    return {
        body: user
    }
})

