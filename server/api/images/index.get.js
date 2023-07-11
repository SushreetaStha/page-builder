import { getAllImages } from "../../db/images"

export default defineEventHandler(async (event) => {


    const images = await getAllImages()

    return {
        images
    }
})