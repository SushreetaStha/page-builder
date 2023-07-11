import { getAllCategories } from "../../db/categories"

export default defineEventHandler(async (event) => {


    const categories = await getAllCategories()

    return {
        categories
    }
})