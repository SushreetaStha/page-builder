<template>
    <div style="width: 100%;">
        <iframe @load="onIframeLoad" :srcdoc="html" style="width:
            100%;
            border: none;" scrolling="no"></iframe>
    </div>
</template>

<script setup>
let count = ref(0)
const { slug } = useRoute().params
const { getPageBySlug } = usePage()
const { page } = await getPageBySlug(slug)
const parsedData = JSON.parse(page.html);
const componentsHTML = parsedData.map(item => item.component);
const mergedHTML = componentsHTML.join('');

useHead(() => {
    return {
        __dangerouslyDisableSanitizers: ['script'],
        script: [
            { innerHTML: 'body { margin: 0; }', type: 'text/css' }
        ]
    }
})

definePageMeta({
    layout: "blank-layout",
});

const html = `
            <html>
                <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" rel="stylesheet">
                </head>
                <body>
                    ${mergedHTML}
                </body>
            </html>
        `
onMounted(() => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
        const contentHeight = iframe.contentWindow.document.body.scrollHeight;
        console.log(contentHeight)
        iframe.style.height = contentHeight + "px";

        const hTags = iframe.contentDocument.querySelectorAll(
            "p, h1, h2, h3, h4, h5, h6, a, span, button, label"
        );
        const aTags = iframe.contentDocument.querySelectorAll(
            "a, button"
        );
        hTags.forEach((element) => {
            element.setAttribute("contenteditable", false);
        });

        aTags.forEach((element) => {
            element.style.cursor = "pointer";
        });
    });
})

const onIframeLoad = () => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
        const contentHeight = iframe.contentWindow.document.body.scrollHeight;
        console.log(contentHeight)
        iframe.style.height = contentHeight + "px";

        const hTags = iframe.contentDocument.querySelectorAll(
            "p, h1, h2, h3, h4, h5, h6, a, span, button, label"
        );
        const aTags = iframe.contentDocument.querySelectorAll(
            "a, button"
        );
        hTags.forEach((element) => {
            element.setAttribute("contenteditable", false);
        });

        aTags.forEach((element) => {
            element.style.cursor = "pointer";
        });
    });
};
</script>

<style lang="scss" scoped></style>