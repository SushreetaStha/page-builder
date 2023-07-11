<template>
    <LoadingPage v-if="isAuthLoading" />

    <!-- App -->

    <div v-if="user" class="min-h-full">

        <div class="">

            <!-- content -->
            <main class="h-screen">
                <NavBar />
                <div>
                    <slot />

                </div>

            </main>
        </div>

    </div>

    <AuthPage v-else />
</template>

<script setup>
const { useAuthUser, initAuth, useAuthLoading, getUser } = useAuth()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()
// const route = useRoute()
// const { pages } = usePage()

// const isPageSlugMatch = computed(() => {
//     return pages.some(page => page.slug === 'matching-slug')
// })

onBeforeMount(() => {
    initAuth()
})


</script>