<template>
    <div class="">
        <div class="fixed flex flex-row justify-center bottom-5" style="left: 680px;">

            <div @click="{ isRightSidebarOpen = false; isSidebarOpen = !isSidebarOpen; }"
                class="mr-2 h-14 w-14 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-3xl cursor-pointer text-center pt-2">
                +</div>
            <SidebarLeft :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
            <div @click="() => { isSidebarOpen = false; isRightSidebarOpen = !isRightSidebarOpen; }"
                class="mr-2 h-14 w-14 bg-gray-900 hover:bg-gray-700 text-white rounded-full cursor-pointer text-center">
                <DownloadIcon class="pl-4 pt-3 w-10 h-10" />
            </div>
            <SidebarSave :isOpen="isRightSidebarOpen" @save="saveHtmlAsFile" @close="isRightSidebarOpen = false" />
        </div>
    </div>
</template>

<script setup>

// function handleScreenClick(event) {
//     if (isRightSidebarOpen.value == true || isSidebarOpen.value == true) {
//         // console.log("Mouse coordinates - X:", event.clientX, "Y:", event.clientY);
//         event.stopPropagation();
//         // isRightSidebarOpen.value = false
//         // isSidebarOpen.value = false
//     }
// }

// window.addEventListener('click', handleScreenClick);

let isSidebarOpen = ref(false);
let isRightSidebarOpen = ref(false);

import { DownloadIcon } from "@heroicons/vue/outline"

function saveHtmlAsFile() {
    const iframes = document.querySelectorAll('iframe');
    const tempContainers = [];

    iframes.forEach((iframe) => {
        const iframeDocument = iframe.contentDocument;
        const hTags = iframeDocument.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, button, label');
        hTags.forEach((element) => {
            element.removeAttribute('contenteditable');
        });

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = iframeDocument.documentElement.innerHTML;
        tempContainers.push(tempContainer);

        hTags.forEach((element) => {
            element.setAttribute('contenteditable', true);
        });
    });

    tempContainers.forEach((tempContainer) => {
        const editedElements = tempContainer.querySelectorAll('[contenteditable="true"]');
        editedElements.forEach((element) => {
            element.innerHTML = element.innerText;
        });
    });

    const combinedContainer = document.createElement('div');
    tempContainers.forEach((tempContainer) => {
        combinedContainer.appendChild(tempContainer);
    });

    const htmlCode = combinedContainer.innerHTML;
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'page.html';
    link.click();

    URL.revokeObjectURL(url);
}



</script>
