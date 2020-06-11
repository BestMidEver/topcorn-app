<template>
    <div>
        <section-heading v-if="!isFullScreen" :title="capitalizeFirstLetter(types)">
            <router-link :to="userUrl($route.params.id, type)" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <filter-sorter v-if="isFullScreen" :filters="filters" :selectedFilters="selectedFilters"/>
        <cards :type="type" :tcData="data" :loading="loading" :boundedTo="['movieSeriesDataSets/setTcDataObjectInteraction', 'comments/setReview']"
            :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :cardType="cardType" class="mt-2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import urlGenerate from '@/mixins/urlGenerate'
import Cards from '@/components/Cards.vue'
import compressedCards from '@/mixins/compressedCards'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'


export default {
    components: {
        'section-heading': SectionHeading,
        'cards': Cards,
        'filter-sorter': FilterSorter
    },
    mixins: [urlGenerate, compressedCards],
    props: {
        data: Object,
        isFullScreen: Boolean,
        type: String,
        filters: Array,
        selectedFilters: Array
    },
    computed: {
        id() { return this.$route.params.id },
        ownProfile() { return this.$store.state.auth.userId == this.id },
        types() { return this.type === 'movie' ? 'movies' : this.type },
        loading() { return this.isFullScreen ? this.$store.state.loading.pageLoading2 : this.$store.state.loading.pageLoading },
        dataLength() { return this.data && this.data.data && this.data.data.length || 0 },
        cardType() { return this.ownProfile ? 'profile-movie-series-card-own-profile' : 'profile-movie-series-card-other-profile' }
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>
