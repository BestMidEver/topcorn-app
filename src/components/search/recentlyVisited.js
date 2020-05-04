import Vue from 'vue'


Vue.mixin({
    computed: {
        allResults() { return this.$store.state.recentlyVisited[this.types] },
        anyRecentlyVisited() { return this.allResults.length > 0 },
    },
    methods: {
        clearRecentlyVisiteds(types) {
            this.$store.dispatch('recentlyVisited/clear', types)
        }
    }
})