import jwt_decode from "jwt-decode"

export default () => {

    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('auth_loading', () => true)

    const setToken = (newToken) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }


    const login = ({ email, password }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        email,
                        password
                    }
                })

                setToken(data.access_token)
                setUser(data.user)

                console.log(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh')
                setToken(data.access_token)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }


    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/auth/user')
                refreshToken(data)
                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken()

        if (!authToken.value) {
            return
        }

        const jwt = jwt_decode(authToken.value)
        // console.log(jwt)

        const newRefreshTime = jwt.exp - 60000

        setTimeout(async () => {
            await refreshToken()
            reRefreshAccessToken()
        }, newRefreshTime);
    }


    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setIsAuthLoading(true)
            try {
                await refreshToken()
                await getUser()

                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                console.log(error)
                reject(error)
            } finally {
                setIsAuthLoading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchApi('/api/auth/logout', {
                    method: 'POST'
                })

                setToken(null)
                setUser(null)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    const register = async ({ name, email, password }) => {
        try {
            const data = await $fetch('/api/auth/register', {
                method: 'POST',
                body: {
                    name,
                    email,
                    password
                }
            })

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const update = async ({ id, name, email }) => {
        try {
            const data = await $fetch('/api/auth/update', {
                method: 'POST',
                body: {
                    id,
                    name,
                    email
                }
            })

            return data
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const archivedUser = async ({ id }) => {
        try {
            const data = await $fetch('/api/auth/delete', {
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

    const getUserById = (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch(`/api/users/${userId}`, {
                    method: 'GET'
                })
                const userObject = { ...response };
                resolve(userObject)
            } catch (error) {
                reject(error)
            }
        })
    }
    const getUserByEmail = (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch(`/api/users/email/${email}`, {
                    method: 'GET'
                })
                const userObject = { ...response };
                resolve(userObject)
            } catch (error) {
                reject(error)
            }
        })
    }


    const getAllUsers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $fetch('/api/users', {
                    method: 'GET'
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    return {
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        useAuthLoading,
        logout,
        register,
        update,
        archivedUser,
        getUserById,
        getUserByEmail,
        getAllUsers,
        getUser
    }
}