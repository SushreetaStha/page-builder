<template>
    <div class="pt-5 space-y-6">
        <div class="form-input">
            <form method="post" @submit="handleLogin">
                <p class="mr-7 text-lg text-gray-700 text-center">Login</p>
                <UIInput label="Email" placeholder="Enter username" v-model="data.email"></UIInput>
                <UIInput label="Password" placeholder="Enter password" type="password" v-model="data.password"></UIInput>
                <button
                    class="mx-2 py-2 px-36 text-white rounded-full bg-blue-400 hover:bg-blue-500 hover:text-white">Login</button>
            </form>
        </div>

    </div>
</template>

<script setup>

const data = reactive({
    email: '',
    password: '',
    loading: false
})


async function handleLogin(e) {
    e.preventDefault();
    const { login, getUserByEmail } = useAuth()
    data.loading = true
    try {
        const { user } = await getUserByEmail(data.email)
        if (user.is_archived) {
            await login({
                email: data.email,
                password: data.password

            })
        } else {
            alert("Unauthorized")
        }

    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }

}


</script>

<style scoped></style>
