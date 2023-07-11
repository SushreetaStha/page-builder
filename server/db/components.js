import { prisma } from ".";


export const createComponent = (ComponentData, categoryId) => {
    return prisma.Components.create({
        data: {
            ...ComponentData,
            category: {
                connect: {
                    id: categoryId
                }
            }
        }
    })
}

export const getAllComponents = () => {
    return prisma.Components.findMany()
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

export const ArchivedComponent = (id) => {
    return prisma.Components.update({
        where: {
            id: id
        },
        data: {
            is_archived: false
        }
    })
}

export const getComponentById = (id) => {
    return prisma.Components.findUnique({
        where: {
            id: id
        }
    })
}

export const deleteComponent = (id) => {
    return prisma.Components.delete({
        where: {
            id: id
        }
    })
}
