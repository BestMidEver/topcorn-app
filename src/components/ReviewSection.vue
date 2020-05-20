<template>
    <div>
        <section-heading v-if="!isFullScreen" title="Comments" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :class="isFullScreen ? 'pt-3' : 'mt-5'">
            <template v-if="!$store.state.loading.pageLoading2">
                <button class="btn btn-sm btn-block border-0 mr-1 text-secondary" @click="$store.dispatch('modals/openVoteComment', { data: interactionData, boundedTo: boundedTo, type: type, commentExpanded: true })"
                    :loading="$store.state.loading.pageLoading2"><div class="one-line">{{ commentButtonText }}</div></button>
                <router-link v-if="reviewCount > 2" :to="movieSeriesUrl(type, $route.params.id, 'comment')" class="btn-sm btn-block border-0 mr-1 text-secondary mt-0"><div class="one-line">Show All</div></router-link>
            </template>
        </section-heading>
        <reviews :data="data" :boundedTo="boundedTo" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :loading="$store.state.loading.pageLoading2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import CustomButton from '@/components/CustomButton.vue'
import Reviews from '@/components/reviews/Reviews.vue'
import urlGenerate from '@/mixins/urlGenerate'


export default {
    components: {
        'section-heading': SectionHeading,
        'custom-button': CustomButton,
        'reviews': Reviews,
    },
    mixins: [urlGenerate],
    props: {
        data: Object,
        isFullScreen: Boolean,
        boundedTo: Array,
        interactionData: Object,
        type: String
    },
    data() {
        return {
        }
    },
    computed: {
        reviewCount() { return this.data.data.length || 0 },
        commentButtonText() {
            if(!this.reviewCount > 0) return 'Add the First Comment'
            if(this.reviewCount > 0) { return 'Say Something' }
        },
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>