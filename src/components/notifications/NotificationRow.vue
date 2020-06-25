<template>
    <div class="bottom-line d-flex pl-2 py-2 pr-1 d-flex align-items-center">
        <div class="thumbnail">
            <router-link v-if="toThumbNail" :to="toThumbNail">
                <img v-show="!thumbnailLoading" class="thumbnail-img" :src="thumbnailSrc" @load="thumbnailLoading = false"/>
                <img v-show="thumbnailLoading" class="thumbnail-img" :src="require('@/assets/2x3loading.png')"/>
            </router-link>
            <span v-else-if="thumbnailIcon" class="thumbnail-img d-flex align-items-center justify-content-center">
                <font-awesome-icon :icon="thumbnailIcon" :class="thumbnailClass"/>
            </span>
            <img v-else class="thumbnail-img" :src="thumbnailSrc"/>
        </div>
        <div class="content flex-grow-1 px-2 small">
            <div>
                <router-link v-if="subjectName" :to="toThumbNail" class="text-dark link">{{ subjectName }} </router-link>
                <span>{{ text1 }} </span>
                <router-link v-if="objectName" :to="toObject" class="text-dark link">{{ objectName }} </router-link>
                <span v-if="text2">{{ text2 }} </span>
                <em v-if="comment">{{ comment }} </em>
                <span class="text-muted">{{ timeAgo }} </span>
            </div>
        </div>
        <div class="object">
            <router-link v-if="toObject" :to="toObject">
                <span v-if="objectIcon" class="object-img d-flex align-items-center justify-content-center"><font-awesome-icon :icon="objectIcon" class="text-muted"/></span>
                <div v-else>
                    <img v-show="!objectLoading" class="object-img" :src="objectSrc" @load="objectLoading = false"/>
                    <img v-show="objectLoading" class="object-img" :src="require('@/assets/2x3loading.png')"/>
                </div>
            </router-link>
            <span v-else class="object-img d-flex align-items-center justify-content-center"><font-awesome-icon :icon="objectIcon" class="text-muted"/></span>
        </div>
        <div class="ml-1">
            <custom-button type="bookmark" class="border-0" :status="saveButtonStatus" style="height: 50px; width: 42px" @click="save()" :disabled="$store.state.loading.responseWaiting"/>
        </div>
    </div>
</template>

<script>
import CardContainer from '@/components/cards/CardContainer.vue'
import CustomButton from '@/components/CustomButton.vue'
import urlGenerate from '@/mixins/urlGenerate'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default {
    components: {
        'card-container': CardContainer,
        'custom-button': CustomButton,
    },
    mixins: [urlGenerate],
    props: {
        data: Object,
    },
    data() {
        return {
            axiosRandom: '',
            thumbnailLoading: true,
            objectLoading: true
        }
    },
    computed: {
        notification() { return this.data.notification },
        notificationData() { return this.notification.data[0] },
        toThumbNail() {
            switch (this.notificationData.type) {
                case 'Share Series': 
                case 'Share Movie': 
                case 'Review Like Person':
                case 'Review Like Series':
                case 'Review Like Movie':
                case 'Started Following': return this.userUrl(this.notificationData.user_id)
            }
        },
        thumbnailSrc() {
            switch (this.notificationData.type) {
                case 'New Feature': return require('@/assets/150x150logo.png')
                default: 
                    let src = null
                    if(this.notificationData.profile_path) src = `${process.env.VUE_APP_TMDB_SMALL_THUMBNAIL_URL}${this.notificationData.profile_path}`
                    if(!src && this.notificationData.facebook_profile_path) src = this.notificationData.facebook_profile_path
                    return src || require('@/assets/2x3loading.png')
            }
        },
        thumbnailIcon() {
            switch (this.notificationData.type) {
                case 'Air Date Changed': return ['far', 'clock']
                case 'Airing Today': return ['fas', 'clock']
            }
        },
        thumbnailClass() {
            switch (this.notificationData.type) {
                case 'Air Date Changed': return 'text-muted'
                case 'Airing Today': return 'text-muted'
            }
        },
        subjectName() {
            switch (this.notificationData.type) {
                default: return this.notificationData.user_name
            }
        },
        text1() {
            switch (this.notificationData.type) {
                case 'Share Series': return `shared a series: `
                case 'Share Movie': return `shared a movie: `
                case 'Review Like Person':
                case 'Review Like Series':
                case 'Review Like Movie': return `${this.notification.total > 1 ? (this.notification.total == 2 ? 'and 1 other user ' : `and ${this.notification.total - 1} other users `) : ''}liked your comment about `
                case 'Started Following': return `started following you. `
                case 'New Feature': return this.notificationData.notification
                case 'Air Date Changed': return 'Next episode air date of '
                case 'Airing Today': return 'New episode of '
            }
        },
        objectName() {
            switch (this.notificationData.type) {
                case 'Share Series':
                case 'Share Movie':
                case 'Review Like Series':
                case 'Review Like Movie': return this.notificationData.title
                case 'Review Like Person': return this.notificationData.name
                case 'Airing Today':
                case 'Air Date Changed': return this.notificationData.original_title
            }
        },
        toObject() {
            switch (this.notificationData.type) {
                case 'Review Like Series':
                case 'Share Series': return this.movieSeriesUrl('series', this.notificationData.obj_id)
                case 'Review Like Movie':
                case 'Share Movie': return this.movieSeriesUrl('movie', this.notificationData.obj_id)
                case 'Review Like Person': return this.personUrl(this.notificationData.obj_id)
                case 'Airing Today':
                case 'Air Date Changed': return this.movieSeriesUrl('series', this.notificationData.obj_id)
            }
        },
        text2() {
            switch (this.notificationData.type) {
                case 'Air Date Changed': return this.notificationData.day_difference_next > 0 ? ` is ${this.notificationData.day_difference_next} later.` : ' was defined.'
                case 'Airing Today': return this.notificationData.day_difference_update > 1 ? ' aired.' : ' is airing today.'
            }
        },
        comment() {
            switch (this.notificationData.type) {
                case 'Review Like Person':
                case 'Review Like Movie':
                case 'Review Like Series': return `“${this.notificationData.review.length > 200 ? this.notificationData.review.substring(0, 200) + '...' : this.notificationData.review}” `
            }
        },
        timeAgo() { return this.data.time_ago },
        objectSrc() { return this.notificationData.poster_path ? `${process.env.VUE_APP_TMDB_SMALL_THUMBNAIL_URL}${this.notificationData.poster_path}` : null },
        objectIcon() {
            switch (this.notificationData.type) {
                case 'Started Following': return ['fa', 'user']
                case 'New Feature': return [this.notificationData.icon.split(' ')[0], this.notificationData.icon.split('fa-')[1]]
            }
        },
        saveButtonStatus() { return this.data.is_seen == 2 ? 'active' : '' }
    },
    methods: {
        save() {
            this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            const futureIsSeen = this.saveButtonStatus === 'active' ? 1 : 2
            axios.post(this.changeNotificationMode(), { id: this.data.id, mode: futureIsSeen })
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.data.is_seen = futureIsSeen
                }
            }).catch(error => {
            }).then(() => { this.$store.dispatch('loading/finishResponseWaiting') })
        },
    }
}
</script>

<style scoped>
.thumbnail-img {
    width: 46px;
    height: 46px;
    object-fit: cover;
    /* min-width: 46px; */
    border-radius: 46px;
}
.object-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
.link { font-weight: 600 }
svg { font-size: 25px; }
</style>