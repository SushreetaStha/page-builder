<template>
    <div>
        <div class="p-6 text-2xl">USERS</div>
        <div class="text-right mr-32 mb-2 text-sm">
            <button
                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">+
                Add User</button>
        </div>
        <div class="bg-red-200">
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
                    <tr class="bg-white border-b" v-for="user in users" :key="user.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ user.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.email }}
                        </td>
                        <td>
                            <button
                                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">Edit</button>
                            <button
                                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-red-500 hover:bg-red-600 hover:text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>


const { getAllUsers } = useAuth()

const { users } = await getAllUsers()

</script>
