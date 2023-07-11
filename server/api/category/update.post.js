import { sendError } from "h3"
import { updateCategory } from "../../db/categories.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id, title } = body

    if (!title) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const categoryData = {
        title
    }

    const category = await updateCategory(id, categoryData)

    return {
        body: category
    }
})

