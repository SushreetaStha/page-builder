<template>
    <div class="flex flex-row justify-between items-end  bg-indigo-500 text-white min-w-full">
        <NuxtLink to="/">
            <div class="font-bold cursor-pointer pl-3 p-4 text-lg ml-4" style="width: 16rem;">PAGE BUILDER</div>
        </NuxtLink>
        <div class="flex flex-row items-center justify-end mx-auto mt-auto mb-2 rounded-full cursor-pointer w-14 xl:w-full">
            <div class="flex flex-row">
                <img src="../assets/p.png" class="w-7 h-7 rounded-full mb-1 mr-1" />
                <div class="flex-col hidden ml-2 xl:block">
                    <div class="submenu">
                        <span class="text-sm font-bold text-gray-100 pr-6 pb-4" v-if="user">{{ user.name }}
                            &#x25BE;</span>
                        <ul>
                            <NuxtLink to="/pageList">
                                <li>
                                    Page List
                                </li>
                            </NuxtLink>
                            <li @click="handleUserLogout">
                                <div>Logout</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>

import { ChevronDownIcon } from "@heroicons/vue/outline"

const { logout, initAuth, useAuthUser } = useAuth()
onBeforeMount(() => {
    initAuth()
})
const user = useAuthUser()

function handleUserLogout() {
    logout()
}
</script>

<style>
.submenu {
    position: relative;
    z-index: 1;
}

.submenu ul {
    top: 34px;
    right: -24px;
    position: absolute;
    list-style: none;
    min-width: 150px;
    background-color: #333333;
    display: none;
}

.submenu li {
    padding: 6px;
}

.submenu:hover ul {
    display: block;
}

.submenu li:hover {
    background-color: #6366f1;
}
</style>