<template>
    <div class="form-input ml-6">
        <form method="post" @submit="createUser">
            <input type="text">

            <div class="p-3 text-xl">Create User</div>
            <UIInput label="Name" placeholder="Enter name" v-model="data.name"></UIInput>
            <UIInput label="Email" placeholder="Enter email" v-model="data.email"></UIInput>
            <UIInput label="Password" type="password" placeholder="Enter password" v-model="data.password"></UIInput>
            <button
                class="mx-1 mt-2 text-center py-2 px-10 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white">Create</button>
        </form>
    </div>
</template>

<script setup>

const data = reactive({
    name: '',
    email: '',
    password: '',
    loading: false
})


async function createUser(e) {
    e.preventDefault();
    const { userData, setUserData } = useUserData()
    const { register } = useAuth()
    data.loading = true
    try {
        const result = await register({
            name: data.name,
            email: data.email,
            password: data.password
        })

        setUserData([...userData.value, result.body])
        navigateTo('/users')
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }


}
</script>

<style lang="scss" scoped></style>