import { sendError } from "h3"
import { createCategory } from "../../db/categories.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { title } = body

    if (!title) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid param' }))
    }

    const categoryData = {
        title
    }

    const category = await createCategory(categoryData)

    return {
        body: category
    }
})