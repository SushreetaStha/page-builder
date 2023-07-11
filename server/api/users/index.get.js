import { getAllUser } from "../../db/users"

export default defineEventHandler(async (event) => {


    const users = await getAllUser()

    return {
        users
    }
})