<template>
    <div class="p-2 text-right badge-layer">
        <!-- <div v-if="cardType === 'person-series-episode-count'"><span class="badge btn-verydark text-white">{{ episodeCount }}</span></div> -->
        <div v-if="cardType === 'movie-series-recommendation'"><span class="badge btn-verydark text-white">{{ matchRate }}</span></div>
        <div v-else-if="cardType === 'person-with-age' && ifLivedAge > 0"><span class="badge btn-verydark text-white">{{ ifLivedAge }}</span></div>
        <div v-else-if="cardType === 'profile-movie-series-card-other-profile'">
            <span class="badge btn-verydark text-white">
                <span v-if="profileOwnerWatchLater" class="btn btn-sm p-0 text-warning" :class="profileOwnerRate ? 'mr-2' : ''"><font-awesome-icon :icon="['fas', 'clock']"/></span>
                <five-star v-if="profileOwnerRate > 0" :rate="profileOwnerRate" class="d-inline" style="margin-left: 0px!important"/>
                <span v-if="profileOwnerBan" class="btn btn-sm p-0 text-danger" :class="(profileOwnerRate || profileOwnerWatchLater) ? 'ml-2' : ''"><font-awesome-icon :icon="['fas', 'ban']"/></span>
            </span>
        </div>
    </div>
</template>

<script>
import FiveStar from '@/components/reviews/FiveStar.vue'


export default {
    components: {
        'five-star': FiveStar,
    },
    props: {
        data: Object,
        cardType: String
    },
    computed: {
        profileOwnerRate() { return this.data && this.data.user_rate_code },
        profileOwnerWatchLater() { return this.data && this.data.user_later_id },
        profileOwnerBan() { return this.data && this.data.user_ban_id },
        matchRate() { return this.data && this.data.percent },
        //episodeCount() { return this.data && (this.data.episode_count > 0 && this.data.episode_count) },
        ifLivedAge() { return this.data && this.data.died_age && this.data.age || 0 },
    },
}
</script>

<style scoped>
.badge-layer {
    position: absolute;
    top: 0;
    right: 0;
}
.btn-verydark {
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3));
}
</style>
