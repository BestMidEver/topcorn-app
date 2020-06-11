<template>
    <div class="p-2 text-right badge-layer">
        <div v-if="cardType === 'valak'"><span class="badge btn-verydark text-white">91%</span></div>
        <div v-if="cardType === 'profile-movie-series-card-other-profile'">
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
        profileOwnerBan() { return this.data && this.data.user_ban_id }
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
