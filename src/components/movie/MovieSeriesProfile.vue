<template>
    <div>
        <trailer-section :type="type" class="mt-md-4"/>
        <under-trailer-section :title="title" :type="detailedType" :data="interactionData" :boundedTo="underTrailerSectionBoundedTo"/>
        <poster-plot-details-section :data="movieData" :type="type"/>
        <cast-section :data="movieData" :type="type"/>
        <review-section :data="reviewData" :interactionData="interactionData" :type="type" :boundedTo="[`interactions/set${capitalizeFirstLetter(type)}Interaction`, 'movieSeriesDataSets/setDataObject', 'comments/setReview']"/>
        <more-like-this-section :data="movieData" :type="type"/>
    </div>
</template>

<script>
import TrailerSection from '@/components/movie/TrailerSection.vue'
import UnderTrailerSection from '@/components/movie/UnderTrailerSection.vue'
import PosterPlotDetailsSection from '@/components/movie/PosterPlotDetailsSection.vue'
import CastSection from '@/components/movie/CastSection.vue'
import MoreLikeThisSection from '@/components/movie/MoreLikeThisSection.vue'
import CompressedCards from '@/components/CompressedCards.vue'
import ReviewSection from '@/components/ReviewSection.vue'
import SeriesComputeds from '@/components/movie/SeriesComputeds.js'


export default {
    components: {
        'trailer-section': TrailerSection,
        'under-trailer-section': UnderTrailerSection,
        'poster-plot-details-section': PosterPlotDetailsSection,
        'compressed-cards': CompressedCards,
        'review-section': ReviewSection,
        'cast-section': CastSection,
        'more-like-this-section': MoreLikeThisSection,
    },
    mixins: [SeriesComputeds],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() {
        return {
            isBelongToList: true,
            activeIndex: 1
        }
    },
    computed: {
        movieData() { return this.$store.state.movieSeriesDataSets.dataObject2 },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
        reviewData() { return this.$store.state.comments.dataObject },
        title() {
            if(this.detailedType === 'movie') return this.movieData.title
            if(this.detailedType === 'series') return this.movieData.name
            if(this.detailedType === 'season') return this.seasonData.name
            if(this.detailedType === 'episode') return this.episodeData.name
        },
        UnderTrailerSection() { return ['movie', 'series'].includes(this.detailedType) ? ['interactions/setMovieInteraction', 'movieSeriesDataSets/setDataObject', 'comments/setReview'] : ['movieSeriesDataSets/setDataObject'] }
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
