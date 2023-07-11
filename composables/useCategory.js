export default () => {

    const create = async ({ title }) => {
        try {
            const data = await $fetch('/api/category/create', {
                method: 'POST',
                body: {
                    title
                }
            })

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const update = async ({ id, title }) => {
        try {
            const data = await $fetch('/api/category/update', {
                method: 'POST',
                body: {
                    id,
                    title
                }
            })

            return data
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const archivedCategory = async ({ id }) => {
        try {
            const data = await $fetch('/api/category/delete', {
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

    const getAllCategories = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch('/api/category/', {
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

    const getCategoryById = async (catId) => {
        try {
            const response = await $fetch(`/api/category/${catId}`, {
                method: 'GET'
            })

            return response
        } catch (error) {
            reject(error)
        }
    }

    return {
        create,
        update,
        archivedCategory,
        getAllCategories,
        getCategoryById,
        getCategories
    }
}