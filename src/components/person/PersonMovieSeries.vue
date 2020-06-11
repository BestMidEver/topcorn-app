<template>
    <div>
        <person-movie-series-section :data="personData" class="mt-1" :type="type" :isFullScreen="true"/>
    </div>
</template>

<script>
import PersonMovieSeriesSection from '@/components/person/PersonMovieSeriesSection.vue'


export default {
    components: {
        'person-movie-series-section': PersonMovieSeriesSection,
    },
    props: {
        type: String
    },
    data() {
        return {
        }
    },
    computed: {
        personData() { return this.$store.state.movieSeriesDataSets.dataObject },
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
