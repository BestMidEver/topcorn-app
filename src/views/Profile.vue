<template>
    <div>
        <header-bar/>
        <div class="mb-2 mb-md-3">
            <tabs :items="tabs" class="mt-1" :active.sync="activeIndex" :class="activeIndex !== 0 ? 'bottom-line' : ''"/>
            <tabs v-show="activeIndex !== 0" :items="detailTabs" class="mt-1" :active.sync="detailActiveIndex"/>
        </div>
        <profile-cover-section v-if="activeIndex === 0" class="mt-md-4"/>
        <under-trailer-section v-if="activeIndex === 0" type="profile"/>
        <section-heading v-if="activeIndex === 0" title="Graphs"  :expandStatus="isExpanded ? 'expanded' : 'compressed'">
            <custom-button type="expand" iconSize="22px" :status="isExpanded ? 'active' : ''" class="btn-sm btn-block border-0 mt-0 px-lg-4"><div class="one-line">Show All</div></custom-button>
        </section-heading>
        <GChart v-if="activeIndex === 0" type="BarChart" :data="chartData" :options="chartOptions"/>
        <!-- <GChart v-if="activeIndex === 0" type="BarChart" :data="chartData1" :options="chartOptions1"/> -->
        <GChart v-if="activeIndex === 0" type="BarChart" :data="chartData2" :options="chartOptions2"/>
        <cards v-show="activeIndex !== 0" type="movie" :items="[]"/>
    </div>
</template>

<script>
import Cards from '@/components/Cards.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import ProfileCoverSection from '@/components/profile/ProfileCoverSection.vue'
import Tabs from '@/components/Tabs.vue'
import UnderTrailerSection from '@/components/movie/UnderTrailerSection.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'header-bar': HeaderBar,
        'profile-cover-section': ProfileCoverSection,
        'tabs': Tabs,
        'under-trailer-section': UnderTrailerSection,
        'cards': Cards,
        'section-heading': SectionHeading,
        'custom-button': CustomButton,
    },
    data: function() {
        return {
            tabs: ['Profile', 'Movies', 'Series', 'Lists', 'Comments', 'Users'],
            activeIndex: 0,
            detailTabs: ['Seen', 'Watch Later', 'Hidden'],
            detailActiveIndex: 0,
            isExpanded: false,
            chartData: [
                ['Movies', 'Count', { role: 'style' }],
                ['Legenday', 108, 'color: #28a745'],
                ['Good', 438, 'color: #17a2b8'],
                ['Not Sure', 149, 'color: #6c757d'],
                ['Bad', 61, 'color: #ffc107'],
                ['Garbage', 8, 'color: #dc3545'],
            ],
            chartOptions: {
                title: 'Seen Movies',
                legend: 'none'
            },
            chartData1: [
                ['Movies', 'Garbage', 'Bad', 'Not Sure', 'Good', 'Legendary'],
                ['2020s', 0, 0, 2, 4, 1],
                ['2010s', 1, 0, 8, 30, 3],
                ['2000s', 1, 3, 7, 20, 6],
                ['1990s', 1, 3, 7, 20, 6],
                ['1980s', 1, 3, 7, 20, 6],
                ['1970s', 1, 3, 7, 20, 6],
            ],
            chartOptions1: {
                title: 'Seen Movies',
                legend: 'none',
                isStacked: true,
                colors: ['#dc3545', '#ffc107', '#6c757d', '#17a2b8', '#28a745']
            },
            chartData2: [
                ['Series', 'Count', { role: 'style' }],
                ['Legenday', 12, 'color: #28a745'],
                ['Good', 65, 'color: #17a2b8'],
                ['Not Sure', 7, 'color: #6c757d'],
                ['Bad', 1, 'color: #ffc107'],
                ['Garbage', 0, 'color: #dc3545'],
            ],
            chartOptions2: {
                title: 'Seen Series',
                legend: 'none'
            },
        }
    }
}
</script>

<style scoped>
</style>
