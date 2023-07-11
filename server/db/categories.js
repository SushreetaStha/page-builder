import { prisma } from ".";

export const createCategory = (CategoryData) => {
    return prisma.Category.create({
        data: CategoryData
    })
}

export const getAllCategories = () => {
    return prisma.Category.findMany()
}

export const getCategories = () => {
    return prisma.Category.findMany({
        where: {
            is_archived: true
        }
    })
}

export const updateCategory = (id, categoryData) => {
    return prisma.Category.update({
        where: {
            id: id
        },
        data: {
            ...categoryData,
            title: categoryData.title
        }
    })
}

export const ArchivedCategory = (id) => {
    return prisma.Category.update({
        where: {
            id: id
        },
        data: {
            is_archived: false
        }
    })
}

export const getCategoryById = (id) => {
    return prisma.Category.findUnique({
        where: {
            id: id
        }
    })
}