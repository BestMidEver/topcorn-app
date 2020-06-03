<template>
    <div>
        <person-cover-section :data="personData" class="mt-md-4" :isFullScreen="true"/>
    </div>
</template>

<script>
import PersonCoverSection from '@/components/profile/PersonCoverSection.vue'


export default {
    components: {
        'person-cover-section': PersonCoverSection,
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
