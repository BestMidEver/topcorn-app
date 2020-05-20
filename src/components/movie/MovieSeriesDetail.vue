<template>
    <div>
        <poster-plot-details-section :data="movieData" :type="type" :isFullScreen="true"/>
    </div>
</template>

<script>
import PosterPlotDetailsSection from '@/components/movie/PosterPlotDetailsSection.vue'


export default {
    components: {
        'poster-plot-details-section': PosterPlotDetailsSection,
    },
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() {
        return {
            
        }
    },
    computed: {
        movieData() { return this.$store.state.movieSeriesDataSets.dataObject2 },
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
