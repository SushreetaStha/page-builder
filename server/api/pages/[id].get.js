import { getPageById } from "~~/server/db/pages"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const page = await getPageById(id, {
        include: {
            title: true,
            html: true,
        }
    })

    return {
        page
    }
})