<template>
    <div>
        <user-cover-section :data="userData" :interactionData="interactionData" class="mt-md-4" :pageLoading="$store.state.loading.pageLoading"/>
        <under-trailer-section v-if="!ownProfile" type="user" :data="interactionData" :boundedTo="[]"/>
        <user-movie-series-section v-if="loading || checkDataLength(moviesData)" :data="moviesData" class="mt-5" type="movie"/>
        <user-movie-series-section v-if="loading || checkDataLength(seriesData)" :data="seriesData" class="mt-5" type="series"/>
        <review-section v-if="checkDataLength(commentData)" :data="commentData" :loading="$store.state.loading.pageLoading" :boundedTo="['comments/setReview']" type="user"/>
        <user-user-section v-if="checkDataLength(friendsData)" :data="friendsData" :loading="$store.state.loading.pageLoading" class="mt-5"/>
    </div>
</template>

<script>
import UserCoverSection from '@/components/user/UserCoverSection.vue'
import UserMovieSeriesSection from '@/components/user/UserMovieSeriesSection.vue'
import ReviewSection from '@/components/ReviewSection.vue'
import UserUserSection from '@/components/user/UserUserSection.vue'
import UnderTrailerSection from '@/components/movie/UnderTrailerSection.vue'


export default {
    components: {
        'user-cover-section': UserCoverSection,
        'user-movie-series-section': UserMovieSeriesSection,
        'review-section': ReviewSection,
        'user-user-section': UserUserSection,
        'under-trailer-section': UnderTrailerSection,
    },
    props: {
    },
    data() {
        return {
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        id() { return this.$route.params.id },
        ownProfile() { return this.$store.state.auth.userId == this.id },
        userData() { return this.$store.state.movieSeriesDataSets.dataObject },
        moviesData() { return this.$store.state.movieSeriesDataSets.tcDataObject },
        seriesData() { return this.$store.state.movieSeriesDataSets.tcDataObject2 },
        commentData() { return this.$store.state.comments.dataObject },
        friendsData() { return this.$store.state.users.dataObject },
        interactionData() { return this.$store.state.users.dataObject2 },
    },
    /* watch: {
        $route() { $('.body').scrollTop(0) }
    },
    created() {
        $('.body').scrollTop(0)
    }, */
    methods: {
        checkDataLength(obj) {
            return obj.data && obj.data.length > 0
        }
    }
}
</script>

<style scoped>
</style>
