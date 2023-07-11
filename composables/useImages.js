export default () => {

    const create = async ({ image }) => {
        try {
            const data = await $fetch('/api/images/create', {
                method: 'POST',
                body: {
                    image
                }
            })

            return data
        } catch (error) {
            console.log(error)
        }
    }


    const getAllImages = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch('/api/images/', {
                    method: 'GET'
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }


    return {
        create,
        update,
        getAllImages,
    }
}