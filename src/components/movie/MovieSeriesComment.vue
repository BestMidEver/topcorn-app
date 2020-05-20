<template>
    <div>
        <review-section :data="reviewData" :interactionData="interactionData" :type="type" :boundedTo="[`interactions/set${capitalizeFirstLetter(type)}Interaction`, 'movieSeriesDataSets/setDataObject', 'comments/setReview']" :isFullScreen="true"/>
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
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() {
        return {
            page: this.$route.params.page,
            axiosRandom: '',
        }
    },
    computed: {
        reviewData() { return this.$store.state.comments.dataObject },
        interactionData() { return this.$store.state.movieSeriesDataSets.dataObject },
    },
    watch: {
        '$route.params.page'(val) {
            if(val !== this.reviewData.current_page) this.getReviewPage()
        },
    },
    methods: {
        getReviewPage() {
            this.$store.dispatch('loading/startPageLoading2')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.get(this.reviewsDataUrl(this.type, this.$route.params.id, this.$route.params.page))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.$store.dispatch('comments/setDataObject', response.data)
                }
            }).catch(error => {
                this.$store.dispatch('comments/setDataObject', {})
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
            })
        }
    },
}
</script>

<style scoped>
</style>
