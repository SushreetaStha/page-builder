<template>
    <div class="form-input">
        <form method="post" @submit="updateUser">
            <input type="text">
            <div class="p-3 text-xl">Update User</div>
            <div></div>
            <UIInput label="Name" placeholder="Enter name" v-model="data.name"></UIInput>
            <UIInput label="Email" placeholder="Enter email" v-model="data.email"></UIInput>
            <button
                class="mx-1 mt-2 text-center py-2 px-10 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white">Update</button>
        </form>
    </div>
</template>

<script setup>
const { id } = useRoute().params
const { userData, setUserData } = useUserData()

const { update, getUserById } = useAuth()

const { user } = await getUserById(id)
console.log(user)

const data = reactive({
    name: user.name,
    email: user.email,
    loading: false
})


async function updateUser(e) {
    e.preventDefault();
    data.loading = true
    try {
        const result = await update({
            id: id,
            name: data.name,
            email: data.email,
        })

        const newData = userData.value.filter(x => x.id != result.body.id)

        setUserData([result.body])
        navigateTo('/users')
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }


}
</script>

<style lang="scss" scoped></style>