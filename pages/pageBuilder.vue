<template>
    <div class="flex justify-end">

        <form @submit.prevent="handleSubmit">
            <div>
                <input style="border: 1px solid #9ca3af5c;" required class="font-bold mr-2 rounded-lg p-1 mt-2" type="text"
                    placeholder="Enter title..." v-model="dataPage.title" />
                <button formnovalidate @click="{ saveButtonClicked = true; showModal = true; handleSave(); }"
                    class="font-bold shadow-lg mr-1 px-3 mb-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs p-2 text-white mt-2 uppercase">Save
                </button>
                <input type="submit" value="DONE" @click="handleSaveToDB"
                    class="font-bold shadow-lg mr-1 px-3 mb-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs p-2 text-white mt-2 uppercase" />
                <button formnovalidate @click="{ saveButtonClicked = true; showClearModal = true }"
                    class="font-bold shadow-lg mr-3 px-3 mb-2 rounded-lg bg-red-500 hover:bg-red-600 text-xs p-2 text-white mt-2 uppercase">Clear
                </button>
            </div>
            <div v-if="!dataPage.title" class="text-red-500 text-sm">Title is required.</div>

        </form>

    </div>

    <div v-if="pageData.length === 0">
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        class="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
                        <path
                            d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 
        newPageData.push({ id: id, component: htmlCode })
    })
67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z">
                        </path>
                    </svg>
                    <p class="leading-relaxed text-lg">Build your own Page!</p>
                    <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
                    <h2 class="text-xl text-gray-900 font-medium title-font tracking-wider">Click on the '+' button below!
                    </h2>
                </div>
            </div>
        </section>
    </div>

    <div v-else>
        <div v-for="page in pageData" :key="page.id">
            <MainIFrame :id="page.id" :code="page.component" :count="count++" />
        </div>
    </div>
    <div>
        <Footer />
    </div>
    <UIVModal v-if="showModal" type="success" title="" width="lg" v-on:close="showModal = false">
        <p class="text-gray-800">
            Page has been saved!
        </p>

        <div class="text-right mt-4">
            <button @click="showModal = false"
                class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Close</button>
        </div>
    </UIVModal>
    <UIVModal v-if="showClearModal" type="danger" title="Confirm Action" width="sm" v-on:close="showClearModal = false">
        <p class="text-gray-800">
            Are you sure you want to clear? This action ca
        newPageData.push({ id: id, component: htmlCode })
    })
nnot be undone.
        </p>

        <div class="text-right mt-4">
            <button @click="showClearModal = false"
                class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Cancel</button>
            <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
                @click="{ showClearModal = false; handleClear() }">Clear</button>
        </div>
    </UIVModal>
</template>

<script setup>

const { getAllPages } = usePage()
const { pages } = await getAllPages()

const { pageData, fetchData, setPageData } = usePageData()
const showModal = ref(false)
const showClearModal = ref(false)

let count = ref(0)
const dataPage = reactive({
    title: '',
})

onBeforeMount(async () => {
    count = 0
    setPageData([])
    await fetchData()
})

onUpdated(() => {
    count = 0;
})
const handleSave = async () => {
    const ids = pageData.value.map(x => x.id)
    let newPageData = []
    let c = 0

    ids.forEach(id => {
        const iframe = document.getElementById(`pageFrame-${id}-${c++}`);
        var iframeDocument = iframe.contentDocument;
        const htmlCode = iframeDocument.body.innerHTML;

        newPageData.push({ id: id, component: htmlCode })
    })

    setPageData(newPageData)
    localStorage.setItem('pages', JSON.stringify(newPageData))
    const ls = localStorage.getItem('pages')
}


const handleSaveToDB = async () => {
    let c = 0
    let slugCount = 0
    const titleName = dataPage.title
    let convertedString = titleName.replace(/\s/g, "-").toLowerCase();
    let slugName = convertedString + "-" + slugCount;
    const slugExists = pages.some(
        (page) => page.slug === slugName
    );
    if (slugExists) {
        slugCount++;
        slugName = convertedString + "-" + slugCount;
    }
    if (!dataPage.title) {
    }
    else {
        const ids = pageData.value.map(x => x.id)
        let newPageData = []

        ids.forEach(id => {
            const iframe = document.getElementById(`pageFrame-${id}-${c++}`);
            var iframeDocument = iframe.contentDocument;
            const htmlCode = iframeDocument.body.innerHTML;

            newPageData.push({ id: id, component: htmlCode })
            console.log(newPageData)
        })

        setPageData(newPageData)
        try {
            const response = await fetch('/api/pages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: dataPage.title,
                    html: JSON.stringify(newPageData),
                    slug: slugName
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create page');
            }
        } catch (error) {
            console.log(error);
        }
        navigateTo("/pageList")
        localStorage.setItem('pages', '')

    }
}

function handleClear() {
    setPageData("");
    localStorage.setItem('pages', '')
}

</script>

<style></style>