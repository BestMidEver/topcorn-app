<template>
    <div>
        <cover-container type="user" :coverSrc="coverSrc" :profileSrc="profileSrc" :isFullScreen="isFullScreen" :isOwnProfile="isOwnProfile" :externalIds="user" :homePage="homePage" :class="isFullScreen ? 'mb-3' : ''">
            <template slot="right-text-first-row">
                <skeleton-loader v-if="pageLoading" type="full-line" class="h5" lineHeight="27px" style="width: 140px; max-width: 50vw"/>
                <h5 v-if="!pageLoading"><span class="text-left">{{ name }}</span></h5>
            </template>
            <template v-if="isAnyTrue([isFullScreen, movieCount, seriesCount, followCount, isFollowingMe])" slot="right-text-second-row">
                <skeleton-loader v-if="pageLoading" type="full-line" lineHeight="24px" style="width: 66px; max-width: 40vw"/>
                <template v-if="isAllTrue([!pageLoading, isFollowingMe])"><small class="d-inline">(Follows you)</small></template>
                <template v-if="isAllTrue([!pageLoading, movieCount])"><font-awesome-icon :icon="['fas', 'film']"/><div class="d-inline pl-1">{{ movieCount }}</div></template>
                <template v-if="isAllTrue([!pageLoading, seriesCount])"><font-awesome-icon :icon="['fas', 'tv']" :class="movieCount ? 'ml-2' : ''"/><div class="d-inline pl-1">{{ seriesCount }}</div></template>
                <template v-if="isAllTrue([!pageLoading, followCount])"><font-awesome-icon :icon="['fas', 'users']" :class="isAnyTrue([movieCount, seriesCount]) ? 'ml-2' : ''"/><div class="d-inline pl-1">{{ followCount }}</div></template>
            </template>
        </cover-container>
        <template v-if="isAnyTrue([isFullScreen])">
            <GChart v-if="chartMovieData && chartMovieData.length > 1" type="BarChart" :data="chartMovieData" :options="chartMovieOptions"/>
            <GChart v-if="chartSeriesData && chartSeriesData.length > 1" type="BarChart" :data="chartSeriesData" :options="chartSeriesOptions"/>
        </template>
    </div>
</template>

<script>
import CoverContainer from '@/components/profile/CoverContainer.vue'
import PlotDetail from '@/components/movie/PlotDetail.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import codeToText from '@/mixins/codeToText'


export default {
    components: {
        'cover-container': CoverContainer,
        'plot-detail': PlotDetail,
        'skeleton-loader': SkeletonLoader,
    },
    mixins: [codeToText],
    props: {
        data: Object,
        interactionData: Object,
        detailedData: Object,
        isFullScreen: Boolean,
        pageLoading: Boolean
    },
    data() {
        return {
            isAnyLink: true,
            chartMovieOptions: { title: 'Seen Movies', legend: 'none' },
            chartSeriesOptions: { title: 'Seen Series', legend: 'none' },
        }
    },
    computed: {
        user() { return this.data || (this.detailedData && this.detailedData.user_data) || {} },
        coverSrc() { return this.user.cover_pic ? `${process.env.VUE_APP_TMDB_COVER_URL}${this.user.cover_pic}` : null },
        profileSrc() {
            let src = null
            if(this.user.profile_pic) src =  `${process.env.VUE_APP_TMDB_THUMBNAIL_URL}${this.user.profile_pic}`
            if(!src && this.user.facebook_profile_pic) src = this.user.facebook_profile_pic
            return src
        },
        name() { return this.user.name || '' },
        isOwnProfile() { return this.$route.params.id == -1 },
        homePage() { return this.user.another_link_url },
        isFollowingMe() { return !this.detailedData && this.interactionData && this.interactionData.follows_id > 0 },
        movieCount() { return this.detailedData && this.detailedData.rated_movie_count || '' },
        seriesCount() { return this.detailedData && this.detailedData.rated_series_count || '' },
        followCount() { return this.detailedData && `${this.detailedData.follower_count || 0}/${this.detailedData.following_count || 0}` },
        chartMovieData() { return this.detailedData && this.detailedData.rated_movies && [['Movies', 'Count', { role: 'style' }], ...this.detailedData.rated_movies.map(group => [this.rateCodeToText(group.rate), group.count, `color: #${this.rateCodeToColor(group.rate)}`]).sort((a, b) => a.rate > b.rate ? 1 : -1)] },
        chartSeriesData() { return this.detailedData && this.detailedData.rated_series && [['Movies', 'Count', { role: 'style' }], ...this.detailedData.rated_series.map(group => [this.rateCodeToText(group.rate), group.count, `color: #${this.rateCodeToColor(group.rate)}`]).sort((a, b) => a.rate > b.rate ? 1 : -1)] }
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    },
}
</script>

<style scoped>
</style>
