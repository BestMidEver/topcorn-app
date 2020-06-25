<template>
    <div class="btn-group-toggle" role="group">
        <button v-for="(user, i) in data" :key="i" class="btn btn-block btn-sm" :class="user.selected ? 'selected' : 'text-muted'" @click="toggleSelected(user)">
            <div class="d-flex align-items-center text-left">
                <div>
                    <img v-show="!thumbnailLoading" class="thumbnail-img" :src="thumbnailSrc(user)" @load="thumbnailLoading = false" @error="$event.target.src = require('@/assets/2x3loading.png')"/>
                    <img v-show="thumbnailLoading" class="thumbnail-img" :src="require('@/assets/2x3loading.png')"/>
                </div>
                <div class="flex-grow-1 px-2">
                    <div>{{ user.user_name }}</div>
                    <div>
                        <span v-if="user.later_id > 0" class="btn btn-sm p-0 text-warning" :class="user.rate_code > 0 ? 'mr-2' : ''"><font-awesome-icon :icon="['fas', 'clock']"/></span>
                        <five-star v-if="user.rate_code > 0" :rate="user.rate_code" class="d-inline" style="margin-left: 0px!important"/>
                        <span v-if="user.ban_id > 0" class="btn btn-sm p-0 text-danger" :class="(user.later_id > 0 || user.rate_code > 0) ? 'ml-2' : ''"><font-awesome-icon :icon="['fas', 'ban']"/></span>
                    </div>
                </div>
                <div>
                    <font-awesome-icon v-if="user.is_seen !== null" :icon="isSeenIcon(user.is_seen)"/>
                </div>
            </div>
        </button>
        <no-result v-if="data.length === 0" class="mt-0" expandStatus="compressed"/>
    </div>
</template>

<script>
import Vue from 'vue'
import FiveStar from '@/components/reviews/FiveStar.vue'
import NoResult from '@/components/NoResult.vue'


export default {
    components: {
        'five-star': FiveStar,
        'no-result': NoResult,
    },
    props: {
        data: [Array, Object]
    },
    data() {
        return {
            thumbnailLoading: true
        }
    },
    computed: {
    },
    methods: {
        toggleSelected(user) {
            Vue.set(user, 'selected', !user.selected)
        },
        isSeenIcon(isSeen) {
            switch (isSeen) {
                case 0: return ['fas', 'check']
                case 1: return ['fas', 'check-double']
                case 2: return ['fas', 'bookmark']
            }
        },
        thumbnailSrc(user) {
            let src = null
            if(user.profile_path) src = `${process.env.VUE_APP_TMDB_SMALL_THUMBNAIL_URL}${user.profile_path}`
            if(!src && user.facebook_profile_path) src = user.facebook_profile_path
            return src || require('@/assets/2x3loading.png')
        },
    }
}
</script>

<style scoped>
.selected {
    background: #5bc0eb;
    color: #fff;
}
.thumbnail-img {
    width: 46px;
    height: 46px;
    object-fit: cover;
    /* min-width: 46px; */
    border-radius: 46px;
}
</style>