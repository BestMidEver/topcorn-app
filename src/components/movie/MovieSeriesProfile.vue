<template>
    <div>
        <trailer-section :type="type" :class="type === 'movie' ? 'mt-md-3' : 'mt-md-1'"/>
        <under-trailer-section :title="title" :type="detailedType" :data="interactionData" :boundedTo="underTrailerSectionBoundedTo"/>
        <poster-plot-details-section :data="objData" :type="type"/>
        <cast-section :data="objData" :type="type"/>
        <review-section :data="reviewData" :interactionData="interactionData" :type="type" :loading="$store.state.loading.pageLoading2"
            :boundedTo="[`interactions/set${capitalizeFirstLetter(type)}Interaction`, 'movieSeriesDataSets/setDataObject', 'comments/setReview']"/>
        <more-like-this-section v-show="['movie', 'series'].includes(detailedType)" :data="movieData" :type="type"/>
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
import seriesComputeds from '@/components/movie/seriesComputeds.js'


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
    mixins: [seriesComputeds],
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
        objData() {
            if(['movie', 'series'].includes(this.detailedType)) return this.$store.state.movieSeriesDataSets.dataObject2
            if(this.detailedType === 'season') return this.seasonData
            if(this.detailedType === 'episode') return this.episodeData
        },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
        reviewData() { return this.$store.state.comments.dataObject },
        title() {
            if(this.objData.title) return this.objData.title
            if(this.objData.name) return this.objData.name
        },
        underTrailerSectionBoundedTo() { return ['movie', 'series'].includes(this.detailedType) ? ['interactions/setMovieInteraction', 'movieSeriesDataSets/setDataObject', 'comments/setReview'] : ['movieSeriesDataSets/setDataObject'] }
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
