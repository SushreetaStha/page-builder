import { getPageBySlug } from "~~/server/db/pages"

export default defineEventHandler(async (event) => {

    const { slug } = event.context.params

    const page = await getPageBySlug(slug, {
        include: {
            title: true,
            html: true,
        }
    })

    return {
        page
    }
})