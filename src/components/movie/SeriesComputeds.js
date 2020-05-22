import codeToText from '@/mixins/codeToText'


export default {
    mixins: [codeToText],
    computed: {
        seasonNumber() { return this.$route.params.season },
        episodeNumber() { return this.$route.params.episode },
        tabCode() { return this.toEpisodeCode(this.seasonNumber, this.episodeNumber) },
        seasonData() { return this.$store.state.movieSeriesDataSets.dataObject3 },
        episodeData() { return this.seasonNumber == -1 ? {} : this.seasonData.episodes && this.seasonData.episodes.find(episode => episode.episode_number == this.episodeNumber) || {} },
        detailedType() {
            if(this.type === 'movie') return 'movie'
            if(this.episodeNumber != -1) return 'episode'
            if(this.seasonNumber != -1) return 'season'
            return 'series'
        },
    },
}