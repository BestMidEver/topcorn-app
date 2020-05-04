<template>
    <div class="position-relative" style="overflow: auto;">
        <img class="img-fluid trailer-cover" :src="coverSrc">
        <div class="card-img-overlay p-0">
            <div class="h-100 d-flex flex-column justify-content-center">
                <div class="d-flex flex-row justify-content-center justify-content-md-start mx-3 mb-md-0" :class="isAnyLink ? 'mb-5' : ''">
                    <div class="d-flex flex-column">
                        <img class="img-thumbnail profile-pic" :src="profileSrc">
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
                <div>
                    <a class="btn btn-link text-light btn-sm ng-scope" data-toggle="tooltip" data-placement="top" title="Facebook Link" href="https://www.facebook.com/CarrieAnneMossOfficial"><font-awesome-icon :icon="['fab', 'facebook-square']"/></a>
                    <a class="btn btn-link text-light btn-sm ng-scope" data-toggle="tooltip" data-placement="top" title="İnstagram Link" href="https://www.instagram.com/carrieannemoss"><font-awesome-icon :icon="['fab', 'instagram']"/></a>
                    <a class="btn btn-link text-light btn-sm ng-scope" data-toggle="tooltip" data-placement="top" title="Twitter Link" href="https://twitter.com/annapurnaliving"><font-awesome-icon :icon="['fab', 'twitter-square']"/></a>
                </div>
            </div>
            <div v-if="isOwnProfile" class="right-top">
                <router-link to="/profile"><font-awesome-icon class="text-white" :icon="['fas', 'cog']"/></router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        coverSrc: String,
        profileSrc: String,
        isOwnProfile: Boolean,
        type: {
            validator: value => ['small'].includes(value)
        },
    },
    data: function() {
        return {
            isAnyLink: true
        }
    },
    computed: {
        cardClass: function() {
        }
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
.right-bottom svg { font-size: 30px; }
@media (min-width: 768px) {
    .profile-pic {
        width: 170px;
        min-width: 170px;
        height: 170px;
    }
}
</style>
