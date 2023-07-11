import { getComponentById } from "~~/server/db/components"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const component = await getComponentById(id, {
        include: {
            title: true,
            code_block: true,
            image: true
        }
    })

    return {
        component
    }
})