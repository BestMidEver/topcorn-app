<template>
    <div @scroll.passive="handleScroll">
        <tabs :items="tabs" :itemTypes="tabTypes" :activeType.sync="activeType"/>
        <custom-input v-model="searchText" type="text" clearMessage="Cancel" :placeHolder="placeholder" icon="search" class="mt-2 w-100 px-1"/>
        <router-view></router-view>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import CustomInput from '@/components/customInputs/CustomInput.vue'


export default {
    components: {
        'tabs': Tabs,
        'custom-input': CustomInput,
    },
    data() {
        const tabTypes = ['movie', 'series', 'person', 'user'/* , 'list' */]
        return {
            pageTitle: 'Search',
            tabs: ['Movie', 'Series', 'Person', 'User'/* , 'List' */],
            tabTypes: tabTypes,
            activeType: this.$route.name.split('-')[1],
            searchText: this.$route.params.pathMatch,
            page: this.$route.params.page,
        }
    },
    computed: {
        routeWatcher() { return `/search-${this.searchText||''}/${this.activeType}/1` },
        placeholder() {
            if(this.activeType === 'user') return 'Start typing a name or enter an email'
            return 'Start typing a name'
        }
    },
    watch: {
        '$route.name'(val) { this.activeType = val.split('-')[1] },
        '$route.params.pathMatch'(val) { this.searchText = this.isTrue(val) ? val : '' },
        routeWatcher(val) { if(val !== this.$route.path) this.$router.replace(val) },
    },
    beforeCreate() {
        this.$store.dispatch('interactions/pluckMoviesSeries')
        this.$store.dispatch('recentlyVisited/getData')
    },
    methods: {
        handleScroll (event) {
            this.isScrollToTopVisible = event.target.scrollTop > 1000
        }
    }
}
</script>

<style scoped>
</style>
