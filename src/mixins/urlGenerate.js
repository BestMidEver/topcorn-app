export default {
    methods: {
        // api urls
        searchMovieSeriesPersonUrl: (type, query, page) => `${process.env.VUE_APP_TMDB_API_URL}/search/${type=='series'?'tv':type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`,
        searchUserUrl: (query, page) => `${process.env.VUE_APP_API_URL}/searchUser/${query}?page=${page}`,
        tmdbMovieSeriesUrl: (type, id) => `${process.env.VUE_APP_TMDB_API_URL}/${type=='series'?'tv':type}/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&append_to_response=credits,videos,recommendations,similar,external_ids`,
        movieSeriesDataUrl: (type, id) => `${process.env.VUE_APP_API_URL}/getMovieSeriesAllData/${type}/${id}`,

        // page urls
        movieSeriesUrl: (type, id, tab = 'profile') => `/${type}/${tab}/${id}`,
    }
}