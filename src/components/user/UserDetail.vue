<template>
    <div>
        <user-cover-section :detailedData="userData" class="mt-md-4" :isFullScreen="true" :pageLoading="$store.state.loading.pageLoading2"/>
    </div>
</template>

<script>
import UserCoverSection from '@/components/user/UserCoverSection.vue'
import urlGenerate from '@/mixins/urlGenerate'


export default {
    components: {
        'user-cover-section': UserCoverSection,
    },
    mixins: [urlGenerate],
    props: {
    },
    data() {
        return {
            axiosRandom: '',
            userData: {}
        }
    },
    created() {
        this.getDetailData()
    },
    methods: {
        getDetailData() {
            this.$store.dispatch('loading/startPageLoading2')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/get', this.userDetailDataUrl(this.$route.params.id))
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.userData = response.data
                }
            }).catch(error => {
                this.userData = {}
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
            })
        }
    },
}
</script>

<style scoped>
</style>
