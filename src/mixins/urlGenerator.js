import Vue from 'vue'

Vue.mixin({
    methods: {
        searchMovieSeriesPersonUrl: (type, query, page) => `${process.env.VUE_APP_TMDB_API_URL}/3/search/${type=='series'?'tv':type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`,
        searchUserUrl: (query, page) => `${process.env.VUE_APP_API_URL}/searchUser/${query}?page=${page}`
    }
})