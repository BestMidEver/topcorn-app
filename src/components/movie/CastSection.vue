<template>
    <div>
        <section-heading v-if="!isFullScreen" title="Actors & Crew" class="mt-5">
            <router-link :to="movieSeriesUrl(type, data.id, 'cast')" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass" :disabled="$store.state.loading.pageLoading"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <tabs v-if="isFullScreen" :items="['Actors', 'Crew']" :itemTypes="['cast', 'crew']" :activeType.sync="activeType"/>
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
        castData() {
            if(!this.isFullScreen) return [...(this.data.credits && this.data.credits.cast) || [], ...(this.data.credits && this.data.credits.crew) || []]
            return (this.data.credits && this.data.credits[this.activeType]) || []
        },
        dataLength() { return this.castData.length || 0 },
        activeType: {
            get() {
                return !this.isFullScreen ? 'cast' : this.$route.name.split('-')[2]
            },
            set(val) {
                if(this.type === 'movie') this.$router.replace(`/movie/${val}/${this.$route.params.id}/1`)
                if(this.type === 'series') this.$router.replace(`/series/${val}/${this.$route.params.id}/${this.$route.params.season}/${this.$route.params.episode}/1`)
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
