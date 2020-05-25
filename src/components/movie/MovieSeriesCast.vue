<template>
    <div>
        <cast-section :data="objData" :type="type" :isFullScreen="true"/>
    </div>
</template>

<script>
import CastSection from '@/components/movie/CastSection.vue'
import seriesComputeds from '@/components/movie/seriesComputeds.js'


export default {
    components: {
        'cast-section': CastSection,
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
}
</script>

<style scoped>
</style>
