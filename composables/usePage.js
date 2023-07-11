export default () => {

    const create = async ({ title, html, image, slug, description }) => {
        try {
            const data = await $fetch('/api/pages/create', {
                method: 'POST',
                body: {
                    title,
                    html,
                    image,
                    slug,
                    description
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const update = async ({ id, title, html }) => {
        try {
            const data = await $fetch('/api/pages/update', {
                method: 'POST',
                body: {
                    id,
                    title,
                    html
                }
            })

            return data
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const archivedPage = async ({ id }) => {
        try {
            const data = await $fetch('/api/pages/delete', {
                method: 'POST',
                body: {
                    id
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllPages = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch('/api/pages/', {
                    method: 'GET'
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getCategories = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch('/api/category/unarchived', {
                    method: 'GET'
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

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
    const getPageBySlug = async (slug) => {
        try {
            const response = await $fetch(`/api/pages/slug/${slug}`, {
                method: 'GET'
            })

            return response
        } catch (error) {
        }
    }

    const publishedPage = async ({ id }) => {
        try {
            const data = await $fetch('/api/pages/publish', {
                method: 'POST',
                body: {
                    id
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateBySlug = async ({ slug, image }) => {
        try {
            const data = await $fetch('/api/pages/updateSlug', {
                method: 'POST',
                body: {
                    slug,
                    image
                }
            })

            return data
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        create,
        update,
        archivedPage,
        getAllPages,
        getPageById,
        getCategories,
        getPageBySlug,
        publishedPage,
        updateBySlug
    }
}