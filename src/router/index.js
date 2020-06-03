import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Search from '@/views/Search.vue'
import SearchMovie from '@/components/search/SearchMovie.vue'
import RecentlyVisitedMovies from '@/components/search/RecentlyVisitedMovies.vue'
import SearchSeries from '@/components/search/SearchSeries.vue'
import RecentlyVisitedSeries from '@/components/search/RecentlyVisitedSeries.vue'
import SearchPerson from '@/components/search/SearchPerson.vue'
import RecentlyVisitedPeople from '@/components/search/RecentlyVisitedPeople.vue'
import SearchUser from '@/components/search/SearchUser.vue'
import RecentlyVisitedUsers from '@/components/search/RecentlyVisitedUsers.vue'
import SearchList from '@/components/search/SearchList.vue'
import RecentlyVisitedLists from '@/components/search/RecentlyVisitedLists.vue'
import QuickVote from '@/views/QuickVote.vue'
import QuickVoteMoviesSeries from '@/components/quickVote/QuickVoteMoviesSeries.vue'
import Movie from '@/views/Movie.vue'
import MovieSeriesProfile from '@/components/movie/MovieSeriesProfile.vue'
import MovieSeriesDetail from '@/components/movie/MovieSeriesDetail.vue'
import MovieSeriesCast from '@/components/movie/MovieSeriesCast.vue'
import MovieSeriesComment from '@/components/movie/MovieSeriesComment.vue'
import MovieSeriesMoreLikeThis from '@/components/movie/MovieSeriesMoreLikeThis.vue'
import Series from '@/views/Series.vue'
import Person from '@/views/Person.vue'
import PersonProfile from '@/components/person/PersonProfile.vue'
import PersonDetail from '@/components/person/PersonDetail.vue'
import PersonMovieSeries from '@/components/person/PersonMovieSeries.vue'
import PersonImage from '@/components/person/PersonImage.vue'
import PersonComment from '@/components/person/PersonComment.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { requiresVisitor: true } },
  { path: '/register', name: 'register', component: Register, meta: { requiresVisitor: true }  },
  { path: '/search-*/:tab/:page', name: 'search', component: Search, meta: { requiresAuth: true },
    children: [
      { path: '/search-/movie/:page', name: 'search-movie-recents', component: RecentlyVisitedMovies },
      { path: '/search-*/movie/:page', name: 'search-movie-search', component: SearchMovie },
      { path: '/search-/series/:page', name: 'search-series-recents', component: RecentlyVisitedSeries },
      { path: '/search-*/series/:page', name: 'search-series-search', component: SearchSeries },
      { path: '/search-/person/:page', name: 'search-person-recents', component: RecentlyVisitedPeople },
      { path: '/search-*/person/:page', name: 'search-person-search', component: SearchPerson },
      { path: '/search-/user/:page', name: 'search-user-recents', component: RecentlyVisitedUsers },
      { path: '/search-*/user/:page', name: 'search-user-search', component: SearchUser },
      { path: '/search-/list/:page', name: 'search-list-recents', component: RecentlyVisitedLists },
      { path: '/search-*/list/:page', name: 'search-list-search', component: SearchList },
    ]
  },
  { path: '/quick-vote', name: 'quickVote', component: QuickVote, meta: { requiresAuth: true },
    children: [
      { path: '/quick-vote-movies', name: 'quickVote-movies', component: QuickVoteMoviesSeries, props: { type: 'movie' } },
      { path: '/quick-vote-series', name: 'quickVote-series', component: QuickVoteMoviesSeries, props: { type: 'series' } },
    ]
  },
  { path: '/movie/:tab/:id', name: 'movie', component: Movie, meta: { requiresAuth: true }, props: { type: 'movie' },
    children: [
      { path: '/movie/profile/:id', name: 'movie-profile', component: MovieSeriesProfile, props: { type: 'movie' } },
      { path: '/movie/detail/:id', name: 'movie-detail', component: MovieSeriesDetail, props: { type: 'movie' } },
      { path: '/movie/cast/:id/:page', name: 'movie-cast-cast', component: MovieSeriesCast, props: { type: 'movie' } },
      { path: '/movie/crew/:id/:page', name: 'movie-cast-crew', component: MovieSeriesCast, props: { type: 'movie' } },
      { path: '/movie/comment/:id/:page', name: 'movie-comment', component: MovieSeriesComment, props: { type: 'movie' } },
      { path: '/movie/recommendations/:id/:page', name: 'movie-moreLikeThis-recommendations', component: MovieSeriesMoreLikeThis, props: { type: 'movie' } },
      { path: '/movie/similar/:id/:page', name: 'movie-moreLikeThis-similar', component: MovieSeriesMoreLikeThis, props: { type: 'movie' } },
      { path: '/movie/collection/:id/:page', name: 'movie-moreLikeThis-collection', component: MovieSeriesMoreLikeThis, props: { type: 'movie' } },
    ]
  },
  { path: '/series/:tab/:id/:season/:episode', name: 'series', component: Series, meta: { requiresAuth: true }, props: { type: 'series' },
    children: [
      { path: '/series/profile/:id/:season/:episode', name: 'series-profile', component: MovieSeriesProfile, props: { type: 'series' } },
      { path: '/series/detail/:id/:season/:episode', name: 'series-detail', component: MovieSeriesDetail, props: { type: 'series' } },
      { path: '/series/cast/:id/:season/:episode/:page', name: 'series-cast-cast', component: MovieSeriesCast, props: { type: 'series' } },
      { path: '/series/crew/:id/:season/:episode/:page', name: 'series-cast-crew', component: MovieSeriesCast, props: { type: 'series' } },
      { path: '/series/guest/:id/:season/:episode/:page', name: 'series-cast-guest', component: MovieSeriesCast, props: { type: 'series' } },
      { path: '/series/comment/:id/:season/:episode/:page', name: 'series-comment', component: MovieSeriesComment, props: { type: 'series' } },
      { path: '/series/recommendations/:id/:season/:episode/:page', name: 'series-moreLikeThis-recommendations', component: MovieSeriesMoreLikeThis, props: { type: 'series' } },
      { path: '/series/similar/:id/:season/:episode/:page', name: 'series-moreLikeThis-similar', component: MovieSeriesMoreLikeThis, props: { type: 'series' } },
    ]
  },
  { path: '/person/:tab/:id', name: 'person', component: Person, meta: { requiresAuth: true },
    children: [
      { path: '/person/profile/:id', name: 'person-profile', component: PersonProfile },
      { path: '/person/detail/:id', name: 'person-detail', component: PersonDetail },
      { path: '/person/movie/:id/:page', name: 'person-movie', component: PersonMovieSeries, props: { type: 'movie' } },
      { path: '/person/series/:id/:page', name: 'person-series', component: PersonMovieSeries, props: { type: 'series' } },
      { path: '/person/image/:id/:page', name: 'person-image', component: PersonImage },
      { path: '/person/comment/:id/:page', name: 'person-comment', component: PersonComment },
    ]
  },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true }   },
  { path: '/settings', name: 'Settings', component: Settings, meta: { requiresAuth: true }   },
]

const router = new VueRouter({
  mode: 'history',
  //linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/loggedIn']) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters['auth/loggedIn']) {
      next({
        name: 'Search'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  //console.log(to, from)
  store.dispatch('navigation/afterEach', to)
})

export default router
