<template>
    <div>
        <review-section :data="reviewData" :loading="$store.state.loading.pageLoading4" :interactionData="interactionData" type="person" :boundedTo="['comments/setReview', 'comments/setReview2']" :isFullScreen="true"/>
    </div>
</template>

<script>
import ReviewSection from '@/components/ReviewSection.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import urlGenerate from '@/mixins/urlGenerate'
 

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default {
    components: {
        'review-section': ReviewSection,
    },
    mixins: [urlGenerate],
    props: {
    },
    data() {
        return {
            page: this.$route.params.page,
            axiosRandom: '',
        }
    },
    computed: {
        reviewData() { return this.$store.state.comments.dataObject2 },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject2 },
    },
    watch: {
        '$route.params.page'(val) {
            if(val !== this.reviewData.current_page) this.getReviewPage()
        },
    },
    created() {
        this.getReviewPage()
    },
    methods: {
        getReviewPage() {
            this.$store.dispatch('loading/startPageLoading4')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.get(this.reviewsDataUrl('person', this.$route.params.id, this.$route.params.page))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.$store.dispatch('comments/setDataObject2', response.data)
                }
            }).catch(error => {
                this.$store.dispatch('comments/setDataObject2', {})
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading4')
            })
        }
    },
}
</script>

<style scoped>
</style>
