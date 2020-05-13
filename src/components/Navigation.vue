<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white fixed-bottom py-0 py-md-1 bottom-line-md">

            <!-- Mobile Recommendation button -->
            <ul class="navbar-nav text-center">
                <li class="nav-item">
                    <router-link to="/recommendations" class="nav-link d-md-none">
                        <font-awesome-icon icon="th-list"/>
                        <div class="extra-small">Discover</div>
                    </router-link>
                </li>
            </ul>

            <!-- Mobile Search button -->
            <ul class="navbar-nav text-center">
                <li class="nav-item">
                    <router-link :to="searchTo" class="nav-link d-md-none" :class="{ active: isActive('/search') }">
                        <font-awesome-icon icon="search"/>
                        <div class="extra-small">Search</div>
                    </router-link>
                </li>
            </ul>

            <!-- Mobile Quick Vote button -->
            <ul class="navbar-nav text-center">
                <li class="nav-item">
                    <router-link :to="quickVoteTo" class="nav-link d-md-none" :class="{ active: isActive('/quick-vote') }">
                        <font-awesome-icon icon="star-half-alt"/>
                        <div class="extra-small">Quick Vote</div>
                    </router-link>
                </li>
            </ul>

            <!-- Mobile Notifications button -->
            <!-- <ul class="navbar-nav text-center">
                <li class="nav-item">
                    <router-link to="/notifications" class="nav-link d-md-none">
                        <font-awesome-icon :icon="['far', 'bell']"/>
                        <div class="extra-small">Notifications</div>
                    </router-link>
                </li>
            </ul> -->

            <!-- Mobile Notifications button -->
            <ul class="navbar-nav text-center">
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link d-md-none">
                        <font-awesome-icon :icon="['fas', 'user']"/>
                        <div class="extra-small">My Profile</div>
                    </router-link>
                </li>
            </ul>

            <!-- Mobile Menu button -->
            <button class="navbar-toggler collapsed p-0 border-0" type="button" data-toggle="collapse" data-target="#navbar-toggle" aria-controls="navbar-toggle" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse" id="navbar-toggle">
                <div class="dropdown-divider"></div>
                <ul class="navbar-nav">
                    <!-- Collapsed & Larger Screen Home button -->
                    <li class="nav-item d-md-none">
                        <router-link to="/home" class="nav-link">
                            <font-awesome-icon icon="home" class="d-none d-md-inline"/> Home
                        </router-link>
                    </li>

                    <!-- Collapsed & Larger Screen Recommendation button -->
                    <li class="nav-item">
                        <router-link to="/recommendations" class="nav-link">
                            <font-awesome-icon icon="th-list" class="d-none d-md-inline"/> Recommendations
                        </router-link>
                    </li>

                    <!-- Collapsed & Larger Screen Recommendation button -->
                    <li class="nav-item">
                        <router-link :to="searchTo" class="nav-link" :class="{ active: isActive('/search') }">
                            <font-awesome-icon icon="search" class="d-none d-md-inline"/> Search
                        </router-link>
                    </li>

                    <!-- Collapsed & Larger Screen Quick Vote button -->
                    <li class="nav-item">
                        <router-link :to="quickVoteTo" class="nav-link" :class="{ active: isActive('/quick-vote') }">
                            <font-awesome-icon icon="star-half-alt" class="d-none d-md-inline"/> Quick Vote
                        </router-link>
                        <div class="dropdown-divider d-md-none"></div>
                    </li>

                    <!-- Collapsed My Profile button -->
                    <li class="nav-item d-md-none">
                        <router-link to="/my-profile" class="nav-link">My Profile</router-link>
                    </li>

                    <!-- Collapsed Notifications button -->
                    <li class="nav-item d-md-none">
                        <router-link to="/notifications" class="nav-link">
                            Notifications
                            <notification-badge/>
                        </router-link>
                    </li>

                    <!-- Collapsed Settings button -->
                    <li class="nav-item d-md-none">
                        <router-link to="/account" class="nav-link">
                            <font-awesome-icon icon="cog"/>
                            Settings
                        </router-link>
                    </li>

                    <!-- Collapsed Dark Theme button -->
                    <li class="nav-item d-md-none">
                        <button class="btn btn-link nav-link">
                            <font-awesome-icon icon="moon"/>
                            Activate Dark Theme
                        </button>
                    </li>

                    <!-- Collapsed Patreon button -->
                    <li class="nav-item d-md-none">
                        <a href="/patreon link" class="nav-link">
                            <font-awesome-icon icon="hand-spock"/>
                            Become a Patron
                        </a>
                        <div class="dropdown-divider"></div>
                    </li>

                    <!-- Collapsed Logout button -->
                    <li class="nav-item d-md-none">
                        <button class="btn btn-link nav-link text-muted mb-3" @click="logout">
                            Logout
                        </button>
                    </li>
                </ul>
                <!-- Larger Screen Top Right buttons -->
                <ul class="navbar-nav ml-auto d-none d-md-flex">
                    <!-- Larger Screen Notifications button -->
                    <li class="nav-item">
                        <router-link to="/notifications" class="nav-link">
                            <font-awesome-icon icon="bell"/>
                            <notification-badge/>
                        </router-link>
                    </li>

                    <!-- Larger Screen My Profile button -->
                    <li class="nav-item">
                        <router-link to="/my-profile" class="nav-link">
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
                            <router-link to="/account" class="dropdown-item">
                                <font-awesome-icon icon="cog" class="text-muted"/>
                                Settings
                            </router-link>

                            <!-- Larger Screen Dark Theme button -->
                            <button class="dropdown-item">
                                <font-awesome-icon icon="moon" class="text-muted"/>
                                Activate Dark Theme
                            </button>
                            <div class="dropdown-divider"></div>

                            <!-- Larger Screen Patreon button -->
                            <a class="dropdown-item" href="/patreon-link">
                                <font-awesome-icon icon="hand-spock" class="text-muted"/>
                                Become a Patron
                            </a>
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
    </div>
</template>

<script>
import NotificationBadge from '@/components/navigation/NotificationBadge.vue'


export default {
    components: {
        'notification-badge': NotificationBadge,
    },
    computed: {
        searchTo() { return this.isStringStartWith(this.$route.path, '/search') ? '/search-/movie/1' : this.$store.state.navigation.search },
        quickVoteTo() { return this.isStringStartWith(this.$route.path, '/quick-vote') ? '/quick-vote-movies' : this.$store.state.navigation.quickVote },
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/destroyToken').then(response => {
                this.$router.push({ name: 'Login' })
            })
        },
        isActive(input) {
            return this.isStringStartWith(this.$route.path, input)
        }
    }
}
</script>

<style scoped>
@media (min-width: 768px) {
	.fixed-bottom { top: 0; bottom: auto; }
}
.extra-small { font-size: 60%; }
</style>
