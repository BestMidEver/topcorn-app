<template>
    <div class="mb-1">
        <div :style="{ 'min-height': activeSeasonType == -1 ? '38px' : '39px'}">
            <tabs v-if="!$store.state.loading.pageLoading" :items="seasonTabItems" :itemTypes="seasonTabTypes" :activeType.sync="activeSeasonType" :class="activeSeasonType !== -1 ? 'bottom-line' : ''"/>
        </div>
        <!-- <div v-else style="height: 39px"></div> -->
        <div :style="{ 'min-height': (activeSeasonType != -1 && ($store.state.loading.pageLoading || $store.state.loading.pageLoading3)) ? '42px' : ''}">
            <tabs v-if="!$store.state.loading.pageLoading && activeSeasonType !== -1 && !$store.state.loading.pageLoading3" :items="episodeTabItems" :itemTypes="episodeTabTypes"
                :activeType.sync="activeEpisodeType" class="mt-1" :class="$route.name.includes('series-cast') ? 'bottom-line' : ''"/>
        </div>
        <!-- <div v-if="$store.state.loading.pageLoading || $store.state.loading.pageLoading3" style="height: 42px"></div> -->
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
        }
    },
    computed: {
        seasonTabItems() { return ['General Info', ...this.seasons.map(season => season.season_number > 0 ? this.toEpisodeCode(season.season_number, -1) : season.name)] },
        seasonTabTypes() { return [-1, ...this.seasons.map(season => season.season_number)] },
        episodeTabItems() { return ['Season Info', ...this.seasonData.episodes.map(episode => this.toEpisodeCode(-1, episode.episode_number))] },
        episodeTabTypes() { return [-1, ...this.seasonData.episodes.map(episode => episode.episode_number)] },
        activeSeasonType: {
            get() { return parseInt(this.$route.params.season) },
            set(val) {
                let params = this.$route.params
                params.season = val
                params.episode = -1
                if(params.page) params.page = 1
                this.$router.replace({ name: this.$route.name, params: params })
            }
        },
        activeEpisodeType:{
            get() { return parseInt(this.$route.params.episode) },
            set(val) {
                let params = this.$route.params
                params.episode = val
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
