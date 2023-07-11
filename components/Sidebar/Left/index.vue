<template>
    <transition name="sidebar-transition">
        <aside v-show="props.isOpen" class="sidebar fixed overflow-y-auto" style="background-color: rgb(17 24 39);">
            <div class=" h-screen flex flex-col bg-gray-900 text-white top-0 left-0">
                <div>
                    <div class="ml-48 cursor-pointer" @click="closeSidebar">&#x2715;</div>

                    <div class="flex flex-col">
                        <div v-for="cat in categories">
                            <template v-if="cat.is_archived">
                                <div class="cursor-pointer px-4 m-3 uppercase text-sm font-semibold">{{ cat.title }}</div>

                                <div v-for="comp in components">
                                    <div v-if="comp.is_archived">
                                        <div v-if="cat.id == comp.categoryId">
                                            <div @click="() => ongetId(comp.id)">
                                                <img :src="comp.image"
                                                    class="w-40 h-24 cursor-pointer rounded-md ml-6 mb-6 hover:border-2 hover:border-gray-300 hover:bg-gray-200 shadow-xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </template>
                        </div>
                    </div>

                    <SidebarLeftTab id="onuser" @click="handleUser">
                        <template v-slot:icon>
                            <UserIcon />
                        </template>
                        <template v-slot:name>
                            User
                        </template>
                    </SidebarLeftTab>

                    <SidebarLeftTab @click="handleCategory">
                        <template v-slot:icon>
                            <DocumentTextIcon />
                        </template>
                        <template v-slot:name>
                            Category
                        </template>
                    </SidebarLeftTab>

                    <SidebarLeftTab @click="handleComponent">
                        <template v-slot:icon>
                            <DocumentTextIcon />
                        </template>
                        <template v-slot:name>
                            Components
                        </template>
                    </SidebarLeftTab>

                </div>
            </div>
        </aside>
    </transition>
</template>

<script setup>
import { DocumentTextIcon, UserIcon } from "@heroicons/vue/outline"
const { getComponentById } = useComponent()
const { pageData, addPageComponent, removePageComponent } = usePageData()

const idToGet = ref(null)

const ongetId = async (id) => {
    idToGet.value = id
    console.log(idToGet.value)
    const { component } = await getComponentById(idToGet.value)
    const code = decodeHTML(component.code_block);
    // console.log(component.title)
    // console.log(code)
    addPageComponent({ id, component: code })
}

function decodeHTML(text) {
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

const props = defineProps({
    isOpen: {
        type: Boolean
    }
})

const emits = defineEmits(['close']);
// Function to close the sidebar
const closeSidebar = () => {
    emits('close');
};


const { getAllCategories } = useCategory()
const { categories } = await getAllCategories()
const { getAllComponents } = useComponent()
const { components } = await getAllComponents()
const { initAuth, useAuthUser, useAuthLoading } = useAuth()
const user = useAuthUser()
const isAuthLoading = useAuthLoading()

onBeforeMount(() => {
    initAuth()
})


function handleUser() {
    navigateTo('/users')
}

function handleCategory() {
    navigateTo('/category')
}

function handleComponent() {
    navigateTo('/components/')
}

</script>

<style>
.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-transition-enter-from,
.sidebar-transition-leave-to {
    transform: translateX(-100%);
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    /* Adjust the width as needed */
    background-color: #f8f8f8;
    /* Replace with your desired background color */
    padding: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);

}
</style>