module.exports = {
    Query: {
        shows: (_, { page }, { dataSources }) => dataSources.showAPI.getAllShows({ page: page }),
        search: (_, { name }, { dataSources }) => dataSources.showAPI.getShowsByName({ name: name }),
        show: (_, { showId }, { dataSources }) => dataSources.showAPI.getShowById({ showId: showId }),
        favorites: async (_, { userId }, { dataSources }) => {
            const showIds = await dataSources.userAPI.getFavorites({ userId })
            const shows = await dataSources.showAPI.getFavorites({ showIds })
            return shows
        },
        schedule: async (_, { userId }, { dataSources }) => {
            const showIds = await dataSources.userAPI.getSchedule({ userId })
            const shows = await dataSources.showAPI.getScheduled({ showIds })
            return shows
        },
        comment: (_, { userId, showId }, { dataSources }) => dataSources.userAPI.getComment({ userId: userId, showId: showId }),
        checkShowStatus: (_, { userId, showId }, { dataSources }) => dataSources.userAPI.getShowStatus({ userId: userId, showId: showId })
    },

    Mutation: {
        signup: async (_, { name, email, password }, { dataSources }) => {
            const response = await dataSources.userAPI.signup({ name, email, password })
            return {
                success: response.status == 1,
                message: response.message,
                id: response.data != null ? response.data.user_id : null
            }
        },
        login: async (_, { email, password }, { dataSources }) => {
            const response = await dataSources.userAPI.login({ email, password })
            return {
                success: response.status == 1,
                message: response.message,
                id: response.data != null ? response.data.user_id : null
            }
        },
        addFavorite: async (_, { userId, showId, addToFavorites }, { dataSources }) => {
            const response = await dataSources.userAPI.addFavorite({ userId, showId, addToFavorites })
            return {
                success: response.status == 1,
                message: response.message,
                flag: response.flag
            }
        },
        addSchedule: async (_, { userId, showId, addToSchedule }, { dataSources }) => {
            const response = await dataSources.userAPI.addSchedule({ userId, showId, addToSchedule })
            return {
                success: response.status == 1,
                message: response.message,
                flag: response.flag
            }
        },
        addComment: async (_, { userId, showId, comment }, { dataSources }) => {
            const response = await dataSources.userAPI.addComment({ userId, showId, comment })
            return {
                success: response.status == 1,
                message: response.message,
            }
        }
    },

    Show: {
        // The default size is 'LARGE' if not provided
        image: (image, { size } = { size: 'ORIGINAL' }) => {
            return size === 'MEDIUM'
                ? image.medium
                : image.original;
        },
    },

    Person: {
        // The default size is 'LARGE' if not provided
        image: (image, { size } = { size: 'ORIGINAL' }) => {
            return size === 'MEDIUM'
                ? image.medium
                : image.original;
        },
    },
}