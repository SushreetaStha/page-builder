import { sendError } from "h3"
import { PublishPage } from "../../db/pages"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id } = body

    if (!id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }


    const page = await PublishPage(id)

    return {
        page
    }
})

