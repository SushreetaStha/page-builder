import { prisma } from ".";

export const createPage = async (pageData) => {

    return await prisma.Page.create({
        data: pageData
    })
}

export const updatePage = (id, pageData) => {
    return prisma.Page.update({
        where: {
            id: id
        },
        data: {
            ...pageData,
            title: pageData.title,
            html: pageData.html
        }
    })
}

export const getPageById = (id) => {
    return prisma.Page.findUnique({
        where: {
            id: id
        }
    })
}

export const getPageBySlug = (slug) => {
    return prisma.Page.findUnique({
        where: {
            slug: slug
        }
    })
}

export const getAllPages = () => {
    return prisma.Page.findMany()
}

export const ArchivedPage = (id) => {
    return prisma.Page.update({
        where: {
            id: id
        },
        data: {
            is_archived: false
        }
    })
}

export const deletePage = (id) => {
    return prisma.Page.delete({
        where: {
            id: id
        }
    })
}

export const deleteAllPage = () => {
    return prisma.Page.deleteMany({})
}

export const PublishPage = (id) => {
    return prisma.Page.update({
        where: {
            id: id
        },
        data: {
            is_published: false
        }
    })
}

export const updatePageBySlug = (slug, pageData) => {
    return prisma.Page.update({
        where: {
            slug: slug
        },
        data: {
            ...pageData,
            image: pageData.image
        }
    })
}
