<template>
    <div>
        <cast-section :data="movieData" :type="type" :isFullScreen="true"/>
    </div>
</template>

<script>
import CastSection from '@/components/movie/CastSection.vue'


export default {
    components: {
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
    },
}
</script>

<style scoped>
</style>
