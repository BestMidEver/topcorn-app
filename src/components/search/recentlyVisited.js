import Vue from 'vue'


Vue.mixin({
    computed: {
        allResults() { return this.$store.state.recentlyVisited[this.types] }
    }
})