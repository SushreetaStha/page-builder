import { getCategoryById } from "~~/server/db/categories"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const category = await getCategoryById(id, {
        include: {
            title: true,
        }
    })

    return {
        category
    }
})