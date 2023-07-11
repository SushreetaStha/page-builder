import { getUserById } from "~~/server/db/users"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const user = await getUserById(id, {
        include: {
            name: true,
            email: true
        }
    })

    return {
        user
    }
})