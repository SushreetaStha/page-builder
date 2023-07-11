import { getUserByEmail } from "~~/server/db/users"

export default defineEventHandler(async (event) => {

    const { email } = event.context.params

    const user = await getUserByEmail(email)

    return {
        user
    }
})