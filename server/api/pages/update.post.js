import { updatePage } from "../../db/pages"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { id, html, title } = body

    const pageData = {
        title, html
    }

    const page = await updatePage(id, pageData)

    return {
        body: page
    }
})