<template>
    <div>
        <section-heading v-if="!isFullScreen" title="More Like This" class="mt-5">
            <router-link :to="movieSeriesUrl(type, $route.params.id, 'recommendations')" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <tabs v-if="isFullScreen" :items="items" :itemTypes="itemTypes" :activeType.sync="activeType"/>
        <cards :type="type" :tmdbData="tmdbData" :loading="$store.state.loading.pageLoading" :boundedTo="['interactions/setMovieInteraction']"
            :expandStatus="isFullScreen ? 'expanded' : 'compressed'" class="mt-2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import Cards from '@/components/Cards.vue'
import CustomButton from '@/components/CustomButton.vue'
import compressedCards from '@/mixins/compressedCards'
import urlGenerate from '@/mixins/urlGenerate'
import Tabs from '@/components/Tabs.vue'


export default {
    components: {
        'section-heading': SectionHeading,
        'cards': Cards,
        'custom-button': CustomButton,
        'tabs': Tabs,
    },
    mixins: [urlGenerate, compressedCards],
    props: {
        data: Object,
        isFullScreen: Boolean,
        type: String
    },
    data: function() {
        return {
        }
    },
    computed: {
        items() { return this.data.collection.results.length > 0 ? ['Recommendations', 'Similar', this.data.collection.name] : ['Recommendations', 'Similar'] },
        itemTypes() { return this.data.collection.results.length > 0 ? ['recommendations', 'similar', 'collection'] : ['recommendations', 'similar'] },
        tmdbData() {
            if(!this.isFullScreen) return this.data.recommendations && this.data.recommendations.total_results > 0 ? this.data.recommendations :  this.data.similar
            return this.data[this.activeType] || { results: [] }
        },
        dataLength() { return (this.tmdbData && this.tmdbData.total_results) || 0 },
        activeType: {
            get() {
                return this.$route.name.split('-')[2]
            },
            set(val) {
                this.$router.replace(this.movieSeriesUrl(this.type, this.$route.params.id, val))
            }
        }
    },
    watch: {
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>
