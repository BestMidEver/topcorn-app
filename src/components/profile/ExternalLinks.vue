<template>
    <div>
        <a v-if="homePage" class="btn btn-link text-light btn-sm" data-toggle="tooltip" data-placement="top" title="Website" :href="homePage" target="_blank"><font-awesome-icon :icon="['fas', 'external-link-square-alt']"/></a>
        <a v-if="facebookLink" class="btn btn-link text-light btn-sm" data-toggle="tooltip" data-placement="top" title="Facebook Link" :href="facebookLink" target="_blank"><font-awesome-icon :icon="['fab', 'facebook-square']"/></a>
        <a v-if="instagramLink" class="btn btn-link text-light btn-sm" data-toggle="tooltip" data-placement="top" title="İnstagram Link" :href="instagramLink" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']"/></a>
        <a v-if="twitterLink" class="btn btn-link text-light btn-sm" data-toggle="tooltip" data-placement="top" title="Twitter Link" :href="twitterLink" target="_blank"><font-awesome-icon :icon="['fab', 'twitter-square']"/></a>
    </div>
</template>

<script>
export default {
    props: {
        externalIds: Object,
        homePage: String
    },
    computed: {
        facebookId() { return this.externalIds && (this.externalIds.facebook_link || (!this.externalIds.hasOwnProperty('facebook_link') && this.externalIds.facebook_id)) },
        facebookLink() { return this.facebookId && `${process.env.VUE_APP_FACEBOOK_URL}/${this.facebookId}` },
        instagramId() { return this.externalIds && (this.externalIds.instagram_id || this.externalIds.instagram_link) },
        instagramLink() { return this.instagramId && `${process.env.VUE_APP_INSTAGRAM_URL}/${this.instagramId}` },
        twitterId() { return this.externalIds && (this.externalIds.twitter_id || this.externalIds.twitter_link) },
        twitterLink() { return this.twitterId && `${process.env.VUE_APP_TWITTER_URL}/${this.twitterId}` },
    }
}
</script>

<style scoped>
svg { font-size: 30px; }
</style>
