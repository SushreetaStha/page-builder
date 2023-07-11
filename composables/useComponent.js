export default () => {

    const create = async ({ title, image, code_block, categoryId }) => {
        try {
            const data = await $fetch('/api/component/create', {
                method: 'POST',
                body: {
                    title,
                    image,
                    code_block,
                    categoryId
                }
            })

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const update = async ({ id, title, image, code_block, categoryId }) => {
        try {
            const data = await $fetch('/api/component/update', {
                method: 'POST',
                body: {
                    id,
                    title,
                    image,
                    code_block,
                    categoryId
                }
            })

            return data
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const ArchivedComponent = async ({ id }) => {
        try {
            const data = await $fetch('/api/component/delete', {
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

    const getAllComponents = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch('/api/component/', {
                    method: 'GET'
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getComponentById = async (id) => {
        try {
            const response = await $fetch(`/api/component/${id}`, {
                method: 'GET'
            })

            return response
        } catch (error) {
        }
    }

    return {
        create,
        update,
        ArchivedComponent,
        getAllComponents,
        getComponentById
    }
}