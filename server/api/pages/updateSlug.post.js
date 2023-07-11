import { updatePage } from "../../db/pages"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { slug, image } = body

    const pageData = {
        image
    }

    const page = await updatePage(slug, pageData)

    return {
        body: page
    }
})