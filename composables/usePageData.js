const usePageData = () => {
    const pageData = useState('page', () => [])
    const getPageById = async (id) => {
        try {
            const response = await $fetch(`/api/pages/${id}`, {
                method: 'GET'
            })

            return response
        } catch (error) {
            reject(error)
        }
    }

    const fetchData = async () => {

        // const di = await getPageById()
        const d = localStorage.getItem('pages')
        const data = JSON.parse(d)
        const state = data.map(async (x) => {
            const val = { id: x.id, component: x.component }
            return val
        })
        var s = await Promise.all(state)
        s.forEach(x => addPageComponent(x))
    }

    const fetchEditData = async (id) => {

        const di = await getPageById(id)
        const data = JSON.parse(di.page.html)
        const state = data.map(async (x) => {
            const val = { id: x.id, component: x.component }
            return val
        })
        var s = await Promise.all(state)
        s.forEach(x => addPageComponent(x))
    }

    const setPageData = (data) => {
        pageData.value = [...data]
    }

    const clearPageData = () => {
        pageData.value = []
    }

    const addPageComponent = (pageComponent) => {
        const newComponent = { ...pageComponent }; // Create a copy of the component

        pageData.value = [...pageData.value, newComponent];
    };


    const removePageComponent = (id) => {
        const temp = [...pageData.value]
        const index = pageData.value.findIndex(x => x.id === id)
        if (index !== -1) {
            temp.splice(index, 1);
        }
        pageData.value = [...temp]
    }

    const isPageActive = (id) => {
        return pageData.value.some(page => page.id === id)
    }

    const getHtml = (code) => {
        const html = `
            <html>
                <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" rel="stylesheet">
                </head>
                <body>
                ${code}
                </body>
            </html>
        `
        return html
    }


    const moveUpComponent = (id) => {
        const arr = [...pageData.value]
        const index = pageData.value.findIndex(x => x.id === id)

        if (index > 0 && index < arr.length) {
            const element = arr[index];
            arr.splice(index, 1);
            arr.splice(index - 1, 0, element);
        }

        pageData.value = [...arr]
    }

    const moveDownComponent = (id) => {
        const arr = [...pageData.value]
        const index = pageData.value.findIndex(x => x.id === id)

        if (index >= 0 && index < arr.length - 1) {
            const element = arr[index];
            arr.splice(index, 1);
            arr.splice(index + 1, 0, element);
        }

        pageData.value = [...arr]
    }


    const updateComponent = (id, value) => {
        const page = pageData.value.find(item => item.id === id);
        if (page) {
            page.component = value;
        }
    };

    return {
        pageData,
        fetchData,
        addPageComponent,
        removePageComponent,
        isPageActive,
        getHtml,
        moveUpComponent,
        moveDownComponent,
        updateComponent,
        setPageData,
        clearPageData,
        fetchEditData
    }
}

export default usePageData