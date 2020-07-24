<template>
    <div class="mb-1 mt-md-3">
        <div :style="{ 'min-height': activeSeasonType == -1 ? '37px' : '38px'}">
            <tabs v-if="!$store.state.loading.pageLoading" :items="seasonTabItems" :itemTypes="seasonTabTypes" :activeType.sync="activeSeasonType" :infoButtonTitle="seasonInfoButtonTitle" :class="activeSeasonType !== -1 ? 'bottom-line' : ''"/>
        </div>
        <div :style="{ 'min-height': (activeSeasonType != -1 && ($store.state.loading.pageLoading || $store.state.loading.pageLoading3)) ? '42px' : ''}">
            <tabs v-if="!$store.state.loading.pageLoading && activeSeasonType !== -1 && !$store.state.loading.pageLoading3" :items="episodeTabItems" :itemTypes="episodeTabTypes" :infoButtonTitle="episodeInfoButtonTitle"
                :activeType.sync="activeEpisodeType" class="mt-1" :class="$route.name.includes('series-cast') ? 'bottom-line' : ''"/>
        </div>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import codeToText from '@/mixins/codeToText'
import seriesComputeds from '@/components/movie/seriesComputeds.js'


export default {
    components: {
        'tabs': Tabs,
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
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
        seasonTabItems() { let vm = this; return ['General Info', ...this.seasons.map(season => vm.seasonNumberToTabName(season))] },
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
        },
        seasonInfoButtonTitle() { return this.interactionData.seen_id > 0 ? this.seasonNumberToTabName(this.seasons.find(season => season.season_number == this.interactionData.last_seen_season_number)) : null },
        episodeInfoButtonTitle() { return this.interactionData.seen_id > 0 && this.interactionData.last_seen_season_number === this.interactionData.season_number ? this.toEpisodeCode(-1, this.interactionData.last_seen_episode_number) : null }
    },
    watch: {
    },
    methods: {
        seasonNumberToTabName(season) { return season.season_number > 0 ? this.toEpisodeCode(season.season_number, -1) : season.name },
    }
}
</script>

<style scoped>
</style>
