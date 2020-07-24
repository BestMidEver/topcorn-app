<template>
    <div>
        <div class="modal-header d-flex align-items-center border-bottom-0 bg-white" style="min-height: 56px"><!-- 69px -->
            <skeleton-loader v-if="$store.state.loading.pageLoading" type="line" lineHeight="24px" class="w-75"/>
            <router-link :to="movieSeriesUrl(type, currentItem.id)" class="modal-title h6" style="color: var(--text-link-color)">{{ heading }}<em class="small text-muted" v-if="year"> ({{ year }})</em></router-link>
            <custom-button v-show="isTrue(previousItem)" type="back" class="btn-sm border-0 mt-0 px-lg-4 py-0 pr-0 pl-2" @click="goBack()" :disabled="buttonDisabled"/><!-- <div class="one-line">Back</div></custom-button> -->
        </div>
        <div class="position-relative" style="margin: 0 -1px">
            <img class="d-none" :src="previousSrc">
            <img v-if="imageLoading" class="img-fluid" :src="require('@/assets/9x16loading.png')"/>
            <img v-show="!imageLoading" class="img-fluid" :src="currentSrc" @load="imageLoading = false" @error="imageLoading = true">
            <img class="d-none" :src="nextSrc">
            <rubber-stamp :rate="rateCode"/>
        </div>
        <div class="modal-body bg-white">
            <div class="d-flex justify-content-center align-items-center">
                <five-star-button :rate.sync="rateCode"/>
            </div>
            <div v-show="voteType === 'vote + comment'" class="form-group mt-3">
                <textarea id="input_review" v-model="inputVal" rows="3" class="form-control" placeholder="Write a public comment"></textarea>
            </div>
        </div>
        <div class="modal-footer d-flex justify-content-between bg-white">
            <button type="button" class="btn btn-sm text-secondary border-0" @click="rateCode = 0" :disabled="buttonDisabled">Skip</button>
            <button v-show="voteType === 'vote'" type="button" class="btn btn-sm text-secondary border-0" @click="voteType = 'vote + comment'" :disabled="buttonDisabled">Vote with a comment</button>
            <button v-show="voteType === 'vote + comment'" type="button" class="btn btn-sm text-secondary border-0" @click="voteType = 'vote'; inputVal = review" :disabled="buttonDisabled">Don't send</button>
            <button v-show="voteType === 'vote + comment'" type="button" class="btn btn-sm btn-primary border-0" @click="review = inputVal" :disabled="buttonDisabled">Save</button>
        </div>
    </div>
</template>

<script>
import RubberStamp from '@/components/modals/voteModal/RubberStamp.vue'
import FiveStarButton from '@/components/modals/voteModal/FiveStarButton.vue'
import CustomButton from '@/components/CustomButton.vue'
import Vue from 'vue'
import arraysAndObjects from '@/mixins/arraysAndObjects'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import urlGenerate from '@/mixins/urlGenerate'


function initialState (){
    return {
        voteType0: 'vote',
        voteType: 'vote', // vote, vote + comment, comment
        imageLoading: true,
        inputVal: '',
        rawData: [{}],
        axiosRandom: ''
    }
}

export default {
    components: {
        'rubber-stamp': RubberStamp,
        'five-star-button': FiveStarButton,
        'custom-button': CustomButton,
        'skeleton-loader': SkeletonLoader,
    },
    mixins: [arraysAndObjects, urlGenerate],
    props: {
        type: { validator: value => ['movie', 'series'].includes(value) },
    },
    data() { return initialState() },
    computed: {
        buttonDisabled() { return this.$store.state.loading.responseWaiting || this.$store.state.loading.pageLoading2 },
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
                this.$store.dispatch('noModals/vote', { vote: val, type: this.type, data: this.currentItem })
                .then(response => {
                    if(val === 5) this.getItems(this.currentItem.id)
                    this.currentItem.rate_code = val >= 0 ? val : null
                    /* if(val === 0) this.goNext(0)
                    else  */if(this.voteType === 'vote' || val === 0) this.goNext()
                })
            }
        },
        review: {
            get() {
                return this.currentItem.review
            },
            set(val) {
                if(val == this.currentItem.review) { this.goNext(); return }
                this.$store.dispatch('noModals/sendReview', {
                    type: this.type,
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
    watch: {
        type() {
            Object.assign(this.$data, initialState())
            this.getItemsFirstTime()
        },
        'currentItem.id'() {
            this.voteType = this.voteType0
            this.$store.dispatch('noModals/getUserReview', {
                type: this.type,
                data: this.currentItem,
            })
            .then(response => {
                Vue.set(this.currentItem, 'review', response.data.review ? response.data.review : '')
            })
        },
        review(val) { this.inputVal = val },
        queLength(val) { if(val < 3) this.getItems() }
    },
    created() {
        this.getItemsFirstTime()
    },
    methods: {
        getItemsFirstTime() {
            this.$store.dispatch('loading/startPageLoading')
            this.getItems()
        },
        getItems(objId = '') {
            if(this.$store.state.loading.pageLoading) this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/get', `${process.env.VUE_APP_API_URL}/getQuickVote/${this.type}/${objId}`)
            .then(response => {
                if(axiosRandom !== this.axiosRandom) return
                this.rawData = [...this.rawData.slice(0, 3), ...response.data, ...this.rawData.slice(3)]
                this.rawData = this.distinctArrayOfObjects(this.rawData)
                if(this.$store.state.loading.pageLoading) {
                    this.$store.dispatch('loading/finishResponseWaiting')
                    this.$store.dispatch('loading/finishPageLoading')
                    this.$store.dispatch('loading/finishPageLoading2')
                }
            })
        },
        src(data) {
            if(this.isTrue(data.cover_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${data.cover_path}`
            if(this.isTrue(data.backdrop_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${data.backdrop_path}`
            return require('@/assets/9x16loading.png')
        },
        goNext(after = process.env.VUE_APP_DEMONSTRATION_TIME) {
            this.$store.dispatch('loading/startPageLoading2')
            let vm = this
            this.$store.dispatch('loading/startResponseWaiting')
            setTimeout(() => {
                vm.rawData.shift()
                vm.$store.dispatch('loading/finishResponseWaiting')
                this.$store.dispatch('loading/finishPageLoading2')
            }, after)
        },
        goBack() { this.rawData = [{}, ...this.rawData] }
    }
}
</script>

<style scoped>
.img-fluid {
    object-fit: cover;
    width: 100%;
}
</style>