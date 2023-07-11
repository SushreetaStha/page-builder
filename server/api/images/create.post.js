import { sendError } from "h3"
import { createImage } from "../../db/images.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { image } = body

    if (!image) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid param' }))
    }

    const imageData = {
        image
    }

    const images = await createImage(imageData)

    return {
        body: images
    }
})