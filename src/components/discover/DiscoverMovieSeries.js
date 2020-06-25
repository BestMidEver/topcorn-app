import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import urlGenerate from '@/mixins/urlGenerate'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default {
    mixins: [urlGenerate],
    data() {
        const minMatchRateObject = { type: 'custom-select', effect: 'filter-attribute', request: 'min_match_rate', attributes: [100, 95, 90, 85, 80, 75, 70], items: ['%100', '%95', '%90', '%85', '%80', '%75', '%70'], default: '%80', title: 'Minimum Matching Rate' }
        return {
            axiosRandom: '',
            data: {},
            minMatchRateObject: minMatchRateObject,
            matchRateObject: this.$route.query.Retrieve === 'All' ? [] : [minMatchRateObject],
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        requestData() { return { type: this.type, ...this.filterRequest } },
        interactionFilterObject2() { this.interactionFilterObject.default = ['Already Seen', 'Hidden']; return this.interactionFilterObject },
        voteCountFilterObject2() { this.voteCountFilterObject.default = 50; return this.voteCountFilterObject },
    },
    methods: {
        getData() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.post(this.discoverUrl(this.$route.params.page), this.requestData)
            .then(response => {
                if(axiosRandom === this.axiosRandom && this.type === this.$route.name.split('-')[1]) {
                    this.data = response.data
                }
            }).catch(error => {
                this.data = {}
            }).then(() => {
                if(axiosRandom === this.axiosRandom && this.type === this.$route.name.split('-')[1]) { this.$store.dispatch('loading/finishPageLoading') }
            })
        },
        setFiltersToPopularTaste() { this.sortObject = this.popularTasteSortObject; this.matchRateObject = [] },
        setFiltersToBasedOnMyTaste() { this.sortObject = this.basedOnMyTasteSortObject; this.matchRateObject = [this.minMatchRateObject] },
        filterChanged(filter) {
            if(filter.request === 'retrieve') {
                if(filter.selected === 'All') { this.setFiltersToPopularTaste() }
                else { this.setFiltersToBasedOnMyTaste() }
            }
        },
        filtersReset() { this.setFiltersToBasedOnMyTaste() }
    }
}