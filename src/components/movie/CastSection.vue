<template>
    <div>
        <section-heading v-if="!isFullScreen" title="Actors & Crew" class="mt-5">
            <router-link :to="movieSeriesUrl(type, $route.params.id, 'cast', seasonNumber, episodeNumber)" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass" :disabled="$store.state.loading.pageLoading"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <tabs v-if="isFullScreen" :items="items" :itemTypes="itemTypes" :activeType.sync="activeType"/>
        <cards type="person" :tcAllResults="castData" :loading="$store.state.loading.pageLoading" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" class="mt-2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import Cards from '@/components/Cards.vue'
import CustomButton from '@/components/CustomButton.vue'
import compressedCards from '@/mixins/compressedCards'
import urlGenerate from '@/mixins/urlGenerate'
import Tabs from '@/components/Tabs.vue'
import seriesComputeds from '@/components/movie/seriesComputeds.js'


export default {
    components: {
        'section-heading': SectionHeading,
        'cards': Cards,
        'custom-button': CustomButton,
        'tabs': Tabs,
    },
    mixins: [urlGenerate, compressedCards, seriesComputeds],
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
        items() { return this.detailedType === 'episode' ? ['Actors', 'Guest Stars', 'Crew'] : ['Actors', 'Crew'] },
        itemTypes() { return this.detailedType === 'episode' ? ['cast', 'guest', 'crew'] : ['cast', 'crew'] },
        castData() {
            if(!this.isFullScreen) return [...(this.data.credits && this.data.credits.cast) || [], ...(this.data.credits && this.data.credits.guest) || [], ...(this.data.credits && this.data.credits.crew) || []]
            return (this.data.credits && this.data.credits[this.activeType]) || []
        },
        dataLength() { return this.castData.length || 0 },
        activeType: {
            get() {
                return !this.isFullScreen ? 'cast' : this.$route.name.split('-')[2]
            },
            set(val) {
                if(this.type === 'movie') this.$router.replace(`/movie/${val}/${this.$route.params.id}/1`)
                if(this.type === 'series') this.$router.replace(`/series/${val}/${this.$route.params.id}/${this.seasonNumber}/${this.episodeNumber}/1`)
            }
        }
    },
    watch: {
        detailedType(val) { if(this.$route.name.split('-')[2] === 'guest' && this.detailedType !== 'episode') this.$router.replace(`/series/cast/${this.$route.params.id}/${this.seasonNumber}/${this.episodeNumber}/1`) }
    },
    /* created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    }, */
}
</script>

<style scoped>
</style>
