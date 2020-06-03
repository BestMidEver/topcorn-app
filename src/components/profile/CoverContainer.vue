<template>
    <div class="position-relative" style="overflow: auto;">
        <div v-show="ifCoverImage">
            <img class="img-fluid" :class="isFullScreen ? 'trailer-cover-full-screen' : 'trailer-cover'" :src="coverSrc" @load="coverImageLoading = false" @error="$event.target.src = require('@/assets/9x16loading.png')">
        </div>
        <img v-if="!ifCoverImage" class="w-100" :class="isFullScreen ? 'trailer-cover-full-screen' : 'trailer-cover'" :src="require('@/assets/9x16loading.png')"/>
        <div class="card-img-overlay p-0">
            <div class="h-100 d-flex flex-column justify-content-center">
                <div class="d-flex flex-row justify-content-center justify-content-md-start mx-3 mb-md-0" :class="isAnyLink ? 'mb-5' : ''">
                    <div class="d-flex flex-column">
                        <div v-show="ifProfileImage">
                            <img class="img-thumbnail profile-pic" :src="profileSrc" @load="profileImageLoading = false" @error="$event.target.src = require('@/assets/2x3loading.png')">
                        </div>
                        <img v-if="!ifProfileImage" class="img-thumbnail profile-pic w-100" :src="require('@/assets/2x3loading.png')"/>
                    </div>
                    <div class="d-flex flex-column justify-content-center text-light">
                        <div class="d-flex flex-row align-items-center ml-2">
                            <slot name="right-text-first-row"></slot>
                        </div>
                        <div class="d-flex flex-row align-items-center text-light ml-2">
                            <slot name="right-text-second-row"></slot>
                        </div>
                        <div class="d-flex flex-row align-items-center text-light ml-2">
                            <slot name="right-text-third-row"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isAnyLink" class="right-bottom">
                <external-links :externalIds="externalIds" :homePage="homePage"/>
            </div>
            <div v-if="isOwnProfile || !isFullScreen" class="right-top">
                <router-link v-if="!isFullScreen && !pageLoading" :to="personUrl($route.params.id, 'detail')" replace type="text" class="btn-sm btn-block border-0 text-white one-line"><div>More Info</div></router-link>
                <router-link v-if="isOwnProfile" to="/profile"><font-awesome-icon class="text-white" :icon="['fas', 'cog']"/></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import ExternalLinks from './ExternalLinks.vue'


export default {
    components: {
        'external-links': ExternalLinks,
    },
    mixins: [urlGenerate],
    props: {
        coverSrc: String,
        profileSrc: String,
        isOwnProfile: Boolean,
        type: {
            validator: value => ['small'].includes(value)
        },
        links: Object,
        isFullScreen: Boolean,
        externalIds: Object,
        homePage: String
    },
    data: function() {
        return {
            coverImageLoading: true,
            profileImageLoading: true,
        }
    },
    computed: {
        pageLoading() { return this.$store.state.loading.pageLoading },
        isAnyLink() { return this.isFullScreen },
        ifCoverImage() { return !this.coverImageLoading && !this.pageLoading },
        ifProfileImage() { return !this.profileImageLoading && !this.pageLoading }
    },
    watch: {
    }
}
</script>

<style scoped>
.trailer-cover {
    object-fit: cover;
    width: 100%;
    min-height: 200px;
    max-height: 200px;
    filter: brightness(40%);
}
.trailer-cover-full-screen {
    object-fit: cover;
    width: 100%;
    min-height: 300px;
    max-height: 300px;
    filter: brightness(40%);
}
.profile-pic {
    object-fit: cover;
    width: 100px;
    min-width: 100px;
    height: 100px;
    border-radius: 100px;
}
.right-bottom {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
}
.right-top {
    position: absolute;
    right: 1rem;
    top: 0.8rem;
}
@media (min-width: 768px) {
    .profile-pic {
        width: 170px;
        min-width: 170px;
        height: 170px;
    }
}
</style>
