<template>
    <div class="position-relative">
        <div id="accordion">
            <div>
                <div id="collapseCover" class="collapse show" data-parent="#accordion">
                    <img v-if="ifCover" v-show="!this.imageLoading" class="img-fluid trailer-cover" :src="coverSrc" @load="imageLoading = false" @error="imageLoading = true">
                    <img v-if="!ifCover || this.imageLoading" class="img-fluid trailer-cover" :src="require('@/assets/9x16loading.png')"/>
                    <div v-if="!$store.state.loading.pageLoading && !$store.state.loading.pageLoading2" class="custom-over-layer h-100 d-flex flex-column justify-content-between">
                        <div class="d-flex flex-row no-gutters" style="min-height: 66px">
                            <div class="col pt-2 pl-2">
                                <span v-if="tagline" class="text-white h6 lead lead-small punch-line">{{ tagline }}</span>
                            </div>
                            <div class="col p-2 text-right">
                                <div v-if="percentage">
                                    <small class="text-white">Based on your taste</small>
                                    <div>
                                        <span class="text-warning display-4 d-none d-md-inline">{{ percentage }}%</span><span class="text-warning h5 d-md-none">{{ percentage }}%</span><span class="text-white"><small> match</small></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="isTrue(trailers)" class="d-flex flex-row justify-content-center">
                            <button class="btn text-white btn-lg collapsed" data-toggle="collapse" data-target="#collapseFragman" aria-expanded="false" aria-controls="collapseFragman"><font-awesome-icon :icon="['far', 'play-circle']" class="mr-2"/><small>TRAILERS &amp; VIDEOS</small></button>
                        </div>
                        <div class="d-flex flex-row justify-content-between p-2 text-right" style="min-height: 66px">
                            <div class="d-flex flex-column justify-content-end ml-2 mb-2"><img v-if="type === 'series'" v-show="showLogo" style="max-height: 17px" :src="logoSrc" @load="logoLoading = false" @error="logoLoading = true"></div>
                            <div v-if="voteAverage">
                                <div><span class="text-warning display-4 d-none d-md-inline">{{ voteAverage }}</span><span class="text-warning h5 d-md-none">{{ voteAverage }}</span><span class="text-white"> <small>/10</small></span></div>
                                <div class="text-white"><small>{{ voteCount }} {{ 'vote' | plural(voteCount, 'votes') }}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div id="collapseFragman" class="collapse" data-parent="#accordion">
                    <div v-if="ifTrailer" v-show="!videoLoading" class="embed-responsive embed-responsive-1by1 trailer">
                        <iframe class="embed-responsive-item" style="background: #000" :src="trailerSrc" allowfullscreen @load="videoLoaded()"></iframe>
                    </div>
                    <div v-show="!ifTrailer || videoLoading">
                        <div class="d-flex justify-content-center" :class="(ifTrailerLoader || videoLoading || hiddenTrailers) ? 'trailer-loading' : 'trailer-not-found'"><no-result class="mt-0" expandStatus="expanded"/></div>
                    </div>
                    <div class="d-flex flex-row no-gutters" style="background: #000;">
                        <div class="col-10 col-md-5">
                            <div class="h-100 d-flex flex-column justify-content-center pl-2">
                                <div v-if="trailers && trailers.length > 1" class="d-flex">
                                    <button class="btn btn-lg text-muted hover-white btn-trailer" :disabled="currentTrailerIndex === 0" @click="currentTrailerIndex--"><font-awesome-icon icon="step-backward"/></button>
                                    <button class="btn btn-lg text-muted hover-white btn-trailer" :disabled="currentTrailerIndex === trailers.length - 1" @click="currentTrailerIndex++"><font-awesome-icon icon="step-forward"/></button>
                                    <custom-select class="d-inline" :items="trailers.map(trailer => trailer.name)" :selected.sync="selectedTrailer" buttonHeight="48px" buttonWidth="46px">
                                        <button class="btn btn-lg text-muted hover-white dropdown-toggle"></button>
                                    </custom-select>
                                    <!-- <div class="dropdown dnone d-inline">
                                        <button class="btn btn-lg text-muted hover-white dropdown-toggle" type="button" id="dropdownchoosetrailer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownchoosetrailer">
                                            <button v-for="(trailer, index) in trailers" :key="trailer.id" class="dropdown-item" :class="{ active: currentTrailerIndex === index}" @click="currentTrailerIndex = index">{{ trailer.name }}</button>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="h-100 d-flex flex-column justify-content-center text-center">
                                <div>
                                    <button class="btn btn-lg text-muted hover-white" data-toggle="collapse" data-target="#collapseCover" aria-expanded="true" aria-controls="collapseCover" @click="resetTrailerSection()"><font-awesome-icon icon="angle-up" style="font-size: 30px;"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoResult from '@/components/NoResult.vue'
import seriesComputeds from './seriesComputeds.js'
import CustomSelect from '@/components/customInputs/CustomSelect.vue'

function initialState (){
    return {
        imageLoading: true,
        logoLoading: true,
        currentTrailerIndex: 0,
        hiddenTrailers: false,
        videoLoading: true
    }
}

