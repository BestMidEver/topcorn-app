<template>
    <div id="vote-comment-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header" :class="{ 'border-bottom-0': !imageLoading }">
                    <router-link :to="pathTo" class="modal-title h6" style="color: var(--text-link-color)">{{ heading }}<em class="small text-muted" v-if="year"> ({{ year }})</em></router-link>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div v-show="!imageLoading" class="position-relative">
                    <img class="img-fluid" :src="src" @load="imageLoading = false" @error="imageLoading = true">
                    <rubber-stamp :rate="rateCode"/>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center align-items-center">
                        <five-star-button :rate.sync="rateCode"/>
                    </div>
                    <div v-show="voteType === 'vote + comment'" class="form-group mt-3">
                        <textarea id="input_review" v-model="inputVal" rows="3" class="form-control" placeholder="Write a public comment"></textarea>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-sm text-secondary border-0" @click="rateCode = -1" :disabled="$store.state.loading.responseWaiting">Haven't seen</button>
                    <button v-show="voteType === 'vote'" type="button" class="btn btn-sm text-secondary border-0" @click="voteType = 'vote + comment'" :disabled="$store.state.loading.responseWaiting">Vote with a comment</button>
                    <button v-show="voteType === 'vote + comment'" type="button" class="btn btn-sm text-secondary border-0" @click="voteType = 'vote'; inputVal = review" :disabled="$store.state.loading.responseWaiting">Don't send</button>
                    <button v-show="voteType === 'vote + comment'" type="button" class="btn btn-sm btn-primary border-0" @click="review = inputVal" :disabled="$store.state.loading.responseWaiting">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FiveStarButton from './FiveStarButton.vue'
import RubberStamp from './RubberStamp.vue'
import urlGenerate from '@/mixins/urlGenerate'


export default {
    components: {
        'five-star-button': FiveStarButton,
        'rubber-stamp': RubberStamp
    },
    mixins: [urlGenerate],
    data() {
        return {
            voteType0: 'vote',
            voteType: 'vote', // vote, vote + comment
            inputVal: '',
            imageLoading: true
        }
    },
    computed: {
        rateCode: {
            get() {
                return this.$store.state.modals.voteCommentData.rate_code
            },
            set(val) {
                this.$store.dispatch('modals/vote', { vote: val, hideModalAfter: this.voteType === 'vote' })
            }
        },
        review: {
            get() {
                return this.data.review
            },
            set(val) {
                $('#vote-comment-modal').modal('hide')
                if(val == this.data.review) return
                this.$store.dispatch('modals/sendReview', val)
            }
        },
        data() { return this.$store.state.modals.voteCommentData },
        boundedTo() { return this.$store.state.modals.voteCommentDataBoundedTo },
        heading() {
            if(this.data.title) return this.data.title
            if(this.data.name) return this.data.name
        },
        year() {
            if(this.data.release_date) return this.dateToYear(this.data.release_date)
            if(this.data.first_air_date) return this.dateToYear(this.data.first_air_date)
        },
        src() {
            if(this.isTrue(this.data.cover_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${this.data.cover_path}`
            if(this.isTrue(this.data.backdrop_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${this.data.backdrop_path}`
            this.imageLoading = true
        },
        pathTo() { return this.movieSeriesUrl(this.$store.state.modals.voteCommentDataType, this.data.id) },
    },
    watch: {
        pathTo() {
            this.voteType = this.voteType0
            this.$store.dispatch('modals/getUserReview')
        },
        review(val) { this.inputVal = val }
    },
}
</script>

<style scoped>
.img-fluid {
    object-fit: cover;
    width: 100%;
}
</style>