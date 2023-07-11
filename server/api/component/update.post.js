import { sendError } from "h3"
import { updateComponent } from "../../db/components.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id, title, image, code_block, categoryId } = body

    if (!title || !image || !code_block || !categoryId) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid param' }))
    }

    const componentData = {
        title, image, code_block
    }

    const component = await updateComponent(id, componentData, categoryId)

    return {
        body: component
    }
})