export default {
    methods: {
        // api urls
        searchMovieSeriesPersonUrl: (type, query, page) => `${process.env.VUE_APP_TMDB_API_URL}/search/${type=='series'?'tv':type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`,
        searchUserUrl: (query, page) => `${process.env.VUE_APP_API_URL}/searchUser/${query}?page=${page}`,
        tmdbMovieSeriesUrl: (type, id) => `${process.env.VUE_APP_TMDB_API_URL}/${type=='series'?'tv':type}/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&append_to_response=credits,videos,recommendations,similar,external_ids`,
        tmdbCollectionUrl: (id) => `${process.env.VUE_APP_TMDB_API_URL}/collection/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en`,
        tmdbSeasonUrl: (id, season) => `${process.env.VUE_APP_TMDB_API_URL}/tv/${id}/season/${season}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&append_to_response=credits,videos`,
        tmdbEpisodeVideoUrl: (id, season, episode) => `${process.env.VUE_APP_TMDB_API_URL}/tv/${id}/season/${season}/episode/${episode}/videos?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en`,
        movieSeriesDataUrl: (type, id) => `${process.env.VUE_APP_API_URL}/getMovieSeriesAllData/${type}/${id}`,
        reviewsDataUrl: (type, id, page = 1) => `${process.env.VUE_APP_API_URL}/getReviewsData/${type}/${id}?page=${page}`,
        moreLikeThisDataUrl: (movieSeriesType, type, id, page = 1) => `${process.env.VUE_APP_TMDB_API_URL}/${movieSeriesType=='series'?'tv':movieSeriesType}/${id}/${type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&page=${page}`,
        

        // page urls
        movieSeriesUrl: (type, id, tab = 'profile', season = -1, episode = -1) => `/${type}/${tab}/${id}${type === 'series' && tab !== 'recommendations' ? '/' + season + '/' + episode : ''}${['cast', 'comment', 'recommendations'].includes(tab)?'/1':''}`,
        personUrl: (id) => `/person/${id}`,
        userUrl: (id) => `/user/${id}`,
    }
}