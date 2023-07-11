import { deleteAllPage } from "../../db/pages"

export default defineEventHandler(async (event) => {


    const pages = await deleteAllPage()

    return {
        pages
    }
})