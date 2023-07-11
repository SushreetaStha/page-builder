import { sendError } from "h3"
import { Archived } from "../../db/users.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id } = body

    if (!id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }


    const user = await Archived(id)

    return {
        user
    }
})

