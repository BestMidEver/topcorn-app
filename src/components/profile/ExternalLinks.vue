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
        facebookLink() { return this.externalIds && this.externalIds.facebook_id && `${process.env.VUE_APP_FACEBOOK_URL}/${this.externalIds.facebook_id}` },
        instagramLink() { return this.externalIds && this.externalIds.instagram_id && `${process.env.VUE_APP_INSTAGRAM_URL}/${this.externalIds.instagram_id}` },
        twitterLink() { return this.externalIds && this.externalIds.twitter_id && `${process.env.VUE_APP_TWITTER_URL}/${this.externalIds.twitter_id}` },
    }
}
</script>

<style scoped>
svg { font-size: 30px; }
</style>
