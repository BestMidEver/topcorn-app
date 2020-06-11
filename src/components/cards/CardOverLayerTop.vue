<template>
    <div class="custom-over-layer d-flex flex-column justify-content-center">
        <div class="d-flex flex-row justify-content-center">
            <div v-if="cardType === 'valak'" class="text-white">
                <small>Based on your taste</small>
                <span class="d-block"><span class="h5 text-warning">91%</span><small> match</small></span>
                <small><span class="h5 text-warning">352</span>/408 points</small>                                                                 
            </div>
            <div v-if="cardType && cardType.includes('profile-movie-series-card')" class="text-white">
                <template v-if="cardType === 'profile-movie-series-card-other-profile'">
                    <small>According to this user</small>
                    <div>
                        <span v-if="profileMovieSeriesCardLater" class="btn btn-sm p-0 text-warning" :class="profileMovieSeriesCardRate ? 'mr-2' : ''"><font-awesome-icon :icon="['fas', 'clock']"/></span>
                        <five-star v-if="profileMovieSeriesCardRate > 0" :rate="profileMovieSeriesCardRate" class="d-inline" style="margin-left: 0px!important"/>
                        <span v-if="profileMovieSeriesCardBan" class="btn btn-sm p-0 text-danger" :class="(profileMovieSeriesCardRate || profileMovieSeriesCardLater) ? 'ml-2' : ''"><font-awesome-icon :icon="['fas', 'ban']"/></span>
                    </div>
                </template>
                <small>Updated</small>
                <small class="d-block">{{ updatedAt }}</small>
            </div>
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
        profileMovieSeriesCardRate() { return this.data && this.data.user_rate_code },
        profileMovieSeriesCardLater() { return this.data && this.data.user_later_id },
        profileMovieSeriesCardBan() { return this.data && this.data.user_ban_id },
        updatedAt() { return this.data && this.data.updated_at }
    },
}
</script>

<style scoped>
.custom-over-layer {
    position: absolute;
    width: 100%;
    top: 0;
    height: 50%!important;
}
</style>
