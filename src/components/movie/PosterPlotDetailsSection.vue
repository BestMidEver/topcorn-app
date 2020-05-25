<template>
    <div>
        <poster-plot-skeleton v-if="isPageLoading" :isFullScreen="isFullScreen"/>
        <div v-show="!isPageLoading" class="row no-gutters" :class="isFullScreen ? 'pt-md-3' : 'mt-5'">
            <div class="col-12 col-md-3 col-lg-3">
                <div v-show="!imageLoading">
                    <img @load="imageLoading = false" class="w-100" :class="isFullScreen ? 'd-inline mb-3 mb-md-0' : 'd-none d-md-inline'" :src="src" @error="$event.target.src = errorSrc">
                </div>
                <img v-if="imageLoading" class="w-100" :class="isFullScreen ? 'd-inline mb-3 mb-md-0' : 'd-none d-md-inline'" :src="loadingSrc"/>
            </div>
            <div class="col-12 col-md-9 col-lg-6">
                <div>
                    <div class="d-flex align-items-center mb-lg-2">
                        <span v-if="isAnyTrue([year, genres])" class="h6 pt-md-0 pl-3 mb-0">
                            <span v-if="isTrue(year)" data-toggle="tooltip" data-placement="top" :data-original-title="year">{{ this.dateToYear(year) }}</span>
                            <template v-if="isTrue(endYear)">
                                <span v-if="endYear === 'margin'" class="mr-3">-</span>
                                <span v-else data-toggle="tooltip" data-placement="top" :data-original-title="endYear">-{{ this.dateToYear(endYear) }}</span>
                            </template>
                            <span v-if="isAllTrue([year, genres])" class="text-muted"> •</span>
                            <span v-if="isTrue(genres)"> {{ mergeArrayWith(genres) }}</span>
                        </span>
                        <span v-if="['season', 'episode'].includes(detailedType) && isAnyTrue([tabCode, seasonEpisodeName])" class="h6 pt-md-0 pl-3 mb-0">
                            <span v-if="isTrue(tabCode)"> {{ tabCode }}</span>
                            <span v-if="isAllTrue([seasonEpisodeName, tabCode])" class="text-muted"> •</span>
                            <span v-if="isTrue(seasonEpisodeName)"> {{ seasonEpisodeName }}</span>
                        </span>
                        <span v-if="!isFullScreen" class="ml-auto d-lg-none">
                            <span class="d-flex">
                                <router-link :to="movieSeriesUrl(type, $route.params.id, 'detail', seasonNumber, episodeNumber)" replace type="text" class="btn-sm btn-block border-0 mr-1 text-secondary one-line"><div>More Info</div></router-link>
                            </span>
                        </span>
                    </div>
                    <div class="px-3 pr-md-1">
                        <expandable-text v-if="isTrue(plot)" class="mt-2" :text="plot"/>
                        <plot-detail v-if="isTrue(directors)" :title="['Director', 'Directors']" :count="directors.length" class="mt-3">
                            <span v-for="(director, index) in directors" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link :to="personUrl(director.id)" class="link">{{ director.name }}</router-link></span>
                        </plot-detail>
                        <plot-detail v-if="isTrue(creators)" :title="['Creator', 'Creators']" :count="creators.length" class="mt-3">
                            <span v-for="(creator, index) in creators" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link :to="personUrl(creator.id)" class="link">{{ creator.name }}</router-link></span>
                        </plot-detail>
                        <plot-detail v-if="isTrue(writers)" :title="['Writer', 'Writers']" :count="writers.length" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'" class="mt-3">
                            <span v-for="(writer, index) in writers" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link :to="personUrl(writer.id)" class="link">{{ writer.name }} <small class="text-muted">({{ writer.job.filter(job => writerJobs.includes(job)).join(', ') }})</small></router-link></span>
                        </plot-detail>
                        <plot-detail v-if="isTrue(seasonEpisodeAirDate)" title="Air Date" class="mt-3">{{ seasonEpisodeAirDate }}</plot-detail>
                        <plot-detail v-if="isTrue(networks)" :title="['Network', 'Networks']" :count="networks.length" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'" class="mt-3">
                            <span>{{ networks.join(', ') }} </span>
                            <span class="small text-muted">({{ data.status }})</span>
                        </plot-detail>
                    </div>
                </div>
            </div>
            <div class="col-3 d-none d-md-inline d-lg-none"></div>
            <div class="col-9 col-lg-3" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'">
                <div class="px-3 pr-md-1">
                    <div class="h5 d-none d-lg-inline">Movie Details</div>
                    <plot-detail v-if="isTrue(original_title)" title="Original Title" :class="isFullScreen ? 'mt-3' : 'mt-2'">{{ original_title }}</plot-detail>
                    <plot-detail v-if="isTrue(original_language)" title="Original Language" class="mt-3">{{ original_language }}</plot-detail>
                    <plot-detail v-if="isTrue(production_countries)" :title="['Production Country', 'Production Countries']" :count="production_countries.length" class="mt-3">
                        <span v-for="(country, index) in production_countries" :key="index">{{ index > 0 ? ', ' : ' ' }}{{ country.name }}</span>
                    </plot-detail>
                    <plot-detail v-if="isTrue(origin_countries)" :title="['Origin Country', 'Origin Countries']" :count="origin_countries.length" class="mt-3">
                        <span v-for="(country, index) in origin_countries" :key="index">{{ index > 0 ? ', ' : ' ' }}{{ country }}</span>
                    </plot-detail>
                    <plot-detail v-if="isTrue(production_companies)" :title="['Production Company', 'Production Companies']" :count="production_companies.length" class="mt-3">
                        <span v-for="(company, index) in production_companies" :key="index">{{ index > 0 ? ', ' : ' ' }}{{ company.name }}<small v-if="isTrue(company.origin_country)" class="text-muted"> ({{ company.origin_country }})</small></span>
                    </plot-detail>
                    <plot-detail v-if="isTrue(runtime)" title="Runtime" class="mt-3">{{ runtime.minutes }} minutes <small v-if="runtime.fancy.hours > 0" class="text-muted">(<span>{{ runtime.fancy.hours }}h </span>{{ runtime.fancy.minutes }}m)</small></plot-detail>
                    <plot-detail v-if="isTrue(budget)" title="Budget" class="mt-3">${{ budget }}</plot-detail>
                    <plot-detail v-if="isTrue(revenue)" title="Revenue" class="mt-3">${{ revenue }}</plot-detail>
                    <plot-detail v-if="isTrue(last_episode)" title="Last Episode" class="mt-3">{{ last_episode.name }} <small class="text-muted">({{ last_episode.date }})</small></plot-detail>
                    <plot-detail v-if="isTrue(episodeCount)" title="Episodes" class="mt-3">{{ episodeCount }}</plot-detail>
                    <!-- <plot-detail v-if="isTrue(seasonEpisodeName)" title="Name" class="mt-3">{{ seasonEpisodeName }}</plot-detail> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import PlotDetail from '@/components/movie/PlotDetail.vue'
