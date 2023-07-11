import { sendError } from "h3"
import { ArchivedCategory } from "../../db/categories.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id } = body

    if (!id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }


    const category = await ArchivedCategory(id)

    return {
        category
    }
})

