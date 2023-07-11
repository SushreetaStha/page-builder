import { sendError } from "h3"
import { ArchivedPage } from "../../db/pages"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id } = body

    if (!id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }


    const page = await ArchivedPage(id)

    return {
        page
    }
})

