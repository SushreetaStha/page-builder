import { prisma } from ".";
import bcrypt from "bcrypt"

export const createUser = (userData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }
    return prisma.user.create({
        data: finalUserData
    })
}

export const getUserByEmail = (email) => {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

export const getAllUser = () => {
    return prisma.user.findMany()
}

export const updateUser = (id, userData) => {
    console.log(id, userData);
    return prisma.user.update({
        where: {
            id: id
        },
        data: {
            ...userData,
            name: userData.name,
            email: userData.email,
        }
    })
}

export const deleteUser = (id) => {
    return prisma.user.delete({
        where: {
            id: id
        }
    })
}

export const Archived = (userId) => {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            is_archived: false
        }
    })
}