import urlGenerate from '@/mixins/urlGenerate'
import codeToText from '@/mixins/codeToText'
import PosterPlotSkeleton from './PosterPlotSkeleton.vue'
import seriesComputeds from './seriesComputeds.js'
import ExpandableText from '@/components/ExpandableText.vue'


export default {
    components: {
        'custom-button': CustomButton,
        'plot-detail': PlotDetail,
        'poster-plot-skeleton': PosterPlotSkeleton,
        'expandable-text': ExpandableText,
    },
    mixins: [urlGenerate, codeToText, seriesComputeds],
    props: {
        data: Object,
        isFullScreen: Boolean,
        type: String
    },
    data() {
        return {
            writerJobs: ['Writer', 'Screenplay', 'Novel', 'Author'],
            imageLoading: true
        }
    },
    computed: {
        isPageLoading() { return this.$store.state.loading.pageLoading || this.$store.state.loading.pageLoading2 || (this.detailedType === 'season' && this.$store.state.loading.pageLoading3) },
        loadingSrc() { return this.detailedType === 'episode' ? require('@/assets/9x16loading.png') : require('@/assets/2x3loading.png') },
        errorSrc() { return this.detailedType === 'episode' ? require('@/assets/9x16loading.png') : require('@/assets/200x300logo.png') },
        src() {
            if(this.isTrue(this.data.poster_path)) return `${process.env.VUE_APP_TMDB_W500_URL}${this.data.poster_path}`
            if(this.isTrue(this.data.cover_path)) return `${process.env.VUE_APP_TMDB_W500_URL}${this.data.cover_path}`
            if(this.isTrue(this.data.still_path)) return `${process.env.VUE_APP_TMDB_W500_URL}${this.data.still_path}`
            return this.errorSrc
        },
        year() {
            if(this.data.release_date) return this.data.release_date
            if(this.data.first_air_date) return this.data.first_air_date
        },
        endYear() {
            if(this.type === 'series') {
                if(['Ended', 'Canceled'].includes(this.data.status)) return this.data.last_air_date
                if(this.data.last_air_date) return 'margin'
            }
        },
        genres() { return (this.data.genres && this.data.genres.map(genre => genre.name)) || [] },
        plot() { return this.data.overview || '' },
        directors() { return this.data.credits && this.data.credits.crew.filter(person => person.job.includes('Director')) || [] },
        writers() { return this.data.credits && this.data.credits.crew.filter(person => {return Array.isArray(person.job) ? person.job.some(job => this.writerJobs.includes(job)) : this.writerJobs.includes(person.job) }) || [] },
        creators() { return this.data.created_by || [] },
        networks() { return (this.data.networks && this.data.networks.map(network => network.name)) || [] },
        original_title() { return this.data.original_title || '' },
        original_language() { return this.codeToLanguage(this.data.original_language) || '' },
        production_countries() { return this.data.production_countries || [] },
        origin_countries() { return (this.data.origin_country && this.data.origin_country.map(country => this.codeToCountry(country))) || '' },
        production_companies() { return this.data.production_companies || [] },
        runtime() {
            const runtime = this.data.runtime || (this.data.episode_run_time && this.data.episode_run_time[0]) || 0
            return runtime > 0 ? { minutes: runtime, fancy: { hours: parseInt(runtime / 60), minutes: runtime % 60 } } : {}
        },
        budget() { return this.data.budget > 0 ?  `${this.data.budget}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' },
        revenue() { return this.data.revenue > 0 ?  `${this.data.revenue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' },
        last_episode() { return this.data.last_episode_to_air ? { name: this.toEpisodeCode(this.data.last_episode_to_air.season_number, this.data.last_episode_to_air.episode_number), date: this.data.last_episode_to_air.air_date } : {} },
        seasonEpisodeAirDate() {
            if(this.detailedType === 'season') return this.seasonData.air_date
            if(this.detailedType === 'episode') return this.episodeData. air_date
        },
        episodeCount() { if(this.detailedType === 'season') return this.seasonData.episodes && this.seasonData.episodes.length },
        seasonEpisodeName() { if(['season', 'episode'].includes(this.detailedType) && this.isFullScreen) return this.data.name }
    },
    watch: {
        tabCode() { this.imageLoading = true }
    },
    created() {
        if(this.isFullScreen) $('.body').scrollTop(0)
    }
}
</script>

<style scoped>
.link{ color: var(--text-link-color) }
.link:hover{ color: var(--text-link-hover-color) }
</style>
