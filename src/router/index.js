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
import QuickVoteMovies from '@/components/quickVote/QuickVoteMovies.vue'
import QuickVoteSeries from '@/components/quickVote/QuickVoteSeries.vue'
import Movie from '@/views/Movie.vue'
import Series from '@/views/Series.vue'
import Person from '@/views/Person.vue'
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
      { path: '/quick-vote-movies', name: 'quickVote-movies', component: QuickVoteMovies },
      { path: '/quick-vote-series', name: 'quickVote-series', component: QuickVoteSeries },
    ]
  },
  { path: '/movie', name: 'Movie', component: Movie, meta: { requiresAuth: true }   },
  { path: '/series', name: 'Series', component: Series, meta: { requiresAuth: true }   },
  { path: '/person', name: 'Person', component: Person, meta: { requiresAuth: true }   },
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
  store.dispatch('navigation/afterEach', to)
})

export default router
