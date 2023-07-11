<template>
    <div>
        <div class="flex justify-end">
            <button v-if="!showElement"
                class="font-bold shadow-lg mr-2 mb-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs p-2 text-white mt-2 uppercase">Copy
                to
                Clipboard</button>

            <button v-if="showElement"
                @click="() => { addButtonClicked = true; removeButtonClicked = false; showModal = true; handleAddComponent() }"
                class="font-bold shadow-lg mr-2 mb-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs p-2 text-white mt-2">+
                ADD</button>

            <button v-if="showElement" @click="toggleElements"
                class="font-bold shadow-lg mr-4 mb-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs p-2 text-white mt-2">&lt;
                &gt; VIEW
                CODE</button>

            <button v-if="!showElement" @click="toggleElements"
                class="font-bold shadow-lg mr-4 mb-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs p-2 text-white mt-2">PREVIEW</button>
        </div>

        <iframe :srcdoc="codeWithHead" class="w-full border-none" style="height: 640px;" v-if="showElement">
        </iframe>
        <pre
            v-else> <textarea ref="myTextarea" readonly spellcheck="false"
            class="ml-2 w-full rounded-sm sm:text-sm border-2 border-gray-200 mb-2" style="height:560px;">{{ code }}</textarea></pre>
    </div>

    <UIVModal v-if="showModal" type="success" title="" width="lg" v-on:close="showModal = false">
        <p class="text-gray-800">
            Component has been added!
        </p>

        <div class="text-right mt-4">
            <button @click="showModal = false"
                class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Close</button>
        </div>
    </UIVModal>

    <UIVModal v-if="showRemove" type="success" title="" width="lg" v-on:close="showRemove = false">
        <p class="text-gray-800">
            Component has been removed!
        </p>

        <div class="text-right mt-4">
            <button @click="showRemove = false"
                class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Close</button>
        </div>
    </UIVModal>
</template>

<script setup>

const { pageData, addPageComponent, removePageComponent } = usePageData()

const showModal = ref(false)
const showElement = ref(true)
const showRemove = ref(false)


const addButtonClicked = ref(false)
const removeButtonClicked = ref(false)

const removeButtonVisible = computed(() => {
    return addButtonClicked.value && !removeButtonClicked.value
})

function toggleElements() {
    showElement.value = !showElement.value
}

const { id } = useRoute().params
const { getComponentById } = useComponent()

const { component } = await getComponentById(id)

function decodeHTML(text) {
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

const code = decodeHTML(component.code_block);

const codeWithHead = `
    <html>
        <head>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
            ${code}
        </body>
    </html>
`

const copyToClipboard = () => {
    // Get the text from the textarea element
    const textarea = $refs.myTextarea;
    const text = textarea.value;

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch((err) => {
        console.error('Error copying text to clipboard:', err);
    });
}


const handleAddComponent = () => {
    addPageComponent({ id, component: code })
}

const handleRemoveComponent = () => {
    removePageComponent(id)
}


onMounted(() => {
    const storedAddButtonClicked = localStorage.getItem('addButtonClicked')
    const storedRemoveButtonClicked = localStorage.getItem('removeButtonClicked')
    if (storedAddButtonClicked !== null) {
        addButtonClicked.value = JSON.parse(storedAddButtonClicked)
    }
    if (storedRemoveButtonClicked !== null) {
        removeButtonClicked.value = JSON.parse(storedRemoveButtonClicked)
    }
})

watch([addButtonClicked, removeButtonClicked], ([add, remove]) => {
    localStorage.setItem('addButtonClicked', JSON.stringify(add))
    localStorage.setItem('removeButtonClicked', JSON.stringify(remove))
})



</script>
