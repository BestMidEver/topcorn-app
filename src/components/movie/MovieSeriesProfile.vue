<template>
    <div>
        <trailer-section :type="type" class="mt-md-4"/>
        <under-trailer-section :title="title" :type="type" :data="interactionData" :boundedTo="['interactions/setMovieInteraction', 'movieSeriesDataSets/setDataObject', 'comments/setReview']"/>
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
            if(this.isTrue(this.movieData.title)) return this.movieData.title
            if(this.isTrue(this.movieData.name)) return this.movieData.name
        },
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
