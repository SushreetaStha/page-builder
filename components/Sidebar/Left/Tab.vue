<template>
    <div class="hover:bg-gray-300 rounded-full mr-2 hover:text-black p-1 duration-300">
        <NuxtLink to="#" class="flex items-center px-3 py-2 w-min ">
            <div class="w-6 h-6 text-dark">
                <slot name="icon"></slot>
            </div>
            <div class="ml-4 text-md hidden sm:block">
                <slot name="name"></slot>
            </div>
        </NuxtLink>
    </div>
</template>


<script setup>

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>