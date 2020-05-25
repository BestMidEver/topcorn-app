<template>
    <div>
        <progress-bar/>
        <person-cover-section class="mt-md-3"/>
        <compressed-cards title="Movies" expandTitle="Show All" type="movie" :isFullScreen="false" top="mt-4"/>
        <compressed-cards title="Series" expandTitle="Show All" type="movie" :isFullScreen="false"/>
        <biography-section/>
        <compressed-cards title="Images" expandTitle="Show All" type="profile-image-card" :isFullScreen="false" :isCardColumns="true">
            <template slot="tabs">
                <tabs :items="imageTabs" class="mt-1" :active.sync="activeImage"/>
            </template>
        </compressed-cards>
        <review-section :isFullScreen="false"/>
        <!-- <tabs :items="tabs" class="mt-3" :active.sync="activeIndex"/>
        <div class="mt-3 mx-1">
            <template>
                <custom-dropdown :items="filterItems" :active.sync="activeFilter" iconType="filter" borderRadius="left"/>
                <custom-dropdown :items="sortItems" :active.sync="activeSort" iconType="sort" borderRadius="right"/>
                <small class="pl-2">50 movies</small>
            </template>
        </div>
        <cards :type="tabType[activeIndex]" :items="[]"/> -->
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import PersonCoverSection from '@/components/profile/PersonCoverSection.vue'
import CompressedCards from '@/components/CompressedCards.vue'
import BiographySection from '@/components/profile/BiographySection.vue'
import ReviewSection from '@/components/ReviewSection.vue'
import CustomDropDown from '@/components/CustomDropDown.vue'
import Tabs from '@/components/Tabs.vue'
/* import Cards from '@/components/Cards.vue' */


export default {
    components: {
        'progress-bar': ProgressBar,
        'person-cover-section': PersonCoverSection,
        'compressed-cards': CompressedCards,
        'review-section': ReviewSection,
        'biography-section': BiographySection,
        'custom-dropdown': CustomDropDown,
        'tabs': Tabs,
        /* 'cards': Cards, */
    },
    data: function() {
        return {
            imageTabs: ['Profile', 'Tagged'],
            activeImage: 1
            /* tabs: ['Movies', 'Series', 'Images', 'Reviews'],
            tabType: ['movie', 'series', 'image', 'review'],
            activeIndex: 0,
            filterItems: ['Acting', 'Directing', '_', 'All'],
            activeFilter: 'All',
            sortItems: ['Most Popular', 'Top Rated', 'Newest', 'A -> Z'],
            activeSort: 'Most Popular', */
        }
    }
}
</script>

<style scoped>
</style>
