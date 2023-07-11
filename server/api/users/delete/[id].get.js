import { deleteUser } from "~~/server/db/users"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const user = await deleteUser(id)

    return {
        user
    }
})