export default {
    methods: {
        // api urls
        searchMovieSeriesPersonUrl: (type, query, page) => `${process.env.VUE_APP_TMDB_API_URL}/search/${type=='series'?'tv':type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`,
        searchUserUrl: (query, page) => `${process.env.VUE_APP_API_URL}/searchUser/${query}?page=${page}`,
        tmdbMovieSeriesUrl: (type, id) => `${process.env.VUE_APP_TMDB_API_URL}/${type=='series'?'tv':type}/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&append_to_response=credits,videos,recommendations,similar,external_ids`,
        tmdbCollectionUrl: (id) => `${process.env.VUE_APP_TMDB_API_URL}/collection/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en`,
        tmdbSeasonUrl: (id, season) => `${process.env.VUE_APP_TMDB_API_URL}/tv/${id}/season/${season}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&append_to_response=credits,videos`,
        tmdbEpisodeVideoUrl: (id, season, episode) => `${process.env.VUE_APP_TMDB_API_URL}/tv/${id}/season/${season}/episode/${episode}/videos?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en`,
        tmdbPersonUrl: (id) => `${process.env.VUE_APP_TMDB_API_URL}/person/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&append_to_response=movie_credits,tv_credits,external_ids,tagged_images,images`,
        movieSeriesDataUrl: (type, id, season, episode) => `${process.env.VUE_APP_API_URL}/getMovieSeriesAllData/${type}/${id}${season||season===0?'/'+season:''}${episode||episode===0?'/'+episode:''}`,
        personDataUrl: (id) => `${process.env.VUE_APP_API_URL}/getPersonAllData/${id}`,
        userDataUrl: () => `${process.env.VUE_APP_API_URL}/getUserAllData`,
        simpleUserData: () => `${process.env.VUE_APP_API_URL}/getSimpleUserData`,
        getCoverPicsUrl: () => `${process.env.VUE_APP_API_URL}/getCoverPics`,
        getProfilePicsUrl: (id) => `${process.env.VUE_APP_TMDB_API_URL}/movie/${id}/credits?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
        userDetailDataUrl: (id) => `${process.env.VUE_APP_API_URL}/getUserDetailData/${id}`,
        setUser: () => `${process.env.VUE_APP_API_URL}/setUser`,
        notifications: (page = 1) => `${process.env.VUE_APP_API_URL}/notifications?page=${page}`,
        changeNotificationMode: () => `${process.env.VUE_APP_API_URL}/changeNotificationMode`,
        userInteractionSetUrl: (page = 1) => `${process.env.VUE_APP_API_URL}/getUserInteractionSet?page=${page}`,
        discoverUrl: (page = 1) => `${process.env.VUE_APP_API_URL}/discover?page=${page}`,
        reviewsDataUrl: (type, id, page = 1) => `${process.env.VUE_APP_API_URL}/${type==='person'?'getPersonReviewsData':'getReviewsData/'+type}/${id}?page=${page}`,
        moreLikeThisDataUrl: (movieSeriesType, type, id, page = 1) => `${process.env.VUE_APP_TMDB_API_URL}/${movieSeriesType=='series'?'tv':movieSeriesType}/${id}/${type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&page=${page}`,
        

        // page urls
        movieSeriesUrl: (type, id, tab = 'profile', season = -1, episode = -1) => `/${type}/${tab}/${id}${type === 'series' ? '/' + season + '/' + episode : ''}${['cast', 'comment', 'recommendations', 'similar', 'collection'].includes(tab)?'/1':''}`,
        personUrl: (id, tab = 'profile') => `/person/${tab}/${id}${['movie', 'series', 'image'].includes(tab)?'/1':''}`,
        userUrl: (id, tab = 'profile') => `/user/${tab}/${id}${['movie', 'series', 'comment', 'user'].includes(tab)?'/1':''}`,
        settingsUrl: (tab = 'profile') => `/settings/${tab}`,

        // route
        changeParams(paramsObj) {
            let params = this.$route.params
            let query = this.$route.query
            for (let [key, value] of Object.entries(paramsObj)) { params[key] = value }
            this.$router.replace({ name: this.$route.name, params: params, query: query })
        },
        changeQuery(queryObj, keepPageNumber) {
            let params = this.$route.params
            if(!keepPageNumber) if(params.page >= 0) params.page = 1
            this.$router.replace({ name: this.$route.name, params: params, query: queryObj })
        }
    }
}