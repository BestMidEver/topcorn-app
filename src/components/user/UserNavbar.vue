<template>
    <div class="mb-1">
        <div style="min-height: 38px">
            <tabs v-if="!$store.state.loading.pageLoading" :items="tabItems" :activeTitle.sync="activeTab"/>
        </div>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import codeToText from '@/mixins/codeToText'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import seriesComputeds from '@/components/movie/seriesComputeds.js'


export default {
    components: {
        'tabs': Tabs,
        'skeleton-loader': SkeletonLoader,
    },
    mixins: [codeToText, seriesComputeds],
    props: {
        seasons: Array,
    },
    data() {
        return {
            tabItems: ['Movies', 'Series', 'Comments', 'Users']
        }
    },
    computed: {
        seasonTabTypes() { return [-1, ...this.seasons.map(season => season.season_number)] },
        activeTab: {
            get() {
                if(this.$route.name === 'user-movieSeries') return this.$route.params.tab === 'movie' ? 'Movies' : 'Series'
                if(this.$route.name === 'user-comment') return 'Comments'
                if(this.$route.name === 'user-friends') return 'Users'
            },
            set(val) {
                let params = this.$route.params
                params.season = val
                params.episode = -1
                if(params.page) params.page = 1
                this.$router.replace({ name: this.$route.name, params: params })
            }
        }
    },
    watch: {
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
