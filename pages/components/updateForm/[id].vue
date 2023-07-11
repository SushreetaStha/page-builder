<template>
    <div class="form-input ml-6">
        <form method="post" @submit="updateComponent" content-type="multipart/form-encoded">
            <input type="text">

            <div class="p-3 text-xl">Update Component</div>
            <UIInput label="Title" placeholder="Enter title" v-model="data.title"></UIInput>
            <p>Image</p>

            <img @click="openFileInput" class="cursor-pointer w-80 h-48 object-cover object-center" :src="data.image"
                alt="blog">
            <p>Code</p>
            <textarea v-model="data.code_block"
                class="w-full h-28 rounded-sm sm:text-sm border-2 border-gray-200 mb-2"></textarea>
            <p>Category</p>
            <select v-model="data.categoryId"
                class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value selected>-- Select --</option>
                <template v-for="category in categories" :key="category.id">
                    <option :value="category.id">{{ category.title }}</option>
                </template>
            </select>
            <button
                class="mx-1 mt-2 text-center py-2 px-10 text-white rounded-full bg-blue-500 hover:bg-blue-600 hover:text-white">Update</button>
        </form>
    </div>
</template>

<script setup>
const { id } = useRoute().params

const { update, getComponentById } = useComponent()
const { component } = await getComponentById(id)

const { getCategories } = useCategory()
const { categories } = await getCategories()

const data = reactive({
    title: component.title,
    code_block: component.code_block,
    image: component.image,
    categoryId: component.categoryId,
    loading: false
})


async function updateComponent(e) {
    e.preventDefault();
    data.loading = true
    try {
        const result = await update({
            id: id,
            image: data.image,
            title: data.title,
            code_block: data.code_block,
            categoryId: data.categoryId
        })

        // const newData = userData.value.filter(x => x.id != result.body.id)

        // setUserData([result.body])
        navigateTo('/components')
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

function openFileInput(event) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    const targetImg = event.target;

    input.addEventListener('change', function () {
        handleFileSelect(input, targetImg);
    });

    input.click();
}

function handleFileSelect(input, targetImg) {
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            data.image = imageData
            targetImg.setAttribute('src', imageData);
            targetImg.style.cursor = 'pointer';
        };
        reader.readAsDataURL(file);
    }
}

</script>

<style lang="scss" scoped></style>