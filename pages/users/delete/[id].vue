<template>
    <div class="p-4">
        Are you sure you want to delete " {{ user.name }} "?
        <br />
        <NuxtLink to="/users">
            <button
                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-2xl bg-red-500 hover:bg-red-600 hover:text-white"
                @click="UserArchive">Yes</button>
        </NuxtLink>
        <NuxtLink to="/users">
            <button
                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-2xl bg-green-500 hover:bg-green-600 hover:text-white">No</button>
        </NuxtLink>
    </div>
</template>

<script setup>
const { id } = useRoute().params
console.log(id)

const { archivedUser, getUserById } = useAuth()

const { user } = await getUserById(id)
console.log(user)


async function UserArchive() {
    try {
        archivedUser({
            id: id,
        })
    } catch (error) {
        console.log(error)
    }


}
</script>

<style lang="scss" scoped></style>