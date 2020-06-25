<template>
    <div>
        <filter-sorter v-if="isFullScreen" :filters="filters" :selectedFilters="selectedFilters"/>
        <!-- <cards :type="type" :tcData="data" :loading="loading" :boundedTo="['movieSeriesDataSets/setTcDataObjectInteraction', 'comments/setReview']"
            :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :cardType="cardType" class="mt-2"/> -->
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import Cards from '@/components/Cards.vue'
import compressedCards from '@/mixins/compressedCards'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'


export default {
    components: {
        'cards': Cards,
        'filter-sorter': FilterSorter
    },
    mixins: [urlGenerate, compressedCards],
    props: {
    },
    computed: {
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>
