<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white fixed-bottom py-0 py-md-1 bottom-line-md top-line top-line-md-none nav-shadow">

        <!-- Mobile Recommendation button -->
        <ul class="navbar-nav text-center">
            <li class="nav-item">
                <router-link :to="discoverTo" class="nav-link d-md-none" :class="{ active: isDiscover }">
                    <font-awesome-icon icon="th-list"/>
                    <div class="extra-small">Discover</div>
                </router-link>
            </li>
        </ul>

        <!-- Mobile Search button -->
        <ul class="navbar-nav text-center">
            <li class="nav-item">
                <router-link :to="searchTo" class="nav-link d-md-none" :class="{ active: isSearch }">
                    <font-awesome-icon icon="search"/>
                    <div class="extra-small">Search</div>
                </router-link>
            </li>
        </ul>

        <!-- Mobile Quick Vote button -->
        <ul class="navbar-nav text-center">
            <li class="nav-item">
                <router-link :to="quickVoteTo" class="nav-link d-md-none" :class="{ active: isQuickVote }">
                    <font-awesome-icon icon="star-half-alt"/>
                    <div class="extra-small">Quick Vote</div>
                </router-link>
            </li>
        </ul>

        <!-- Mobile My Profile button -->
        <ul class="navbar-nav text-center">
            <li class="nav-item">
                <router-link :to="myProfileTo" class="nav-link d-md-none" :class="{ active: isMyProfile }">
                    <font-awesome-icon :icon="['fas', 'user']"/>
                    <div class="extra-small">My Profile</div>
                </router-link>
            </li>
        </ul>

        <!-- Mobile Menu button -->
        <button class="navbar-toggler collapsed p-0 border-0" type="button" data-toggle="collapse" data-target="#navbar-toggle" aria-controls="navbar-toggle" aria-expanded="false">
            <font-awesome-icon :icon="['fas', 'bars']" :class="{ 'text-danger': notificationCount > 0 }"/>
            <!-- <notification-badge :count="notificationCount"/> -->
            <!-- <span class="navbar-toggler-icon"></span> -->
        </button>

        <div class="navbar-collapse collapse collapse-on-route-change" id="navbar-toggle">
            <div class="dropdown-divider"></div>
            <ul class="navbar-nav">
                <!-- Collapsed & Larger Screen Home button -->
                <!-- <li class="nav-item d-md-none">
                    <router-link to="/home" class="nav-link">
                        <font-awesome-icon icon="home" class="d-none d-md-inline"/> Home
                    </router-link>
                </li> -->

                <!-- Collapsed & Larger Screen Recommendation button -->
                <li class="nav-item d-none d-md-inline">
                    <router-link :to="discoverTo" class="nav-link" :class="{ active: isDiscover }">
                        <font-awesome-icon icon="th-list" class="d-none d-md-inline"/> Discover
                    </router-link>
                </li>

                <!-- Collapsed & Larger Screen Recommendation button -->
                <li class="nav-item d-none d-md-inline">
                    <router-link :to="searchTo" class="nav-link" :class="{ active: isSearch }">
                        <font-awesome-icon icon="search" class="d-none d-md-inline"/> Search
                    </router-link>
                </li>

                <!-- Collapsed & Larger Screen Quick Vote button -->
                <li class="nav-item d-none d-md-inline">
                    <router-link :to="quickVoteTo" class="nav-link" :class="{ active: isQuickVote }">
                        <font-awesome-icon icon="star-half-alt" class="d-none d-md-inline"/> Quick Vote
                    </router-link>
                    <div class="dropdown-divider d-md-none"></div>
                </li>

                <!-- Collapsed My Profile button -->
                <!-- <li class="nav-item d-md-none">
                    <router-link :to="myProfileTo" class="nav-link" :class="{ active: isMyProfile }">My Profile</router-link>
                </li> -->

                <!-- Collapsed Notifications button -->
                <li class="nav-item d-md-none">
                    <router-link to="/notifications/1" class="nav-link" :class="{ active: isNotifications }">
                        <font-awesome-icon icon="bell" class="mr-1"/>
                        Notifications
                        <notification-badge :count="notificationCount"/>
                    </router-link>
                </li>

                <!-- Collapsed Settings button -->
                <li class="nav-item d-md-none">
                    <router-link to="/settings/profile" class="nav-link" :class="{ active: isSettings }">
                        <font-awesome-icon icon="cog" class="mr-1"/>
                        Settings
                    </router-link>
                    <div class="dropdown-divider"></div>
                </li>

                <!-- Collapsed Dark Theme button -->
                <!-- <li class="nav-item d-md-none">
                    <button class="btn btn-link nav-link">
                        <font-awesome-icon icon="moon"/>
                        Activate Dark Theme
                    </button>
                </li> -->

                <!-- Collapsed Patreon button -->
                <!-- <li class="nav-item d-md-none">
                    <a href="/patreon link" class="nav-link">
                        <font-awesome-icon icon="hand-spock"/>
                        Become a Patron
                    </a>
                    <div class="dropdown-divider"></div>
                </li> -->

                <!-- Collapsed Logout button -->
                <li class="nav-item d-md-none">
                    <button class="btn btn-sm btn-link nav-link text-muted mb-3" @click="logout">
                        Logout
                    </button>
                </li>
            </ul>
            <!-- Larger Screen Top Right buttons -->
            <ul class="navbar-nav ml-auto d-none d-md-flex">
                <!-- Larger Screen Notifications button -->
                <li class="nav-item">
                    <router-link to="/notifications/1" class="nav-link" :class="{ active: isNotifications }">
                        <font-awesome-icon icon="bell"/>
                        <notification-badge :count="notificationCount"/>
                    </router-link>
                </li>

                <!-- Larger Screen My Profile button -->
                <li class="nav-item">
                    <router-link :to="myProfileTo" class="nav-link" :class="{ active: isMyProfile }">
                        <font-awesome-icon icon="user"/>
                        My Profile
                    </router-link>
                </li>

                <li class="nav-item dropdown">
                    <!-- Larger Screen Dropdown button -->
                    <button class="nav-link btn btn-link" id="navbar-dropdown-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <font-awesome-icon icon="caret-down"/>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown-menu">
                        <!-- Larger Screen Settings button -->
                        <router-link to="/settings/profile" class="dropdown-item" :class="{ active: isSettings }">
                            <font-awesome-icon icon="cog" class="text-muted"/>
                            Settings
                        </router-link>

                        <!-- Larger Screen Dark Theme button -->
                        <!-- <button class="dropdown-item">
                            <font-awesome-icon icon="moon" class="text-muted"/>
                            Activate Dark Theme
                        </button> -->

                        <!-- Larger Screen Patreon button -->
                        <!-- <a class="dropdown-item" href="/patreon-link">
                            <font-awesome-icon icon="hand-spock" class="text-muted"/>
                            Become a Patron
                        </a> -->
                        <div class="dropdown-divider"></div>

                        <!-- Larger Screen Logout button -->
                        <button class="dropdown-item" @click="logout">
                            Logout
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import NotificationBadge from '@/components/navigation/NotificationBadge.vue'


