<template>
    <div>
        <div class="p-6 text-2xl">PAGE LIST</div>
        <div class="text-right mr-32 mb-2 text-sm">
            <NuxtLink><button @click="openModal"
                    class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">
                    +
                    Add Page
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
                    <tr class="bg-white border-b" v-for="(page, index) in pageItem" :key="index">
                        <template v-if="page.is_archived && page.is_published">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ page.title }}
                            </th>
                            <td>
                                <NuxtLink :to="`/${page.slug}`">
                                    <button @click="onPublishClick(page.id)"
                                        class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white">Publish</button>
                                </NuxtLink>
                                <NuxtLink :to="`/pageList/${page.id}`">
                                    <button
                                        class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-green-500 hover:bg-green-600 hover:text-white">Edit</button>
                                </NuxtLink>

                                <button
                                    class="mx-1 mt-2 text-center px-4 py-2 text-white rounded-full bg-red-500 hover:bg-red-600 hover:text-white"
                                    @click="{ showModal = true; onDeleteId(page.id) }">Delete
                                </button>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <UIVModal v-if="showModal" type="danger" title="Confirm Action" width="sm" v-on:close="showModal = false">
        <p class="text-gray-800">
            Are you sure you want to delete this page? This action cannot be undone.
        </p>

        <div class="text-right mt-4">
            <button @click="showModal = false"
                class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Cancel</button>
            <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
                @click="{ showModal = false; onDeleteClick() }">Delete</button>
        </div>
    </UIVModal>
    <div id="AddModal" class="modal">
        <span class="close" @click="closeModal">&times;</span>
        <div class="mt-16 ml-8">
            <p class="mb-2">Title</p>
            <form>
                <input v-model="data.title" type="text" class="mb-4 bg-gray-800 rounded-md p-1 pr-32"
                    placeholder="Enter title..." required />
                <p class="mb-2">Description</p>
                <input v-model="data.description" type="text" class="mb-4 bg-gray-800 rounded-md p-1 pr-32"
                    placeholder="Enter description..." required />
                <p class="">Image</p>
                <label for="fileInput" class="upload-image">
                    <input type="file" id="fileInput" ref="fileInputRef" name="photo" class="hidden" />
                    <span class="button-text">+ UPLOAD</span>
                </label>
                <img id="uploadedImage" src="" />
                <button @click="onSubmit"
                    class="right-48 absolute bottom-7 text-xs text-center px-5 py-3 text-white rounded-lg bg-green-600 hover:bg-green-700 hover:text-white font-semibold">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script setup>
const { create, getAllPages, archivedPage, publishedPage } = usePage()
const { pageItem, setPageItem } = usePageItem()
const { clearPageData } = usePageData()

const showModal = ref(false)
const idToDelete = ref(null)

const data = reactive({
    title: '',
    description: '',
    image: '',
    loading: false
})

const { pages } = await getAllPages()
setPageItem([...pages])

const openModal = (event) => {
    const modal = document.getElementById('AddModal');
    modal.style.display = 'block';

    const fileInput = document.getElementById('fileInput');

    const uploadedImage = document.getElementById('uploadedImage');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = function (event) {
            uploadedImage.src = event.target.result;
            uploadedImage.className = "mt-16 w-96 h-48"
            data.image = event.target.result
        };

        reader.readAsDataURL(file);
    });

};

function closeModal() {
    document.getElementById("AddModal").style.display = "none";
    uploadedImage.src = "";
    uploadedImage.className = "";

}

const onPublishClick = async (id) => {
    console.log(id)
    console.log("sdsd")
    await publishedPage({
        id: id
    })
}

const onDeleteClick = async () => {
    console.log(idToDelete.value)
    await archivedPage({
        id: idToDelete.value
    })
    const { pages } = await getAllPages()
    setPageItem([...pages])
}

const onDeleteId = async (id) => {
    idToDelete.value = id
    console.log(idToDelete.value)
}

function handleNew() {
    clearPageData([])
}


const onSubmit = async (event) => {
    event.preventDefault()
    let slugCount = 0
    const titleName = data.title
    let convertedString = titleName.replace(/\s/g, "-").toLowerCase();
    let slugName = convertedString + "-" + slugCount;
    const slugExists = pages.some(
        (page) => page.slug === slugName
    );
    if (slugExists) {
        slugCount++;
        slugName = convertedString + "-" + slugCount;
    }
    try {
        await create({
            image: data.image,
            title: data.title,
            description: data.description,
            image: data.image,
            slug: slugName,
        })

        const { pages } = await getAllPages()
        setPageItem([...pages])
        closeModal()

    } catch (error) {
        console.log(error)
    }
}


</script>
<style>
#AddModal {
    display: none;
    position: fixed;
    left: 480px;
    top: 100px;
    width: 30%;
    height: 80%;
    overflow: auto;
    color: white;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
}

.close {
    color: white;
    position: absolute;
    top: 10px;
    right: 25px;
    font-size: 35px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #bbb;
}

.upload-image {
    margin-top: 10px;
    padding: 7px 12px;
    position: absolute;
    display: inline-block;
    cursor: pointer;
    background-color: rgb(59 130 246);
    color: white;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-like:hover {
    background-color: rgb(37 99 235);
}

.button-text {
    display: inline-block;
    vertical-align: middle;
}
</style>