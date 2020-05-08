<template>
    <div>
        <div class="modal-header d-flex align-items-center border-bottom-0" style="min-height: 69px">
            <skeleton-loader v-if="justCreated" type="line" lineHeight="24px" class="w-75"/>
            <h6 class="modal-title">{{ heading }}<em class="small text-muted" v-if="year"> ({{ year }})</em></h6>
            <custom-button v-show="isTrue(previousItem)" type="back" class="btn-sm border-0 mt-0 px-lg-4 p-0" @click="goBack()" :disabled="$store.state.loading.responseWaiting"><div class="one-line">Back</div></custom-button>
        </div>
        <div class="position-relative">
            <img class="d-none" :src="previousSrc">
            <img v-if="imageLoading" class="img-fluid" :src="require('@/assets/9x16loading.png')"/>
            <img v-show="!imageLoading" class="img-fluid" :src="currentSrc" @load="imageLoading = false" @error="imageLoading = true">
            <img class="d-none" :src="nextSrc">
            <rubber-stamp :rateCode="rateCode"/>
        </div>
        <div class="modal-body">
            <div class="d-flex justify-content-center align-items-center">
                <five-star-button :rateCode.sync="rateCode"/>
            </div>
            <div v-show="voteType === 'vote + comment'" class="form-group mt-3">
                <textarea id="input_review" v-model="inputVal" rows="3" class="form-control" placeholder="Write a public comment"></textarea>
            </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-sm text-secondary border-0" @click="rateCode = 0" :disabled="$store.state.loading.responseWaiting">Skip</button>
            <button v-show="voteType === 'vote'" type="button" class="btn btn-sm text-secondary border-0" @click="voteType = 'vote + comment'" :disabled="$store.state.loading.responseWaiting">Vote with a comment</button>
            <button v-show="voteType === 'vote + comment'" type="button" class="btn btn-sm text-secondary border-0" @click="voteType = 'vote'; inputVal = review" :disabled="$store.state.loading.responseWaiting">Don't send</button>
            <button v-show="voteType === 'vote + comment'" type="button" class="btn btn-sm btn-primary border-0" @click="review = inputVal" :disabled="$store.state.loading.responseWaiting">Save</button>
        </div>
    </div>
</template>

<script>
import RubberStamp from '@/components/modals/voteModal/RubberStamp.vue'
import FiveStarButton from '@/components/modals/voteModal/FiveStarButton.vue'
import CustomButton from '@/components/CustomButton.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/mixins/arraysAndObjects'
import SkeletonLoader from '@/components/SkeletonLoader.vue'


Vue.use(VueAxios, axios)

export default {
    components: {
        'rubber-stamp': RubberStamp,
        'five-star-button': FiveStarButton,
        'custom-button': CustomButton,
        'skeleton-loader': SkeletonLoader,
    },
    props: {
    },
    data() {
        return {
            voteType0: 'vote',
            voteType: 'vote', // vote, vote + comment
            imageLoading: true,
            inputVal: '',
            rawData: [{}],
            justCreated: true
        }
    },
    computed: {
        previousItem() { return this.rawData[0] || {} },
        currentItem() { return this.rawData[1] || {} },
        nextItem() { return this.rawData[2] || {} },
        previousSrc() { return this.src(this.previousItem) },
        currentSrc() { return this.src(this.currentItem) },
        nextSrc() { return this.src(this.nextItem) },
        heading() {
            if(this.currentItem.title) return this.currentItem.title
            if(this.currentItem.name) return this.currentItem.name
        },
        year() {
            if(this.currentItem.release_date) return this.dateToYear(this.currentItem.release_date)
            if(this.currentItem.first_air_date) return this.dateToYear(this.currentItem.first_air_date)
        },
        rateCode: {
            get() {
                return this.currentItem.rate_code
            },
            set(val) {
                this.$store.dispatch('noModals/vote', { vote: val, type: 'movie', data: this.currentItem })
                .then(response => {
                    if(val === 5) this.getMovies(this.currentItem.id)
                    this.currentItem.rate_code = val >= 0 ? val : null
                    if(val === 0) this.goNext(0)
                    else if(this.voteType === 'vote') this.goNext()
                })
            }
        },
        review: {
            get() {
                return this.currentItem.review
            },
            set(val) {
                if(val == this.currentItem.review) return
                this.$store.dispatch('noModals/sendReview', {
                    type: 'movie',
                    data: this.currentItem,
                    review: val
                })
                .then(response => {
                    Vue.set(this.currentItem, 'review', val)
                    this.goNext()
                })
            }
        },
        queLength() { return this.rawData.length }
    },
    created() {
        this.getMovies()
    },
    methods: {
        getMovies(objId = '') {
            if(this.justCreated) this.$store.dispatch('loading/startResponseWaiting')
            axios.get(`${process.env.VUE_APP_API_URL}/getQuickVote/movie/${objId}`)
            .then(response => {
                this.rawData = [...this.rawData.slice(0, 3), ...response.data, ...this.rawData.slice(3)]
                this.rawData = this.distinctArrayOfObjects(this.rawData)
                if(this.justCreated) {
                    this.$store.dispatch('loading/finishResponseWaiting')
                    this.justCreated = false
                }
            })
        },
        src(data) {
            if(this.isTrue(data.cover_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${data.cover_path}`
            if(this.isTrue(data.backdrop_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${data.backdrop_path}`
            return '/wrong-url'
        },
        goNext(after = process.env.VUE_APP_DEMONSTRATION_TIME) {
            let vm = this
            this.$store.dispatch('loading/startResponseWaiting')
            setTimeout(() => {
                vm.rawData.shift()
                vm.$store.dispatch('loading/finishResponseWaiting')
            }, after)
        },
        goBack() { this.rawData = [{}, ...this.rawData] }
    },
    watch: {
        'currentItem.id'() {
            this.voteType = this.voteType0
            this.$store.dispatch('noModals/getUserReview', {
                type: 'movie',
                data: this.currentItem,
            })
            .then(response => {
                Vue.set(this.currentItem, 'review', response.data.review ? response.data.review : '')
            })
        },
        review(val) { this.inputVal = val },
        queLength(val) { if(val < 3) this.getMovies() }
    }
}
</script>

<style scoped>
.img-fluid {
    object-fit: cover;
    width: 100%;
}
</style>