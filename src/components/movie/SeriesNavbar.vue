<template>
    <div v-if="!$store.state.loading.pageLoading" class="mb-2">
        <tabs :items="seasonTabItems" :itemTypes="seasonTabTypes" :activeType.sync="activeSeasonType" :class="activeSeasonType !== -1 ? 'bottom-line' : ''"/>
        <tabs v-if="activeSeasonType !== -1 && !$store.state.loading.pageLoading3" :items="episodeTabItems" :itemTypes="episodeTabTypes" :activeType.sync="activeEpisodeType" class="mt-1"/>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import codeToText from '@/mixins/codeToText'


export default {
    components: {
        'tabs': Tabs,
    },
    mixins: [codeToText],
    props: {
        seasons: Array,
        seasonData: Object
    },
    data() {
        return {
        }
    },
    computed: {
        seasonTabItems() { return ['General Info', ...this.seasons.map(season => season.season_number > 0 ? this.toEpisodeCode(season.season_number) : season.name)] },
        seasonTabTypes() { return [-1, ...this.seasons.map(season => season.season_number)] },
        episodeTabItems() { return ['Season Info', ...this.seasonData.episodes.map(episode => this.toEpisodeCode(null, episode.episode_number))] },
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
