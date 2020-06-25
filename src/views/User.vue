<template>
    <div>
        <header-bar :title="headerData.title" :to="headerData.to" :goBack="headerData.goBack" :loading="$store.state.loading.pageLoading"/>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import urlGenerate from '@/mixins/urlGenerate'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default {
    components: {
        'header-bar': HeaderBar,
    },
    mixins: [urlGenerate],
    data() {
        return {
            axiosRandom: '',
            tcResponse: {}
        }
    },
    computed: {
        id() { return this.$route.params.id },
        ownProfile() { return this.$store.state.auth.userId == this.id },
        name() { return this.tcResponse.user_data && this.tcResponse.user_data.name },
        headerData() {
            if(this.$route.name === 'user-profile') return { title: this.name, goBack: true }
            let data = { to: this.userUrl(this.$route.params.id) }
            if(this.$route.name === 'user-detail') data.title = `${this.name} > More Info`
            else if(this.$route.name === 'user-movieSeries') data.title = `${this.name} > ${this.$route.params.tab==='movie'?'Movies':'Series'}`
            else if(this.$route.name === 'user-comment') data.title = `${this.name} > Comments`
            else if(this.$route.name === 'user-user') data.title = `${this.name} > Followers & Following`
            return data
        }
    },
    watch: {
        '$route.params.id'() { this.getObjData() }
    },
    created() {
        console.log('user.vue created', this.$route)
        this.getObjData()
    },
    methods: {
        getObjData() {
            this.getTcData()
        },
        getTcData() {
            this.$store.dispatch('loading/startPageLoading')
            this.$store.dispatch('loading/startResponseWaiting')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.post(this.userDataUrl(), { id: this.id, interaction: this.ownProfile ? 'Watch Later' : 'Rate-5' })
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    console.log(response.data)
                    this.tcResponse = response.data
                    this.$store.dispatch('movieSeriesDataSets/setDataObject', this.tcResponse.user_data)
                    this.$store.dispatch('movieSeriesDataSets/setTcDataObject', this.tcResponse.movies)
                    this.$store.dispatch('movieSeriesDataSets/setTcDataObject2', this.tcResponse.series)
                    this.mergeReviews()
                    this.$store.dispatch('comments/setDataObject', this.tcResponse.movie_reviews)
                    this.$store.dispatch('users/setDataObject', this.tcResponse.friends)
                    this.$store.dispatch('users/setDataObject2', this.tcResponse.interaction_with_user)
                }
            }).catch(error => {
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading')
                this.$store.dispatch('loading/finishResponseWaiting')
            })
        },
        mergeReviews() {
            this.tcResponse.movie_reviews.data = [...this.tcResponse.movie_reviews.data, ...this.tcResponse.series_reviews.data, ...this.tcResponse.people_reviews.data].sort((a, b) => a.created_at > b.created_at ? -1 : 1)
        }
    }
}
</script>

<style scoped>
</style>
