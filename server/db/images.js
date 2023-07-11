import { prisma } from ".";


export const createImage = (ImageData) => {
    return prisma.Image.create({
        data: {
            ...ImageData
        }
    })
}

export const getAllImages = () => {
    return prisma.Image.findMany()
}

export const updateComponent = (id, ComponentData, categoryId) => {
    return prisma.Components.update({
        where: {
            id: id
        },
        data: {
            ...ComponentData,
            title: ComponentData.title,
            image: ComponentData.image,
            code_block: ComponentData.code_block,
            category: {
                connect: {
                    id: categoryId
                }
            }
        }
    })
}


export const getImageById = (id) => {
    return prisma.Image.findUnique({
        where: {
            id: id
        }
    })
}

export const deleteImage = (id) => {
    return prisma.Image.delete({
        where: {
            id: id
        }
    })
}

export const deleteAllImage = () => {
    return prisma.Image.deleteMany({})
}