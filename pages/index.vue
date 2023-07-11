<template>
  <header class="text-gray-600 body-font border-b-2 border-opacity-80 border-gray-200">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <span class="cursor-pointer ml-3 text-xl">merojob</span>
      </a>
      <nav
        class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <a class="cursor-pointer mr-5 hover:text-gray-900">Home</a>
        <NuxtLink to="/pageList" class="cursor-pointer mr-5 hover:text-gray-900">Pages</NuxtLink>
      </nav>

      <div v-if="user">
        <button
          class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">{{
            user.name }}

        </button>
      </div>
      <div v-else>
        <NuxtLink to="/login">
          <button
            class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Login
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </header>

  <div class="mx-20 ml-36 my-6 flex flex-wrap">
    <div class="bg-white" v-for="(page, index) in pageItem" :key="index">
      <template v-if="page.is_archived && !page.is_published">
        <NuxtLink :to="`/${page.slug}`">
          <div
            class="max-w-sm rounded overflow-hidden shadow-lg mx-1 mr-6 my-5 border-2 border-opacity-60 border-gray-100">
            <img class="w-full h-52" :src="page.image" alt="image">
            <div class="px-6 py-4">

              <div class="font-bold text-xl mb-2">{{ page.title }}</div>
              <p class="text-gray-700 text-base">
                {{ page.description }}
              </p>
            </div>

          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: false
})

const { getAllPages } = usePage()
const { pageItem, setPageItem } = usePageItem()
const { pages } = await getAllPages()
setPageItem([...pages])


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
