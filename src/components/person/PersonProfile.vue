<template>
    <div>
        <person-cover-section :data="personData" class="mt-md-4"/>
        <person-movie-series-section :data="personData" class="mt-5" type="movie"/>
        <person-movie-series-section :data="personData" class="mt-5" type="series"/>
        <review-section :data="reviewData" :loading="$store.state.loading.pageLoading2" :interactionData="interactionData" type="person" :boundedTo="['comments/setReview']"/>
        <person-image-section :data="personData" class="mt-5"/>
    </div>
</template>

<script>
import PersonCoverSection from '@/components/profile/PersonCoverSection.vue'
import PersonMovieSeriesSection from '@/components/person/PersonMovieSeriesSection.vue'
import PersonImageSection from '@/components/person/PersonImageSection.vue'
import ReviewSection from '@/components/ReviewSection.vue'


export default {
    components: {
        'person-cover-section': PersonCoverSection,
        'person-movie-series-section': PersonMovieSeriesSection,
        'person-image-section': PersonImageSection,
        'review-section': ReviewSection,
    },
    props: {
    },
    data() {
        return {
        }
    },
    computed: {
        personData() { return this.$store.state.movieSeriesDataSets.dataObject },
        reviewData() { return this.$store.state.comments.dataObject },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject2 },
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
