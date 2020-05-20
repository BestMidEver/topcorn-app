<template>
    <div>
        <progress-bar/>
        <div class="my-2 my-md-3">
            <tabs :active.sync="season" :items="['General Info', 'Specials', 'S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08']" :class="season !== 0 ? 'bottom-line' : ''"/>
            <tabs v-show="season !== 0" :active.sync="episode" :items="['Season Info', 'E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07', 'E08', 'E09', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18']" class="mt-1"/>
        </div>
        <trailer-section/>
        <under-trailer-section :title="pageTitle" :type="pageType"/>
        <poster-plot-details-section/>
        <compressed-cards title="Actors & Crew" expandTitle="Show Everyone" type="person" :isFullScreen="false"/>
        <review-section :isFullScreen="false"/>
        <compressed-cards title="Kill Bill Collection" expandTitle="Show All" type="movie" :isFullScreen="false"/>
        <compressed-cards title="Lists With This" expandTitle="Show All" type="list" :isFullScreen="false">
            <template slot="button">
                <custom-button type="create" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-lg-4"><div class="one-line">Create One</div></custom-button>
            </template>
        </compressed-cards>
        <compressed-cards title="More Like This" expandTitle="Show All" type="movie" :isFullScreen="false"/>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import Tabs from '@/components/Tabs.vue'
import TrailerSection from '@/components/movie/TrailerSection.vue'
import UnderTrailerSection from '@/components/movie/UnderTrailerSection.vue'
import PosterPlotDetailsSection from '@/components/movie/PosterPlotDetailsSection.vue'
import CompressedCards from '@/components/CompressedCards.vue'
import ReviewSection from '@/components/ReviewSection.vue'
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'progress-bar': ProgressBar,
        'tabs': Tabs,
        'trailer-section': TrailerSection,
        'under-trailer-section': UnderTrailerSection,
        'poster-plot-details-section': PosterPlotDetailsSection,
        'compressed-cards': CompressedCards,
        'review-section': ReviewSection,
        'custom-button': CustomButton,
    },
    data: function() {
        return {
            season: 0,
            episode: 0
        }
    },
    computed: {
        pageType: function() {
            if(this.season === 0) return 'series'
            if(this.episode === 0) return 'series-season-info'
            return 'series-episode-info'
        },
        pageTitle: function() {
            if(this.season === 0) return 'Westworld'
            if(this.episode === 0) return 'Westworld • S01'
            return 'Westworld • S01E10'
        }
    }
}
</script>

<style scoped>
</style>
