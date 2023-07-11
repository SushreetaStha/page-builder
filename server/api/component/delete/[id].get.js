import { deleteComponent } from "~~/server/db/components"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const component = await deleteComponent(id)

    return {
        component
    }
})