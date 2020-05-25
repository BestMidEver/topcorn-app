<template>
    <div>
        <poster-plot-details-section :data="objData" :type="type" :isFullScreen="true"/>
    </div>
</template>

<script>
import PosterPlotDetailsSection from '@/components/movie/PosterPlotDetailsSection.vue'
import seriesComputeds from '@/components/movie/seriesComputeds.js'


export default {
    components: {
        'poster-plot-details-section': PosterPlotDetailsSection,
    },
    mixins: [seriesComputeds],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() {
        return {
            
        }
    },
    computed: {
        objData() {
            if(['movie', 'series'].includes(this.detailedType)) return this.$store.state.movieSeriesDataSets.dataObject2
            if(this.detailedType === 'season') return this.seasonData
            if(this.detailedType === 'episode') return this.episodeData
        },
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
