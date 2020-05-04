<template>
    <full-screen-container :isFullScreen="isFullScreen">
        <div class="row no-gutters" :class="isFullScreen ? 'pt-md-3' : 'mt-5'">
            <div class="col-12 col-md-3 col-lg-3">
                <img class="w-100" :class="isFullScreen ? 'd-inline mb-3 mb-md-0' : 'd-none d-md-inline'" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/fQMSaP88cf1nz4qwuNEEFtazuDM.jpg">
            </div>
            <div class="col-12 col-md-9 col-lg-6">
                <div>
                    <div class="d-flex align-items-center mb-lg-2">
                        <span v-if="isAnyTrue([year, genres])" class="h6 pt-md-0 pl-3 mb-0">
                            <span v-if="isTrue(year)" data-toggle="tooltip" data-placement="top" data-original-title="2000-10-11">{{ year }}</span>
                            <span v-if="isAllTrue([year, genres])" class="text-muted"> •</span>
                            <span v-if="isTrue(genres)"> {{ mergeArrayWith(genres) }}</span>
                        </span>
                        <span class="ml-auto d-lg-none">
                            <span class="d-flex">
                                <custom-button type="text" :status="isFullScreen ? 'active' : ''" class="btn-sm btn-block border-0 mr-1"><div class="one-line">More Info</div></custom-button>
                            </span>
                        </span>
                    </div>
                    <div class="px-3 pr-md-1">
                        <div v-if="isTrue(plot)" class="pt-2"><p>{{ plot }}</p></div>
                        <plot-detail :title="['Director', 'Directors']" :count="directors.length" class="mt-3">
                            <span v-for="(director, index) in directors" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link to="/person" class="link">{{ director }}</router-link></span>
                        </plot-detail>
                        <plot-detail :title="['Writer', 'Writers']" :count="writers.length" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'" class="mt-3">
                            <span v-for="(writer, index) in writers" :key="index">{{ index > 0 ? ', ' : ' ' }}<router-link to="/person" class="link">{{ writer }} (Screenplay)</router-link></span>
                        </plot-detail>
                    </div>
                </div>
            </div>
            <div class="col-3 d-none d-md-inline d-lg-none"></div>
            <div class="col-9 col-lg-3" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'">
                <div class="px-3 pr-md-1">
                    <div class="h5 d-none d-lg-inline">Movie Details</div>
                    <plot-detail title="Original Title" :class="isFullScreen ? 'mt-3' : 'mt-2'">Memento</plot-detail>
                    <plot-detail title="Original Language" class="mt-3">English</plot-detail>
                    <plot-detail :title="['Producer Country', 'Producer Countries']" :count="1" class="mt-3">United States of America</plot-detail>
                    <plot-detail title="Runtime" class="mt-3">113 minutes <small class="text-muted">(1h 53m)</small></plot-detail>
                    <plot-detail title="Budget" class="mt-3">$9,000,000</plot-detail>
                    <plot-detail title="Revenue" class="mt-3">$39,723,096</plot-detail>
                </div>
            </div>
        </div>
    </full-screen-container>
</template>

<script>
import FullScreenContainer from '@/components/FullScreenContainer.vue'
import CustomButton from '@/components/CustomButton.vue'
import PlotDetail from '@/components/movie/PlotDetail.vue'


export default {
    components: {
        'full-screen-container': FullScreenContainer,
        'custom-button': CustomButton,
        'plot-detail': PlotDetail,
    },
    props: {
        title: String
    },
    data: function() {
        return {
            isFullScreen: false,
            year: 2000,
            genres: ['Mystery', 'Thriller'],
            plot: "Leonard Shelby is tracking down the man who raped and murdered his wife. The difficulty of locating his wife's killer, however, is compounded by the fact that he suffers from a rare, untreatable form of short-term memory loss. Although he can recall details of life before his accident, Leonard cannot remember what happened fifteen minutes ago, where he's going, or why.",
            directors: ['Christopher Nolan'],
            writers: ['Christopher Nolan', 'Jonathan Nolan']
        }
    },
}
</script>

<style scoped>
.link{ color: var(--text-link-color) }
.link:hover{ color: var(--text-link-hover-color) }
</style>
