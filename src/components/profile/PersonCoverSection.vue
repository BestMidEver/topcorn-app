<template>
    <div>
        <cover-container type="person" :coverSrc="coverSrc" :profileSrc="profileSrc" :isFullScreen="isFullScreen" :externalIds="links" :homePage="data.homepage" :class="isFullScreen ? 'mb-3' : ''">
            <template slot="right-text-first-row">
                <skeleton-loader v-if="pageLoading" type="full-line" class="h5" lineHeight="27px" style="width: 140px; max-width: 50vw"/>
                <h5 v-if="!pageLoading"><span class="text-left">{{ name }}<small v-if="age"> ({{age}})</small></span></h5>
            </template>
            <template v-if="isAnyTrue([pageLoading, birthPlace])" slot="right-text-second-row">
                <skeleton-loader v-if="pageLoading" type="full-line" lineHeight="24px" style="width: 66px; max-width: 40vw"/>
                <template v-if="!pageLoading"><font-awesome-icon :icon="['fas', 'map-marker']"/><div class="d-inline pl-1">{{ birthPlace }}</div></template>
            </template>
        </cover-container>
        <div v-if="isAllTrue([isFullScreen, jobTypes])" class="h6 px-3">{{ jobTypes }}</div>
        <expandable-text v-if="isAllTrue([isFullScreen, biography])" class="mt-2 px-3" :text="biography"/>
        <plot-detail v-if="isAllTrue([isFullScreen, birthday])" title="Birthday" class="mt-3 px-3">{{ birthday }}</plot-detail>
        <plot-detail v-if="isAllTrue([isFullScreen, deathday])" title="Deathday" class="mt-3 px-3">{{ deathday }}</plot-detail>
    </div>
</template>

<script>
import CoverContainer from '@/components/profile/CoverContainer.vue'
import ExpandableText from '@/components/ExpandableText.vue'
import PlotDetail from '@/components/movie/PlotDetail.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'


export default {
    components: {
        'cover-container': CoverContainer,
        'expandable-text': ExpandableText,
        'plot-detail': PlotDetail,
        'skeleton-loader': SkeletonLoader,
    },
    props: {
        data: Object,
        isFullScreen: Boolean
    },
    data() {
        return {
            isAnyLink: true,
        }
    },
    computed: {
        pageLoading() { return this.$store.state.loading.pageLoading },
        profileSrc() {
            if(this.isTrue(this.data.profile_path)) return `${process.env.VUE_APP_TMDB_THUMBNAIL_URL}${this.data.profile_path}`
        },
        coverSrc() {
            let src = null
            //if(this.data.tagged_images && this.data.tagged_images.results.length > 0) src = this.data.tagged_images.results[0].file_path
            if(!src && this.data.series && this.data.series.results.length > 0 && this.data.series.results[0].episode_count > 25) src = this.data.series.results[0].backdrop_path
            if(!src && this.data.movies && this.data.movies.results.length > 0) src = this.data.movies.results[0].backdrop_path
            if(!src && this.data.series && this.data.series.results.length > 0) src = this.data.series.results[0].backdrop_path
            return src ? `${process.env.VUE_APP_TMDB_COVER_URL}${src}` : null
        },
        name() { return this.data.name || '' },
        birthday() { return this.data.birthday },
        deathday() { return this.data.deathday },
        age() { return this.getAge(this.birthday, this.deathday) },
        birthPlace() { return this.isFullScreen ? this.data.place_of_birth : this.data.place_of_birth && this.data.place_of_birth.split(', ').pop() },
        links() { return this.data.external_ids },
        biography() { return this.data.biography },
        jobTypes() { return this.data.jobTypes && this.data.jobTypes.map(type => type.job).join(', ') },
    },
    /* created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    }, */
}
</script>

<style scoped>
</style>