export default {
    components: {
        'notification-badge': NotificationBadge,
    },
    computed: {
        userId() { return this.$store.state.auth.userId },
        parentRouteName() { return this.$route.matched[0] && this.$route.matched[0].name },
        isSearch() { return this.parentRouteName === 'search' },
        isDiscover() { return this.parentRouteName === 'discover' },
        isQuickVote() { return this.parentRouteName === 'quickVote' },
        isMyProfile() { return this.parentRouteName === 'user' && this.$route.params.id === this.userId },
        isNotifications() { return this.parentRouteName === 'notifications' },
        isSettings() { return this.parentRouteName === 'settings' },
        searchTo() { return this.isSearch ? '/search-/movie/1' : this.$store.state.navigation.search },
        quickVoteTo() { return this.isQuickVote ? '/quick-vote-movies' : this.$store.state.navigation.quickVote },
        myProfileTo() { return this.isMyProfile ? `/user/profile/${this.userId}` : this.$store.state.navigation.myProfile },
        discoverTo() { return this.isDiscover ? '/discover/movie/1' : this.$store.state.navigation.discover },
        notificationCount() { return this.$store.state.notifications.notificationCount }
    },
    watch: {
        '$route'() {
            $('.collapse-on-route-change').collapse('hide')
            $('.dismiss-on-route-change').modal('hide')
            this.getNotificationCount()
        }
    },
    created() {
        this.getNotificationCount(); this.interval = setInterval(() => this.getNotificationCount(), 30000)
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/destroyToken').then(response => {
                this.$router.push('/login')
            })
        },
        getNotificationCount() { this.$store.dispatch('notifications/getNotificationCount') }
    }
}
</script>

<style scoped>
@media (min-width: 768px) {
	.fixed-bottom { top: 0; bottom: auto; }
}
.extra-small { font-size: 60%; }
.nav-shadow {
    -webkit-box-shadow: 0 .02rem .1rem rgba(0,0,0,.075)!important;
    box-shadow: 0 .02rem .1rem rgba(0,0,0,.075)!important;
}
</style>
