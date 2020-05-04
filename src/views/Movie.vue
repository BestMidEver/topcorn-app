<template>
    <div>
        <progress-bar/>
        <trailer-section class="mt-md-4"/>
        <under-trailer-section title="Memento" type="movie"/>
        <poster-plot-details-section/>
        <compressed-cards title="Actors & Crew" expandTitle="Show Everyone" type="person" :isFullScreen="false"/>
        <review-section :isFullScreen="false"/>
        <compressed-cards title="Kill Bill Collection" expandTitle="Show All" type="movie" :isFullScreen="false"/>
        <compressed-cards title="Lists With This" expandTitle="Show All" type="list" :isFullScreen="false"/>
        <compressed-cards title="More Like This" expandTitle="Show All" type="movie" :isFullScreen="false"/>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import TrailerSection from '@/components/movie/TrailerSection.vue'
import UnderTrailerSection from '@/components/movie/UnderTrailerSection.vue'
import PosterPlotDetailsSection from '@/components/movie/PosterPlotDetailsSection.vue'
import CompressedCards from '@/components/CompressedCards.vue'
import ReviewSection from '@/components/ReviewSection.vue'


export default {
    components: {
        'progress-bar': ProgressBar,
        'trailer-section': TrailerSection,
        'under-trailer-section': UnderTrailerSection,
        'poster-plot-details-section': PosterPlotDetailsSection,
        'compressed-cards': CompressedCards,
        'review-section': ReviewSection,
    },
    data: function() {
        return {
            pageTitle: 'Memento',
        }
    }
}
</script>

<style scoped>
</style>
