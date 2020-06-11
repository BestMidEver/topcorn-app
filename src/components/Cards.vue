<template>
    <div style="overflow: hidden;">
        <div v-show="loading" :class="containerClass" class="card-group no-gutters marginClass">
            <skeleton-loader v-for="i in 12" :key="i" :type="skeletonLoaderType"/>
        </div>
        <div v-show="!loading">
            <div :class="containerClass" class="card-group no-gutters marginClass">
                <template v-if="['movie', 'series'].includes(type)">
                    <movie-series-card v-for="card in results" :key="`card-${card.id}`" :data="card" :boundedTo="boundedTo" :type="type" :cardType="cardType"/>
                </template>
                <template v-else-if="type === 'person'">
                    <person-card v-for="(card, index) in results" :key="`card-${index}-${card.id}`" :data="card"/>
                </template>
                <template v-else-if="type === 'user'">
                    <user-card v-for="(card, index) in results" :key="`card-${index}-${card.id}`" :data="card"/>
                </template>
                <template v-else-if="type === 'list'">
                    <list-card v-for="card in results" :key="`card-${card.id}`" :data="card"/>
                </template>
                <template v-else-if="type === 'profile-image-card'">
                    <profile-image-card v-for="card in results" :key="`card-${card.file_path}`" :data="card"/>
                </template>
            </div>
            <pagination :expandStatus="expandStatus" :tmdbData="tmdbData" :tcData="tcData" :tcAllResults="tcAllResults" :itemPerPage="itemPerPage" :loading="loading"/>
        </div>
    </div>
</template>

<script>
import MovieSeriesCard from '@/components/cards/MovieSeriesCard.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import PersonCard from '@/components/cards/PersonCard.vue'
import UserCard from '@/components/cards/UserCard.vue'
import ListCard from '@/components/cards/ListCard.vue'
import ProfileImageCard from '@/components/cards/ProfileImageCard.vue'
import Pagination from '@/components/Pagination.vue'


export default {
    components: {
        'movie-series-card': MovieSeriesCard,
        'skeleton-loader': SkeletonLoader,
        'person-card': PersonCard,
        'user-card': UserCard,
        'list-card': ListCard,
        'profile-image-card': ProfileImageCard,
        'pagination': Pagination,
    },
    props: {
        type: String,
        tmdbData: Object,
        tcData: Object,
        tcAllResults: Array,
        boundedTo: Array,
        //isCardColumns: Boolean,
        cardType: String,
        expandStatus: {
            validator: value => ['expanded', 'compressed'].includes(value)
        },
        loading: Boolean
    },
    data() {
        return {
            itemPerPage: 24
        }
    },
    computed: {
        containerClass: function() {
            let containerClass = ''
            if(this.expandStatus) containerClass += this.expandStatus + ' '
            if(this.type) containerClass += this.type + ' '
            //containerClass += this.isCardColumns ? 'card-columns' : 'card-group no-gutters marginClass'
            return containerClass
        },
        results() {
            if(this.tmdbData) return this.tmdbData.results
            if(this.tcData) return this.tcData.data
            if(this.tcAllResults) { return this.paginate(this.tcAllResults, this.$route.params.page || 1, this.itemPerPage) }
        },
        skeletonLoaderType() {
            if(['person', 'user'].includes(this.type)) return 'small'
        },
    },
    methods: {
        paginate(array, page, itemPerPage){ return array.slice((page - 1) * itemPerPage, page * itemPerPage) },
    }
}
</script>

<style scoped>
.marginClass{ margin: -0.5rem -0.25rem 0px -0.25rem; }
.card-columns{ -webkit-column-gap: 0.5rem; -moz-column-gap: 0.5rem; column-gap: 0.5rem; }
.compressed.movie > div:nth-child(n+3), .compressed.series > div:nth-child(n+3), .compressed.list > div:nth-child(n+3), .compressed.profile-image-card > div:nth-child(n+2),
.compressed.person > div:nth-child(n+4), .compressed.user > div:nth-child(n+4){ display: none }
@media (min-width: 576px) {
    .compressed.person > div:nth-child(n), .compressed.user > div:nth-child(n){ display: block }
    .compressed.person > div:nth-child(n+5), .compressed.user > div:nth-child(n+5){ display: none }
}
@media (min-width: 768px) {
    .compressed.person > div:nth-child(n), .compressed.user > div:nth-child(n), .compressed.movie > div:nth-child(n), .compressed.series > div:nth-child(n), .compressed.list > div:nth-child(n), .compressed.list > div:nth-child(n), .compressed.profile-image-card > div:nth-child(n){ display: block }
    .compressed.movie > div:nth-child(n+4), .compressed.series > div:nth-child(n+4), .compressed.list > div:nth-child(n+4), .compressed.profile-image-card > div:nth-child(n+3),
    .compressed.person > div:nth-child(n+7), .compressed.user > div:nth-child(n+7){ display: none }
}
@media (min-width: 992px) {
    .compressed.movie > div:nth-child(n), .compressed.series > div:nth-child(n), .compressed.list > div:nth-child(n), .compressed.profile-image-card > div:nth-child(n){ display: block }
    .compressed.movie > div:nth-child(n+5), .compressed.series > div:nth-child(n+5), .compressed.list > div:nth-child(n+5), .compressed.profile-image-card > div:nth-child(n+4){ display: none }
}
@media (min-width: 1200px) {
    .compressed.movie > div:nth-child(n), .compressed.series > div:nth-child(n), .compressed.list > div:nth-child(n), .compressed.profile-image-card > div:nth-child(n){ display: block }
    .compressed.movie > div:nth-child(n+7), .compressed.series > div:nth-child(n+7), .compressed.list > div:nth-child(n+7), .compressed.profile-image-card > div:nth-child(n+5){ display: none }
}
</style>
