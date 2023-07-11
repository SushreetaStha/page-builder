import { deleteAllImage } from "../../db/images"

export default defineEventHandler(async (event) => {


    const images = await deleteAllImage()

    return {
        images
    }
})