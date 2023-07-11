<template>
    <div class="flex flex-col">
        <div class="px-4 m-3 uppercase text-sm font-semibold">MAIN</div>
        <NuxtLink to="/">
            <img src="~/assets/component.png"
                class="w-32 cursor-pointer rounded-md h-20 ml-6 mb-6 hover:border-2 hover:border-gray-300 hover:bg-gray-200 shadow-xl" />
        </NuxtLink>
        <div v-for="cat in categories">
            <template v-if="cat.is_archived">
                <div class="px-4 m-3 uppercase text-sm font-semibold">{{ cat.title }}</div>

                <div v-for="comp in components">
                    <div v-if="cat.id == comp.categoryId">
                        <NuxtLink :to="`/components/${comp.id}`">
                            <img src="~/assets/component.png"
                                class="w-32 cursor-pointer rounded-md h-20 ml-6 mb-6 hover:border-2 hover:border-gray-300 hover:bg-gray-200 shadow-xl" />
                        </NuxtLink>
                    </div>
                </div>

            </template>
        </div>
    </div>
</template>

<script setup>

const isOpen = ref(false)

const { getAllCategories } = useCategory()
const { categories } = await getAllCategories()

const { getAllComponents } = useComponent()

const { components } = await getAllComponents()

</script>