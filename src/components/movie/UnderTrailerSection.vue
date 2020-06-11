<template>
    <div class="d-flex flex-wrap justify-content-between">
        <div v-if="['movie', 'series', 'season', 'episode'].includes(type)" class="px-3 px-md-1">
            <div class="d-flex flex-column">
                <div class="d-flex align-items-center" style="min-height: 56px">
                    <skeleton-loader v-if="$store.state.loading.pageLoading2 || $store.state.loading.pageLoading" type="line" lineHeight="24px" style="width: 400px; max-width: 70vw"/>
                    <h1 v-else class="h5 pb-2 pt-3">{{ title }}</h1>
                </div>
            </div>
        </div>
        <div v-if="allowedButtons.length > 0" class="d-flex flex-column mt-1 px-1 ml-auto" :class="allowedButtons.length == 1 ? 'col' : 'col-12 col-md-auto'">
            <div id="under-trailer-button-container" class="d-flex flex-row text-center" :class="allowedButtons.length == 1 ? 'justify-content-end' : 'justify-content-between'">
                <custom-button v-if="isButtonAllowed('watch-later')" type="watch-later" :style="{order: calcButtonIndex('watch-later')}" :borderRadius="calcButtonBorderRadius('watch-later')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :status="watchLaterStatus" @click="$store.dispatch('noModals/watchLater', { data: data, boundedTo: boundedTo, type: type })" :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Watch Later</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('seen')" type="seen" :style="{order: calcButtonIndex('seen')}" :borderRadius="calcButtonBorderRadius('seen')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :status="seenStatus" @click="$store.dispatch('modals/openVoteComment', { data: data, boundedTo: boundedTo, type: type, voteCommentType: 'vote' })" :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Seen</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('ban')" type="ban" :style="{order: calcButtonIndex('ban')}" :borderRadius="calcButtonBorderRadius('ban')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :status="banStatus" @click="$store.dispatch('noModals/ban', { data: data, boundedTo: boundedTo, type: type })" :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Hide</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('share')" type="share" :style="{order: calcButtonIndex('share')}" :borderRadius="calcButtonBorderRadius('share')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Share</div>
                </custom-button>
                <!-- <custom-button v-if="isButtonAllowed('vote')" type="seen" :style="{order: calcButtonIndex('vote')}" :borderRadius="calcButtonBorderRadius('vote')" iconSize="22px" status="active5" class="btn-sm btn-block border-0 mt-0 px-0"
                    :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Vote</div>
                </custom-button> -->
                <custom-button v-if="isButtonAllowed('last-seen')" type="last-seen" :style="{order: calcButtonIndex('last-seen'), 'min-width': '80px'}" :borderRadius="calcButtonBorderRadius('last-seen')" iconSize="22px" class="btn-sm border-0 mt-0 px-0"
                    :status="lastSeenStatus" @click="$store.dispatch('noModals/lastSeen', { data: data, boundedTo: boundedTo, lastSeenData: lastSeenData })" :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Last Seen</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('edit')" type="edit" :style="{order: calcButtonIndex('edit')}" :borderRadius="calcButtonBorderRadius('edit')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Comment</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('follow')" type="follow" :style="{order: calcButtonIndex('follow')}" :borderRadius="calcButtonBorderRadius('follow')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :status="followStatus" @click="$store.dispatch('noModals/follow', { data: data, boundedTo: boundedTo })" :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Following</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('bell')" type="bell" :style="{order: calcButtonIndex('bell')}" :borderRadius="calcButtonBorderRadius('bell')" iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-0"
                    :status="notifyByStatus" @click="$store.dispatch('noModals/getNotified', { data: data, boundedTo: boundedTo, type: type })" :disabled="$store.state.loading.responseWaiting">
                    <div class="one-line">Get Notified</div>
                    <div class="one-line">(Bumper To Bumper)</div>
                </custom-button>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import seriesComputeds from './seriesComputeds.js'


export default {
    components: {
        'custom-button': CustomButton,
        'skeleton-loader': SkeletonLoader,
    },
    mixins: [seriesComputeds],
    props: {
        title: String,
        type: {
            validator: value => ['movie', 'series', 'season', 'episode', 'user'].includes(value)
        },
        boundedTo: Array,
        data: Object
    },
    data: function() {
        return {
            allowedItems: {
                'movie': ['watch-later', 'seen', 'ban', 'share'],
                'series': ['watch-later', 'seen', 'ban', 'share'],
                'season': ['last-seen'],
                'episode': ['last-seen'],
                'user': ['follow', 'bell']
            },
        }
    },
    computed: {
        allowedButtons: function () { return this.allowedItems[this.type] },
        watchLaterStatus() { return !this.$store.state.loading.responseWaiting && this.data.later_id > 0 ? 'active' : '' },
        seenStatus() { return !this.$store.state.loading.responseWaiting && this.data.rate_code > 0 ? `active${this.data.rate_code}` : '' },
        banStatus() { return !this.$store.state.loading.responseWaiting && this.data.ban_id > 0 ? 'active' : '' },
        lastSeenStatus() { return !this.$store.state.loading.responseWaiting && this.data.seen_id > 0 ? 'active' : '' },
        followStatus() { return !this.$store.state.loading.responseWaiting && this.data.following_id > 0 ? 'active' : '' },
        notifyByStatus() { return !this.$store.state.loading.responseWaiting && this.data.notified_by_id > 0 ? 'active' : '' },
        seriesData() { return this.$store.state.movieSeriesDataSets.dataObject2 },
        lastSeenData() {
            const nextSeason = this.seasonNumber + 1 > this.seriesData.number_of_seasons ? null : this.seasonNumber + 1
            return { 
                last_seen_season: this.seasonNumber,
                last_seen_episode: this.episodeNumber,
                air_date: this.detailedType === 'season' ? this.seasonData.air_date : this.episodeData.air_date,
                next_season: this.detailedType === 'season' ? nextSeason : (this.episodeNumber + 1 > this.seasonData.episodes.length ? nextSeason : this.seasonNumber),
                next_episode: this.detailedType === 'season' ? (nextSeason ? 1 : null) : (this.episodeNumber + 1 > this.seasonData.episodes.length ? (nextSeason ? 1 : null) : this.episodeNumber + 1)
            }
        }

    },
    methods: {
        isButtonAllowed(buttonType) { return this.allowedButtons.includes(buttonType) },
        calcButtonIndex(buttonType) { return this.allowedButtons.indexOf(buttonType) },
        calcButtonBorderRadius(buttonType) {
            const buttonIndex = this.calcButtonIndex(buttonType)
            const length = this.allowedButtons.length
            if(buttonIndex === 0) return 'left'
            if(buttonIndex === length -1) return 'right'
            return 'none'
        },
    }
}
</script>

<style scoped>
svg{ font-size: 22px; }
@media (min-width: 768px) {
    .btn-block { min-width: 80px; }
}
</style>
