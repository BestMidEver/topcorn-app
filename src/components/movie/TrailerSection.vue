<template>
    <div class="position-relative">
        <div id="accordion">
            <div>
                <div id="collapseCover" class="collapse show" data-parent="#accordion">
                    <img v-show="!$store.state.loading.pageLoading && !imageLoading" class="img-fluid trailer-cover" :src="coverSrc" @load="imageLoading = false" @error="imageLoading = true">
                    <img v-if="$store.state.loading.pageLoading || imageLoading" class="img-fluid trailer-cover" :src="require('@/assets/9x16loading.png')"/>
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
                        <div class="d-flex flex-row justify-content-end p-2 text-right" style="min-height: 66px">
                            <div v-if="voteAverage">
                                <div><span class="text-warning display-4 d-none d-md-inline">{{ voteAverage }}</span><span class="text-warning h5 d-md-none">{{ voteAverage }}</span><span class="text-white"> <small>/10</small></span></div>
                                <div class="text-white"><small>{{ voteCount }} {{ 'vote' | plural(voteCount, 'votes') }}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isTrue(trailers)">
                <div id="collapseFragman" class="collapse" data-parent="#accordion">
                    <!-- <div class="d-flex flex-row no-gutters pl-2 pt-2 pb-3" style="background: #000;">
                        <div class="col">
                            <div class="h-100 d-flex flex-column justify-content-center pl-2">
                                <span v-if="tagline" class="text-white h6 lead lead-small punch-line">{{ tagline }}</span>
                            </div>
                        </div>
                        <div class="col pb-2 pr-2 text-right">
                            <div>
                                <div>
                                    <small v-if="percentage" class="text-white">Based on your taste </small><span class="text-warning h4 d-none d-md-inline">{{ percentage }}%</span><span class="text-warning h5 d-md-none">{{ percentage }}%</span><span class="text-white"> <small>match</small></span>
                                </div> 
                            </div>
                        </div>
                    </div> -->
                    <div class="embed-responsive embed-responsive-1by1 trailer">
                        <iframe class="embed-responsive-item" :src="trailerSrc" allowfullscreen></iframe>
                    </div>
                    <div class="d-flex flex-row no-gutters" style="background: #000;">
                        <div class="col-10 col-md-5">
                            <div class="h-100 d-flex flex-column justify-content-center pl-2">
                                <div v-if="trailers.length > 1">
                                    <button class="btn btn-lg text-muted hover-white btn-trailer" :disabled="currentTrailerIndex === 0" @click="currentTrailerIndex--"><font-awesome-icon icon="step-backward"/></button>
                                    <button class="btn btn-lg text-muted hover-white btn-trailer" :disabled="currentTrailerIndex === trailers.length - 1" @click="currentTrailerIndex++"><font-awesome-icon icon="step-forward"/></button>
                                    <div class="dropdown dnone d-inline">
                                        <button class="btn btn-lg text-muted hover-white dropdown-toggle" type="button" id="dropdownchoosetrailer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownchoosetrailer">
                                            <button v-for="(trailer, index) in trailers" :key="trailer.id" class="dropdown-item" :class="{ active: currentTrailerIndex === index}" @click="currentTrailerIndex = index">{{ trailer.name }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="h-100 d-flex flex-column justify-content-center text-center">
                                <div>
                                    <button class="btn btn-lg text-muted hover-white" data-toggle="collapse" data-target="#collapseCover" aria-expanded="true" aria-controls="collapseCover"><font-awesome-icon icon="angle-up" style="font-size: 30px;"/></button>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-5 pb-2 pr-2 text-right">
                            <div v-if="voteAverage">
                                <div><span class="text-warning h4 d-none d-md-inline">{{ voteAverage }}</span><span class="text-warning h5 d-md-none">{{ voteAverage }}</span><span class="text-white"> <small>/10</small></span></div>
                                <div class="text-white"><small>{{ voteCount }} {{ 'vote' | plural(voteCount, 'votes') }}</small></div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageLoading: true,
            currentTrailerIndex: 0
        }
    },
    computed: {
        data() { return this.$store.state.movieSeriesDataSets.dataObject2 },
        trailers() { return this.data.videos && this.data.videos.results },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
        coverSrc() {
            if(this.isTrue(this.data.cover_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${this.data.cover_path}`
            if(this.isTrue(this.data.backdrop_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${this.data.backdrop_path}`
            if(this.isTrue(this.data.poster_path)) return `${process.env.VUE_APP_TMDB_COVER_URL}${this.data.poster_path}`
            this.imageLoading = true
        },
        tagline() { return this.isTrue(this.data.tagline) ? this.data.tagline : false },
        percentage() { return this.interactionData.percent },
        trailerSrc() { return `${process.env.VUE_APP_YOUTUBE_URL}/${this.trailers[this.currentTrailerIndex].key}?modestbranding=1&showinfo=0&iv_load_policy=3&autoplay=1` },
        voteAverage() { return this.data.vote_average },
        voteCount() { return this.data.vote_count }
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
</style>