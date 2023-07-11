<template>
    <div class="p-6 text-2xl">USERS</div>
    <div class="text-right mr-32 mb-2 text-sm">

        <NuxtLink to="/users/createform"><button
                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">
                +
                Add User
            </button>
        </NuxtLink>
    </div>
    <div class="ml-10 relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b" v-for="(user, index) in userData" :key="index">
                    <template v-if="user.is_archived">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ user.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.email }}
                        </td>
                        <td>
                            <NuxtLink :to="`/users/updateForm/${user.id}`">
                                <button
                                    class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">Edit</button>
                            </NuxtLink>

                            <button
                                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-red-500 hover:bg-red-600 hover:text-white"
                                @click="{ showModal = true; onDeleteId(user.id, index) }">Delete</button>

                        </td>
                    </template>

                </tr>

            </tbody>

        </table>
        <UIVModal v-if="showModal" type="danger" title="Confirm Action" width="sm" v-on:close="showModal = false">
            <p class="text-gray-800">
                Are you sure you want to delete this account? This action cannot be undone.
            </p>

            <div class="text-right mt-4">
                <button @click="showModal = false"
                    class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Cancel</button>
                <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
                    @click="{ showModal = false; onDeleteClick() }">Delete</button>
            </div>
        </UIVModal>
    </div>
</template>

<script setup>

const { getAllUsers, archivedUser } = useAuth()



const showModal = ref(false)
const idToDelete = ref(null)
const { userData, setUserData } = useUserData()

const { data: user, error } = useAsyncData('user', async () => {
    const { users } = await getAllUsers()
    setUserData([...users])
})

const onDeleteClick = async () => {
    console.log(idToDelete.value)
    await archivedUser({
        id: idToDelete.value
    })
    const { data: user, error } = useAsyncData('user', async () => {
        const { users } = await getAllUsers()
        setUserData([...users])
    })
}

const onDeleteId = async (id) => {
    idToDelete.value = id
}
</script>
