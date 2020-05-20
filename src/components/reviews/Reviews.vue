<template>
    <div :class="expandStatus">
        <template v-if="loading">
            <review-skeleton v-for="i in 12" :key="i" :class="i === 0 ? 'mt-3' : 'mt-4'"/>
        </template>
        <template v-if="!loading" class="reviews">
            <review v-for="(review, index) in results" :key="index" :data="review" :boundedTo="boundedTo" :class="index === 0 ? 'mt-3' : 'mt-4'"></review>
            <pagination :expandStatus="expandStatus" :tcData="data"/>
        </template>
    </div>
</template>

<script>
import Review from '@/components/reviews/Review.vue'
import Pagination from '@/components/Pagination.vue'
import ReviewSkeleton from '@/components/reviews/ReviewSkeleton.vue'


export default {
    components: {
        'review': Review,
        'pagination': Pagination,
        'review-skeleton': ReviewSkeleton,
    },
    props: {
        expandStatus: {
            validator: value => ['expanded', 'compressed'].includes(value)
        },
        data: Object,
        loading: Boolean,
        boundedTo: Array
    },
    computed: {
        results() { return this.data.data },
    },
}
</script>

<style scoped>
.compressed > div:nth-child(n+3){
    display: none!important
}
</style>