export default {
    components: {
        'no-result': NoResult,
        'custom-select': CustomSelect,
    },
    mixins: [seriesComputeds],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() { return initialState() },
    computed: {
        data() { return this.$store.state.movieSeriesDataSets.dataObject2 },
        trailers() {
            let dataToCheck = {}
            if(['movie', 'series'].includes(this.detailedType)) dataToCheck = this.data
            else if(this.detailedType === 'season') dataToCheck = this.seasonData
            else dataToCheck = this.episodeData
            return dataToCheck.videos && dataToCheck.videos.results
        },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
        coverSrc() {
            let dataToCheck = {}
            if(['movie', 'series', 'season'].includes(this.detailedType)) dataToCheck = this.data
            else dataToCheck = this.episodeData
            if(this.isTrue(dataToCheck.cover_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${dataToCheck.cover_path}`
            if(this.isTrue(dataToCheck.still_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${dataToCheck.still_path}`
            if(this.isTrue(dataToCheck.backdrop_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${dataToCheck.backdrop_path}`
            if(this.isTrue(dataToCheck.poster_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${dataToCheck.poster_path}`
            this.imageLoading = true
        },
        logoSrc() {
            if(this.isTrue(this.data.networks && this.data.networks[0])) return `${process.env.VUE_APP_TMDB_ORIGINAL_URL}${this.data.networks[0].logo_path.split('.')[0] + '.svg'}`
            this.logoLoading = true
        },
        tagline() {
            if(this.type === 'movie') return this.isTrue(this.data.tagline) ? this.data.tagline : false
            if(this.detailedType === 'series') return this.isAllTrue([this.data.number_of_episodes, this.data.number_of_seasons]) ? `${this.data.number_of_seasons} ${this.$options.filters.plural('Season', this.data.number_of_seasons, 'Seasons')} - ${this.data.number_of_episodes} ${this.$options.filters.plural('Episode', this.data.number_of_episodes, 'Episodes')}` : false
            /* if(this.detailedType === 'season') return this.seasonData.air_date ? `Aired on ${this.seasonData.air_date}` : ''
            return this.episodeData.air_date ? `Aired on ${this.episodeData.air_date}` : '' */
        },
        percentage() { return ['movie', 'series'].includes(this.detailedType) ? this.interactionData.percent : '' },
        trailerSrc() { return this.ifTrailer && this.trailers.length > 0 && `${process.env.VUE_APP_YOUTUBE_URL}/${this.trailers[this.currentTrailerIndex].key}?modestbranding=1&showinfo=0&iv_load_policy=3` },
        voteAverage() {
            if(['movie', 'series'].includes(this.detailedType)) return this.data.vote_average
            if(this.detailedType === 'season') return this.seasonData.episodes && this.roundTo(this.seasonData.episodes.reduce((sum, episode) => sum + episode.vote_count * episode.vote_average / this.voteCount, 0), 10)
            if(this.detailedType === 'episode') return this.roundTo(this.episodeData.vote_average, 10)
        },
        voteCount() {
            if(['movie', 'series'].includes(this.detailedType)) return this.data.vote_count
            if(this.detailedType === 'season') return this.seasonData.episodes.reduce((sum, episode) => sum + episode.vote_count, 0)
            if(this.detailedType === 'episode') return this.episodeData.vote_count
        },
        ifCover() { return !this.$store.state.loading.pageLoading && this.data.id == this.$route.params.id && !(this.detailedType === 'episode' && this.$store.state.loading.pageLoading4) },
        showLogo() { return !this.logoLoading && this.data.id == this.$route.params.id },
        ifTrailerLoader() { return this.$store.state.loading.pageLoading || (this.detailedType === 'episode' && this.$store.state.loading.pageLoading4) || this.hiddenTrailers },
        ifTrailer404() { return this.isFalse(this.trailers) || (this.trailers && this.trailers.length == 0) },
        ifTrailer() { return !this.ifTrailerLoader && !this.ifTrailer404 },
        selectedTrailer: {
            get() {
                return this.trailers[this.currentTrailerIndex].name
            },
            set(val) {
                this.currentTrailerIndex = this.trailers.findIndex(trailer => trailer.name == val)
            }
        },
    },
    watch: {
        coverSrc() { this.imageLoading = true },
        logoSrc() { this.logoLoading = true },
        trailerSrc() { if(this.ifTrailer && this.trailers.length > 0) this.videoLoading = true },
        tabCode() { this.currentTrailerIndex = 0 },
        currentTrailerIndex() { this.resetTrailerSection() },
        '$route.params.id'() { Object.assign(this.$data, initialState()); $('#collapseCover').collapse('show') }
    },
    methods: {
        resetTrailerSection() {
            setTimeout(() => { this.hiddenTrailers = true; setTimeout(() => { this.hiddenTrailers = false }, 50) }, 50)
        },
        videoLoaded() { setTimeout(() => { this.videoLoading = false }, 100) }
    }
}
</script>

<style scoped>
.trailer-cover {
    object-fit: cover;
    width: 100%;
    max-height: 500px;
    min-height: 300px;
    filter: brightness(40%);
}
.custom-over-layer {
    position: absolute;
    width: 100%;
    top: 0;
}
.lead-small {
    font-size: 1rem;
}
.trailer {
    max-height: 500px;
}
.hover-white:hover { color: #fff!important; }
.punch-line {
    min-height: 4rem;
    max-height: 4rem;
    overflow: auto;
    display: -webkit-inline-box;
}
.trailer-loading {
    filter: brightness(0%);
    background: #000;
}
.trailer-not-found {
    filter: invert(1);
    background: #fff;
}
.btn-trailer:disabled { color: #000!important }
</style>