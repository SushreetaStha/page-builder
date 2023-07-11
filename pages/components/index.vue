<template>
    <div class="p-6 text-2xl">Components</div>
    <div class="text-right mr-32 mb-2 text-sm">

        <NuxtLink to="/components/createForm"><button
                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">
                +
                Add Component
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
                <tr class="bg-white border-b" v-for="(component, index) in  paginatedComponents " :key="index">
                    <template v-if="component.is_archived">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ component.title }}
                        </th>
                        <td>
                            <NuxtLink :to="`/components/updateForm/${component.id}`">
                                <button
                                    class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">Edit</button>
                            </NuxtLink>

                            <button
                                class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-red-500 hover:bg-red-600 hover:text-white"
                                @click="{ showModal = true; onDeleteId(component.id) }">Delete</button>

                        </td>
                    </template>
                </tr>
            </tbody>

        </table>
        <div>
            <button
                class="mt-10 ml-2 h-6 w-6 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-full text-xs cursor-pointer text-center"
                v-for="page in totalPageCount" :key="page" @click="goToPage(page)">
                {{ page }}
            </button>
        </div>
        <UIVModal v-if="showModal" type="danger" title="Confirm Action" width="sm" v-on:close="showModal = false">
            <p class="text-gray-800">
                Are you sure you want to delete this component? This action cannot be undone.
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

const { getAllComponents, ArchivedComponent } = useComponent()
const { componentData, setComponentData } = useComponentData()

const { data: component, error } = useAsyncData('component', async () => {
    const { components } = await getAllComponents()
    setComponentData([...components])
})

// Pagination

const itemsPerPage = 6;
const currentPage = ref(1);

const paginatedComponents = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return componentData.value.filter(component => component.is_archived).slice(startIndex, endIndex);
});

const totalPageCount = computed(() => {
    return Math.ceil(componentData.value.filter(component => component.is_archived).length / itemsPerPage);
});

function goToPage(page) {
    currentPage.value = page;
}

// Delete function

const showModal = ref(false)
const idToDelete = ref(null)

const onDeleteClick = async () => {
    console.log(idToDelete.value)
    await ArchivedComponent({
        id: idToDelete.value
    })
    const { data: component, error } = useAsyncData('component', async () => {
        const { components } = await getAllComponents()
        setComponentData([...components])
    })
}

const onDeleteId = async (id) => {
    idToDelete.value = id
    console.log(idToDelete.value)
}


</script>
