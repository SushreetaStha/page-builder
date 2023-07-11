import { getAllComponents } from "../../db/components"

export default defineEventHandler(async (event) => {


    const components = await getAllComponents()

    return {
        components
    }
})