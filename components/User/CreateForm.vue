<template>
    <div class="">
        <div class="form-input">
            <form method="post">
                <input type="text">
            </form>
        </div>
        <div class="p-3 text-xl">Create User</div>
        <UIInput label="Name" placeholder="Enter name" v-model="data.name"></UIInput>
        <UIInput label="Email" placeholder="Enter email" v-model="data.email"></UIInput>
        <UIInput label="Password" type="password" placeholder="Enter password" v-model="data.password"></UIInput>
        <button
            class="mx-1 mt-2 text-center py-2 px-10 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white"
            @click="createUser">Create</button>
    </div>
</template>

<script setup>

const data = reactive({
    name: '',
    email: '',
    password: '',
    loading: false
})


async function createUser() {

    const { register } = useAuth()
    data.loading = true
    try {
        await register({
            name: data.name,
            email: data.email,
            password: data.password
        })
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }

}
</script>

<style lang="scss" scoped></style>