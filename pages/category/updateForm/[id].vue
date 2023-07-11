<template>
    <div class="form-input">
        <form method="post" @submit="updateCategory">
            <input type="text">
            <div class="p-3 text-xl">Update Category</div>
            <div></div>
            <UIInput label="Name" placeholder="Enter name" v-model="data.title"></UIInput>
            <button
                class="mx-1 mt-2 text-center py-2 px-10 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white">Update</button>
        </form>
    </div>
</template>

<script setup>
const { id } = useRoute().params
const { update, getCategoryById } = useCategory()
const { category } = await getCategoryById(id)

const data = reactive({
    title: category.title,
    loading: false
})

async function updateCategory(e) {
    e.preventDefault();
    data.loading = true
    try {
        const result = await update({
            id: id,
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