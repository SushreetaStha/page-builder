<template>
    <div class="my-2">
        <div class="flex flex-row justify-end">
            <div class="pt-0.5 mr-2 h-6 w-6 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full text-xs cursor-pointer text-center"
                @click="() => moveUpComponent(props.id)">
                &#x25B2;</div>
            <div class="mr-2 h-6 w-6 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full text-xs pt-1 cursor-pointer text-center"
                @click="() => moveDownComponent(props.id)">
                &#x25BC;</div>
            <div class="mr-6 h-6 w-6 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-xs pt-1 cursor-pointer text-center"
                @click="() => onComponentRemove(props.id)">
                &#x2715;</div>
        </div>
    </div>
    <div style="width: 100%;">
        <iframe :id="`pageFrame-${props.id}-${props.count}`" @load="onIframeLoad" :srcdoc="code" style="width:
            100%;
            border: none;" scrolling="no"></iframe>
    </div>

    <div id="myModal" class="modal">
        <span class="close" @click="closeModal">&times;</span>
        <label for="fileInput" class="button-like">
            <input type="file" id="fileInput" ref="fileInputRef" name="photo" class="hidden" />
            <span class="button-text">+ NEW</span>
        </label>

        <p class="absolute mt-12 ml-9">Previously Used</p>
        <div class=" mt-14">
            <div class="image-container inline" v-for="image in imageData" :key="image.id">
                <img class="images w-64 h-40 mt-7 mr-1 mb-2 ml-6 inline" :src="image.image" />
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['id', 'count', 'code'])
const { removePageComponent, getHtml, moveUpComponent, moveDownComponent } = usePageData()
const { create, getAllImages } = useImages();
const { imageData, setImageData } = useImageData()


const fileInputRef = ref(null);
const status = ref(null);
const message = ref(null);


const { data: image, error } = useAsyncData('image', async () => {
    const { images } = await getAllImages()
    setImageData([...images])
})


let targetImage = ref("")
let imageUrl = ref("")

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

let code = getHtml(props.code)

const onIframeLoad = () => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
        const contentHeight = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = contentHeight + "px";

        const hTags = iframe.contentDocument.querySelectorAll(
            "p, h1, h2, h3, h4, h5, h6, a, span, button, label"
        );

        hTags.forEach((element) => {
            element.setAttribute("contenteditable", true);
        });

        const imgTags = iframe.contentDocument.getElementsByTagName("img");
        for (let i = 0; i < imgTags.length; i++) {
            const img = imgTags[i];
            img.addEventListener("click", openModal);
        }
    });
};


let selectedHtmlImg = ref(null);
let ImageButton = ref(null);

const handleImageClick = (img, tag) => {
    console.log(tag)
    if (tag) {
        tag.src = img.src;
        selectedHtmlImg = null;
        closeModal()
    }
}
const handleFileClick = async (tag) => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    saveFile(tag, file)
};

const saveFile = async (tag, file) => {
    if (file) {
        const imageExists = imageData.value.some(
            (image) => image.image === `/_nuxt/uploads/${file.name}`
        );

        if (imageExists) {
            tag.src = `/_nuxt/uploads/${file.name}`;
            selectedHtmlImg = null;
            closeModal();
            return;
        } else {
            uploadImage(file);

            try {
                await create({
                    image: `/_nuxt/uploads/${file.name}`,
                });

                const { data: image, error } = useAsyncData('image', async () => {
                    const { images } = await getAllImages();
                    setImageData([...images]);
                });

            } catch (error) {
                console.log(error);
            }

            tag.src = `/_nuxt/uploads/${file.name}`;
            selectedHtmlImg = null;
            closeModal();
        }
    }
}


onUpdated(() => {
    ImageButton = document.getElementById("fileInput")
    ImageButton.addEventListener('change', () => handleFileClick(selectedHtmlImg));
    selectedHtmlImg = null;

    const Images = document.getElementsByClassName('images');
    for (let i = 0; i < Images.length; i++) {
        const img = Images[i];
        img.addEventListener('click', () => handleImageClick(img, selectedHtmlImg));
    }
})

const openModal = (event) => {
    const target = event.target;
    selectedHtmlImg = target;
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

};

const uploadImage = (file) => {

    const formData = new FormData();
    formData.append('photo', file);
    fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                status.value = 'ok';
                console.log(imageUrl.value)
                imageUrl.value = data.url;
            } else {
                status.value = 'error';
                message.value = data.message;
            }
        })
        .catch(error => {
            console.error(error);
            status.value = 'error';
            message.value = 'An error occurred during the upload.';
        });
};

// function openFileInput(event) {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     const targetImg = targetImage
//     console.log(targetImg)
//     input.addEventListener('change', function () {

//         handleFileSelect(input, targetImg);
//     });

//     input.click();
// }

// function handleFileSelect(input, targetImg) {
//     const file = input.files[0];

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             const imageData = e.target.result;
//             console.log(imageData)

//             const updateTargetImage = function () {
//                 targetImg.setAttribute('src', imageData);
//                 targetImg.setAttribute('alt', file.name);
//                 targetImg.style.cursor = 'pointer';
//             };

//             if (targetImg.complete) {
//                 updateTargetImage();
//             } else {
//                 targetImg.onload = updateTargetImage;
//             }

//             const storedImages = getStoredImages();
//             if (!storedImages.includes(imageData)) {
//                 storedImages.push(imageData);
//                 console.log(storedImages);

//                 storeImages(storedImages);
//             }
//         };
//         reader.readAsDataURL(file);
//         closeModal();
//     }
// }

const onComponentRemove = (id) => {
    removePageComponent(id)
}


</script>

<style>
.modal {
    display: none;
    position: fixed;
    left: 280px;
    top: 100px;
    width: 60%;
    height: 70%;
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

.selected {
    border: 4px solid rgb(104, 104, 255);
}

.button-like {
    margin-top: 18px;
    right: 60px;
    position: absolute;
    display: inline-block;
    cursor: pointer;
    background-color: rgb(59 130 246);
    color: white;
    padding: 8px 12px;
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

.horizontal-images {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}
</style>