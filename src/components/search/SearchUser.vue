<template>
    <div>
        <cards :type="type" :tcData="tcResponse" :loading="$store.state.loading.pageLoading4" class="mt-2"/>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import lodash from 'lodash'
import Cards from '@/components/Cards.vue'
import urlGenerate from '@/mixins/urlGenerate'
 

Vue.use(lodash)
Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

export default {
    components: {
        'cards': Cards,
    },
    mixins: [urlGenerate],
    data() {
        const tcResponse = { current_page: 1, data: [], last_page: 0, total: 0 }
        return {
            type: 'person',
            tcResponse0: tcResponse,
            tcResponse: tcResponse,
            axiosRandom: ''
        } 
    },
    watch: {
        $route() { this.startdebouncingSearch() }
    },
    beforeMount() {
        this.startdebouncingSearch()
    },
    methods: {
        startdebouncingSearch() {
            this.$store.dispatch('loading/startPageLoading4')
            this.debouncingSearch()
        },
        debouncingSearch: lodash.debounce(function() {
            this.search()
        }, process.env.VUE_APP_DEBOUNCE_TIME),
        search() {
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.get(this.searchUserUrl(this.$route.params.pathMatch, this.$route.params.page))
            .then(response => {
                if(axiosRandom === this.axiosRandom) this.tcResponse = response.data
            }).catch(error => {
                this.tcResponse = this.tcResponse0
            }).then(() => { this.$store.dispatch('loading/finishPageLoading4') })
        }
    },
}
</script>

<style scoped>
</style>
