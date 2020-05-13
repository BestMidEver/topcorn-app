<template>
    <div>
        <trailer-section class="mt-md-4"/>
        <under-trailer-section :title="title" :type="type" :data="interactionData" :boundedTo="['interactions/setMovieInteraction', 'movieSeriesDataSets/setDataObject']"/>
        <poster-plot-details-section :data="movieData"/>
        <cast-section/>
        <compressed-cards title="Actors & Crew" expandTitle="Show Everyone" type="person" :isFullScreen="false"/>
        <review-section :isFullScreen="false"/>
        <compressed-cards title="More Like This" expandTitle="Show All" type="movie" :isFullScreen="false"/>
    </div>
</template>

<script>
import TrailerSection from '@/components/movie/TrailerSection.vue'
import UnderTrailerSection from '@/components/movie/UnderTrailerSection.vue'
import PosterPlotDetailsSection from '@/components/movie/PosterPlotDetailsSection.vue'
import CastSection from '@/components/movie/CastSection.vue'
import CompressedCards from '@/components/CompressedCards.vue'
import ReviewSection from '@/components/ReviewSection.vue'


export default {
    components: {
        'trailer-section': TrailerSection,
        'under-trailer-section': UnderTrailerSection,
        'poster-plot-details-section': PosterPlotDetailsSection,
        'compressed-cards': CompressedCards,
        'review-section': ReviewSection,
        'cast-section': CastSection,
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
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
        title() { return this.movieData.title }
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
