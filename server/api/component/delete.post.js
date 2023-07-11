import { sendError } from "h3"
import { ArchivedComponent } from "../../db/components.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id } = body

    if (!id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }


    const component = await ArchivedComponent(id)

    return {
        component
    }
})

