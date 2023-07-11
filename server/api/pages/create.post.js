import { sendError } from "h3"
import { createPage } from "../../db/pages"
import useComponent from "~/composables/useComponent";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { html, title, slug, image, description } = body

    if (!title || !slug) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid param' }))
    }

    const pageData = {
        title, html, slug, image, description
    }

    const page = await createPage(pageData)

    return {
        body: page
    }
})