import { getCategories } from "../../db/categories"

export default defineEventHandler(async (event) => {


    const categories = await getCategories()

    return {
        categories
    }
})