import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: store.getters['auth/loggedIn'] ? process.env.VUE_APP_HOME_TO : '/login' },
  { path: '/login', name: 'login', component: function () { return import('@/views/Login.vue') }, meta: { requiresVisitor: true } },
  { path: '/register', name: 'register', component: function () { return import('@/views/Register.vue') }, meta: { requiresVisitor: true }  },
  { path: '/forgot-password', name: 'forgot-password', component: function () { return import('@/views/ForgotPassword.vue') }, meta: { requiresVisitor: true }  },
  { path: '/reset-password/:code', alias: '/password/reset/:code', name: 'reset-password', component: function () { return import('@/views/ResetPassword.vue') }, meta: { requiresVisitor: true }  },
  { path: '/privacy-policy', name: 'privacy-policy', component: function () { return import('@/views/PrivacyPolicy.vue') } },
  { path: '/search-*/:tab/:page', name: 'search', component: function () { return import('@/views/Search.vue') }, meta: { requiresAuth: true },
    children: [
      { path: '/search-/movie/:page', name: 'search-movie-recents', component: function () { return import('@/components/search/RecentlyVisitedMovies.vue') } },
      { path: '/search-*/movie/:page', name: 'search-movie-search', component: function () { return import('@/components/search/SearchMovie.vue') } },
      { path: '/search-/series/:page', name: 'search-series-recents', component: function () { return import('@/components/search/RecentlyVisitedSeries.vue') } },
      { path: '/search-*/series/:page', name: 'search-series-search', component: function () { return import('@/components/search/SearchSeries.vue') } },
      { path: '/search-/person/:page', name: 'search-person-recents', component: function () { return import('@/components/search/RecentlyVisitedPeople.vue') } },
      { path: '/search-*/person/:page', name: 'search-person-search', component: function () { return import('@/components/search/SearchPerson.vue') } },
      { path: '/search-/user/:page', name: 'search-user-recents', component: function () { return import('@/components/search/RecentlyVisitedUsers.vue') } },
      { path: '/search-*/user/:page', name: 'search-user-search', component: function () { return import('@/components/search/SearchUser.vue') } },
      { path: '/search-/list/:page', name: 'search-list-recents', component: function () { return import('@/components/search/RecentlyVisitedLists.vue') } },
      { path: '/search-*/list/:page', name: 'search-list-search', component: function () { return import('@/components/search/SearchList.vue') } },
    ]
  },
  { path: '/quick-vote', name: 'quickVote', component: function () { return import('@/views/QuickVote.vue') }, meta: { requiresAuth: true },
    children: [
      { path: '/quick-vote-movies', name: 'quickVote-movies', component: function () { return import('@/components/quickVote/QuickVoteMoviesSeries.vue') }, props: { type: 'movie' } },
      { path: '/quick-vote-series', name: 'quickVote-series', component: function () { return import('@/components/quickVote/QuickVoteMoviesSeries.vue') }, props: { type: 'series' } },
    ]
  },
  { path: '/movie/:tab/:id', name: 'movie', component: function () { return import('@/views/Movie.vue') }, meta: { requiresAuth: true }, props: { type: 'movie' },
    children: [
      { path: '/movie/profile/:id', alias: '/movie/:id', name: 'movie-profile', component: function () { return import('@/components/movie/MovieSeriesProfile.vue') }, props: { type: 'movie' } },
      { path: '/movie/detail/:id', name: 'movie-detail', component: function () { return import('@/components/movie/MovieSeriesDetail.vue') }, props: { type: 'movie' } },
      { path: '/movie/cast/:id/:page', name: 'movie-cast-cast', component: function () { return import('@/components/movie/MovieSeriesCast.vue') }, props: { type: 'movie' } },
      { path: '/movie/crew/:id/:page', name: 'movie-cast-crew', component: function () { return import('@/components/movie/MovieSeriesCast.vue') }, props: { type: 'movie' } },
      { path: '/movie/comment/:id/:page', name: 'movie-comment', component: function () { return import('@/components/movie/MovieSeriesComment.vue') }, props: { type: 'movie' } },
      { path: '/movie/recommendations/:id/:page', name: 'movie-moreLikeThis-recommendations', component: function () { return import('@/components/movie/MovieSeriesMoreLikeThis.vue') }, props: { type: 'movie' } },
      { path: '/movie/similar/:id/:page', name: 'movie-moreLikeThis-similar', component: function () { return import('@/components/movie/MovieSeriesMoreLikeThis.vue') }, props: { type: 'movie' } },
      { path: '/movie/collection/:id/:page', name: 'movie-moreLikeThis-collection', component: function () { return import('@/components/movie/MovieSeriesMoreLikeThis.vue') }, props: { type: 'movie' } },
    ]
  },
  { path: '/series/:tab/:id/:season/:episode', name: 'series', component: function () { return import('@/views/Series.vue') }, meta: { requiresAuth: true }, props: { type: 'series' },
    children: [
      { path: '/series/:id', redirect: '/series/profile/:id/-1/-1' },
      { path: '/series/profile/:id/:season/:episode', name: 'series-profile', component: function () { return import('@/components/movie/MovieSeriesProfile.vue') }, props: { type: 'series' } },
      { path: '/series/detail/:id/:season/:episode', name: 'series-detail', component: function () { return import('@/components/movie/MovieSeriesDetail.vue') }, props: { type: 'series' } },
      { path: '/series/cast/:id/:season/:episode/:page', name: 'series-cast-cast', component: function () { return import('@/components/movie/MovieSeriesCast.vue') }, props: { type: 'series' } },
      { path: '/series/crew/:id/:season/:episode/:page', name: 'series-cast-crew', component: function () { return import('@/components/movie/MovieSeriesCast.vue') }, props: { type: 'series' } },
      { path: '/series/guest/:id/:season/:episode/:page', name: 'series-cast-guest', component: function () { return import('@/components/movie/MovieSeriesCast.vue') }, props: { type: 'series' } },
      { path: '/series/comment/:id/:season/:episode/:page', name: 'series-comment', component: function () { return import('@/components/movie/MovieSeriesComment.vue') }, props: { type: 'series' } },
      { path: '/series/recommendations/:id/:season/:episode/:page', name: 'series-moreLikeThis-recommendations', component: function () { return import('@/components/movie/MovieSeriesMoreLikeThis.vue') }, props: { type: 'series' } },
      { path: '/series/similar/:id/:season/:episode/:page', name: 'series-moreLikeThis-similar', component: function () { return import('@/components/movie/MovieSeriesMoreLikeThis.vue') }, props: { type: 'series' } },
    ]
  },
  { path: '/person/:tab/:id', name: 'person', component: function () { return import('@/views/Person.vue') }, meta: { requiresAuth: true },
    children: [
      { path: '/person/profile/:id', name: 'person-profile', component: function () { return import('@/components/person/PersonProfile.vue') } },
      { path: '/person/detail/:id', name: 'person-detail', component: function () { return import('@/components/person/PersonDetail.vue') } },
      { path: '/person/movie/:id/:page', name: 'person-movie', component: function () { return import('@/components/person/PersonMovieSeries.vue') }, props: { type: 'movie' } },
      { path: '/person/series/:id/:page', name: 'person-series', component: function () { return import('@/components/person/PersonMovieSeries.vue') }, props: { type: 'series' } },
      { path: '/person/image/:id/:page', name: 'person-image', component: function () { return import('@/components/person/PersonImage.vue') } },
      { path: '/person/comment/:id/:page', name: 'person-comment', component: function () { return import('@/components/person/PersonComment.vue') } },
    ]
  },
  { path: '/user/:tab/:id', name: 'user', component: function () { return import('@/views/User.vue') }, meta: { requiresAuth: true },
    children: [
      { path: '/user/profile/:id', alias: '/profile/:id', name: 'user-profile', component: function () { return import('@/components/user/UserProfile.vue') } },
      { path: '/user/detail/:id', name: 'user-detail', component: function () { return import('@/components/user/UserDetail.vue') } },
      { path: '/user/comment/:id/:page', name: 'user-comment', component: function () { return import('@/components/user/UserComment.vue') } },
      { path: '/user/user/:id/:page', name: 'user-user', component: function () { return import('@/components/user/UserUser.vue') } },
      { path: '/user/:tab/:id/:page', name: 'user-movieSeries', component: function () { return import('@/components/user/UserMovieSeries.vue') } },
    ]
  },
  { path: '/settings/tab', name: 'settings', component: function () { return import('@/views/Settings.vue') }, meta: { requiresAuth: true },
    children: [
      { path: '/settings/profile', name: 'settings-profile', component: function () { return import('@/components/settings/SettingsProfile.vue') } },
      { path: '/settings/password', name: 'settings-password', component: function () { return import('@/components/settings/SettingsPassword.vue') } },
      { path: '/settings/interface', name: 'settings-interface', component: function () { return import('@/components/settings/SettingsInterface.vue') } },
      { path: '/settings/notifications', alias: '/account/notifications-emails', name: 'settings-notifications', component: function () { return import('@/components/settings/SettingsNotifications.vue') } },
    ]
  },
  { path: '/discover/:tab/:page', name: 'discover', component: function () { return import('@/views/Discover.vue') }, meta: { requiresAuth: true },
    children: [
      { path: '/discover/movie/:page', name: 'discover-movie', component: function () { return import('@/components/discover/DiscoverMovie.vue') }, props: { type: 'movie' } },
      { path: '/discover/series/:page', name: 'discover-series', component: function () { return import('@/components/discover/DiscoverSeries.vue') }, props: { type: 'series' } },
      { path: '/discover/person/:page', name: 'discover-person', component: function () { return import('@/components/discover/DiscoverPerson.vue') } },
      { path: '/discover/user/:page', name: 'discover-user', component: function () { return import('@/components/discover/DiscoverUser.vue') } },
    ]
  },
  { path: '/notifications/:page', name: 'notifications', component: function () { return import('@/views/Notifications.vue') }, meta: { requiresAuth: true } }
]

const router = new VueRouter({
  mode: 'hash',
  //mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  $('.collapse-on-route-change').collapse('hide')
  $('.dismiss-on-route-change').modal('hide')
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters['auth/loggedIn']) {
      next({ name: 'login' })
    } else {
      if(to.name === 'series-profile' && !(from.matched.some(record => record.name === 'series') && from.params.id === to.params.id) && from.name) {
        if(to.params.season == -1 && to.params.episode == -1) {
          store.dispatch('navigation/getLastSeenEpisode', to.params.id).then(response => {
            if(response.data.seen_id > 0) next({ name: 'series-profile', params: { id: response.data.id, season: response.data.last_seen_season_number, episode: response.data.last_seen_episode_number } })
            else next()
          })
        } else next()
      } else next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if(store.getters['auth/loggedIn']) next({ name: 'Search' })
    else next()
  } else next()
})

router.afterEach((to, from) => { store.dispatch('navigation/afterEach', to) })

export default router
