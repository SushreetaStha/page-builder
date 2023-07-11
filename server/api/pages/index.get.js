import { getAllPages } from "../../db/pages"

export default defineEventHandler(async (event) => {


    const pages = await getAllPages()

    return {
        pages
    }
})