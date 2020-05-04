<template>
    <div>
        <cards :type="movieSeriesType" :tmdbData="mergedTmdbResponse" :loading="$store.state.loading.pageLoading" class="mt-2"/>
    </div>
</template>

<script>
import tmdbMerge from '../../mixins/tmdbMerge'
import searchMovieSeries from './searchMovieSeries'
import Cards from '@/components/Cards.vue'

export default {
    components: {
        'cards': Cards,
    },
    watch: {
        $route() { this.startdebouncingSearch() }
    },
    beforeMount() {
        this.startdebouncingSearch()
    },
    data() {
        return {
            movieSeriesType: 'series',
        } 
    },
}
</script>

<style scoped>
</style>
