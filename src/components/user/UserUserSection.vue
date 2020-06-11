<template>
    <div>
        <section-heading v-if="!isFullScreen" title="Users" smallTitle="| Following">
            <router-link :to="userUrl($route.params.id, type)" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <filter-sorter v-if="isFullScreen" :filters="filters" :selectedFilters="selectedFilters"/>
        <cards :type="type" :tcData="data" :loading="loading" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" class="mt-2"/>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import Cards from '@/components/Cards.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import compressedCards from '@/mixins/compressedCards'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'


export default {
    components: {
        'section-heading': SectionHeading,
        'filter-sorter': FilterSorter,
        'cards': Cards,
        'loading': Boolean,
        'filter-sorter': FilterSorter,
    },
    mixins: [urlGenerate, compressedCards],
    props: {
        isFullScreen: Boolean,
        data: Object,
        loading: Boolean,
        filters: Array,
        selectedFilters: Array
    },
    data() {
        return {
            type: 'user',
            axiosRandom: '',
        }
    },
    computed: {
        dataLength() { return this.data && this.data.data && this.data.data.length || 0 },
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>
