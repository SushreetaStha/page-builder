import { deleteImage } from "~~/server/db/images"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const image = await deleteImage(id)

    return {
        image
    }
})