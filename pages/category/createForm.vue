<template>
    <div class="form-input ml-6">
        <form method="post" @submit="createCategory">
            <input type="text">

            <div class="p-3 text-xl">Create Category</div>
            <UIInput label="Title" placeholder="Enter title" v-model="data.title"></UIInput>
            <button
                class="mx-1 mt-2 text-center py-2 px-10 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white">Create</button>
        </form>
    </div>
</template>

<script setup>

const data = reactive({
    title: '',
    loading: false
})

async function createCategory(e) {
    e.preventDefault();
    const { create } = useCategory()
    data.loading = true
    try {
        const result = await create({
            title: data.title,
        })
        navigateTo('/category')
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}
</script>

<style lang="scss" scoped></style>