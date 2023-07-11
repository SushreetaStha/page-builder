<template>
    <div class="p-6 text-2xl">CATEGORIES</div>
    <div class="text-right mr-32 mb-2 text-sm">

        <NuxtLink to="/category/createForm"><button
                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">
                +
                Add Category
            </button>
        </NuxtLink>
    </div>
    <div class="ml-10 relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b" v-for="(category, index) in categoryData" :key="index">
                    <template v-if="category.is_archived">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ category.title }}
                        </th>
                        <td>
                            <NuxtLink :to="`/category/updateForm/${category.id}`">
                                <button
                                    class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">Edit</button>
                            </NuxtLink>

                            <button
                                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-red-500 hover:bg-red-600 hover:text-white"
                                @click="{ showModal = true; onDeleteId(category.id) }">Delete</button>

                        </td>
                    </template>
                </tr>
            </tbody>

        </table>
        <UIVModal v-if="showModal" type="danger" title="Confirm Action" width="sm" v-on:close="showModal = false">
            <p class="text-gray-800">
                Are you sure you want you delete this category? This action cannot be undone.
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

const { getAllCategories, archivedCategory } = useCategory()

const showModal = ref(false)
const idToDelete = ref(null)
const { categoryData, setCategoryData } = useCategoryData()

const { data: category, error } = useAsyncData('category', async () => {
    const { categories } = await getAllCategories()
    setCategoryData([...categories])
})

const onDeleteClick = async () => {
    await archivedCategory({
        id: idToDelete.value
    })
    const { data: category, error } = useAsyncData('category', async () => {
        const { categories } = await getAllCategories()
        setCategoryData([...categories])
    })
}

const onDeleteId = async (id) => {
    idToDelete.value = id
}

</script>
