<template>
    <div>
        <person-image-section :data="personData" class="mt-md-4" :isFullScreen="true"/>
    </div>
</template>

<script>
import PersonImageSection from '@/components/person/PersonImageSection.vue'


export default {
    components: {
        'person-image-section': PersonImageSection,
    },
    props: {
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
