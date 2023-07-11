import { deletePage } from "~~/server/db/pages"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const page = await deletePage(id)

    return {
        page
    }
})