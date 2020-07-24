<template>
    <div>
        <section-heading v-if="!isFullScreen" title="Comments" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :class="isFullScreen ? 'pt-3' : 'mt-5'">
            <template v-if="!loading">
                <button v-if="type !== 'user'" class="btn btn-sm btn-block border-0 mr-1 text-secondary" @click="$store.dispatch('modals/openVoteComment', { data: interactionData, boundedTo: boundedTo, type: type, voteCommentType: type==='person'||['season', 'episode'].includes(detailedType)?'comment':'vote + comment' })"
                    :loading="loading"><div class="one-line">{{ commentButtonText }}</div></button>
                <router-link v-if="reviewCount > 2" :to="to" replace class="btn-sm btn-block border-0 mr-1 text-secondary mt-0"><div class="one-line">Show All</div></router-link>
            </template>
        </section-heading>
        <reviews :data="data" :boundedTo="boundedTo" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :loading="loading"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import CustomButton from '@/components/CustomButton.vue'
import Reviews from '@/components/reviews/Reviews.vue'
import urlGenerate from '@/mixins/urlGenerate'
import seriesComputeds from '@/components/movie/seriesComputeds.js'


export default {
    components: {
        'section-heading': SectionHeading,
        'custom-button': CustomButton,
        'reviews': Reviews,
    },
    mixins: [urlGenerate, seriesComputeds],
    props: {
        data: Object,
        isFullScreen: Boolean,
        boundedTo: Array,
        interactionData: Object,
        type: String,
        loading: Boolean
    },
    data() {
        return {
        }
    },
    computed: {
        reviewCount() { return this.data && this.data.data && this.data.data.length || 0 },
        commentButtonText() {
            if(!this.reviewCount > 0) return 'Add the First Comment'
            if(this.reviewCount > 0) { return 'Say Something' }
        },
        to() {
            if(this.type === 'user') return this.userUrl(this.$route.params.id, 'comment')
            return this.movieSeriesUrl(this.type, this.$route.params.id, 'comment', this.seasonNumber, this.episodeNumber)
        }
    },
    /* created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    }, */
}
</script>

<style scoped>
</style>