<template>
    <div>
        <poster-plot-skeleton v-if="$store.state.loading.pageLoading || $store.state.loading.pageLoading2" :isFullScreen="isFullScreen"/>
        <div v-else class="row no-gutters" :class="isFullScreen ? 'pt-md-3' : 'mt-5'">
            <div class="col-12 col-md-3 col-lg-3">
                <img class="w-100" :class="isFullScreen ? 'd-inline mb-3 mb-md-0' : 'd-none d-md-inline'" :src="src" @error="$event.target.src = require('@/assets/200x300logo.png')">
            </div>
            <div class="col-12 col-md-9 col-lg-6">
                <div>
                    <div class="d-flex align-items-center mb-lg-2">
                        <span v-if="isAnyTrue([year, genres])" class="h6 pt-md-0 pl-3 mb-0">
                            <span v-if="isTrue(year)" data-toggle="tooltip" data-placement="top" data-original-title="2000-10-11">{{ year }}</span>
                            <span v-if="isAllTrue([year, genres])" class="text-muted"> •</span>
                            <span v-if="isTrue(genres)"> {{ mergeArrayWith(genres) }}</span>
                        </span>
                        <span v-if="!isFullScreen" class="ml-auto d-lg-none">
                            <span class="d-flex">
                                <router-link :to="movieSeriesUrl('movie', data.id, 'detail')" type="text" class="btn-sm btn-block border-0 mr-1" style="color: var(--text-link-color)"><div class="one-line">More Info</div></router-link>
                            </span>
                        </span>
                    </div>
                    <div class="px-3 pr-md-1">
                        <div v-if="isTrue(plot)" class="mt-2"><p>{{ plot }}</p></div>
                        <plot-detail v-if="isTrue(directors)" :title="['Director', 'Directors']" :count="directors.length" class="mt-3">
                            <span v-for="(director, index) in directors" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link :to="`/person/${director.id}`" class="link">{{ director.name }}</router-link></span>
                        </plot-detail>
                        <plot-detail v-if="isTrue(writers)" :title="['Writer', 'Writers']" :count="writers.length" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'" class="mt-3">
                            <span v-for="(writer, index) in writers" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link :to="`/person/${writer.id}`" class="link">{{ writer.name }} ({{ writer.job }})</router-link></span>
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
                    <plot-detail v-if="isTrue(production_companies)" :title="['Production Company', 'Production Companies']" :count="production_companies.length" class="mt-3">
                        <span v-for="(company, index) in production_companies" :key="index">{{ index > 0 ? ', ' : ' ' }}{{ company.name }}<small v-if="isTrue(company.origin_country)" class="text-muted"> ({{ company.origin_country }})</small></span>
                    </plot-detail>
                    <plot-detail v-if="isTrue(runtime)" title="Runtime" class="mt-3">{{ runtime.minutes }} minutes <small class="text-muted">(<span v-if="runtime.fancy.hours > 0">{{ runtime.fancy.hours }}h </span>{{ runtime.fancy.minutes }}m)</small></plot-detail>
                    <plot-detail v-if="isTrue(budget)" title="Budget" class="mt-3">${{ budget }}</plot-detail>
                    <plot-detail v-if="isTrue(revenue)" title="Revenue" class="mt-3">${{ revenue }}</plot-detail>
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


export default {
    components: {
        'custom-button': CustomButton,
        'plot-detail': PlotDetail,
        'poster-plot-skeleton': PosterPlotSkeleton
    },
    mixins: [urlGenerate, codeToText],
    props: {
        data: Object,
        isFullScreen: Boolean
    },
    data: function() {
        return {
            loading: true
        }
    },
    computed: {
        src() {
            if(this.isTrue(this.data.poster_path)) return `${process.env.VUE_APP_TMDB_W500_URL}${this.data.poster_path}`
            if(this.isTrue(this.data.cover_path)) return `${process.env.VUE_APP_TMDB_W500_URL}${this.data.cover_path}`
            return require('@/assets/200x300logo.png')
        },
        year() {
            if(this.data.release_date) return this.dateToYear(this.data.release_date)
            if(this.data.first_air_date) return this.dateToYear(this.data.first_air_date)
        },
        genres() { return this.data.genres.map(genre => genre.name) || [] },
        plot() { return this.data.overview || '' },
        directors() { return this.data.credits.crew.filter(person => person.job === 'Director') || [] },
        writers() { return this.data.credits.crew.filter(person => ['Writer', 'Screenplay', 'Novel', 'Author'].includes(person.job)) || [] },
        original_title() { return this.data.original_title || '' },
        original_language() { return this.codeToLanguage(this.data.original_language) || '' },
        production_countries() { return this.data.production_countries || [] },
        production_companies() { return this.data.production_companies || [] },
        runtime() { return this.data.runtime > 0 ? { minutes: this.data.runtime, fancy: { hours: parseInt(this.data.runtime / 60), minutes: this.data.runtime % 60 } } : {} },
        budget() { return this.data.budget > 0 ?  `${this.data.budget}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' },
        revenue() { return this.data.revenue > 0 ?  `${this.data.revenue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' },
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
