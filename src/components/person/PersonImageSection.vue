<template>
    <div>
        <section-heading v-if="!isFullScreen" title="Images">
            <router-link :to="personUrl($route.params.id, 'image')" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary" :class="buttonClass"><div class="one-line">Show All</div></router-link>
        </section-heading>
        <cards type="profile-image-card" :tcAllResults="results" :loading="$store.state.loading.pageLoading" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" class="mt-2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import urlGenerate from '@/mixins/urlGenerate'
import Cards from '@/components/Cards.vue'
import compressedCards from '@/mixins/compressedCards'


export default {
    components: {
        'section-heading': SectionHeading,
        'cards': Cards,
    },
    mixins: [urlGenerate, compressedCards],
    props: {
        data: Object,
        isFullScreen: Boolean,
    },
    data() {
        return {
            type: 'profile-image-card'
        }
    },
    computed: {
        results() { return this.data.images ? this.data.images.profiles : [] },
        dataLength() { return this.results.length || 0 },
    },
    /* created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    }, */
    methods: {
    },
}
</script>

<style scoped>
</style>
