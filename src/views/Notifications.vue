<template>
    <div>
        <header-bar title="Notifications" :goBack="true"/>
        <filter-sorter :filters="filters" :selectedFilters="selectedFilters" class="bottom-line"/>
        <notifications-container :data="data"/>
    </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import FilterSorter from '@/components/filterSorter/FilterSorter.vue'
import filterSorterDefaultFilters from '@/components/filterSorter/filterSorterDefaultFilters'
import filterSorterBackendAdapter from '@/components/filterSorter/filterSorterBackendAdapter'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import urlGenerate from '@/mixins/urlGenerate'
import NotificationsContainer from '@/components/notifications/NotificationsContainer.vue'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default {
    components: {
        'header-bar': HeaderBar,
        'filter-sorter': FilterSorter,
        'notifications-container': NotificationsContainer,
    },
    mixins: [urlGenerate, filterSorterDefaultFilters, filterSorterBackendAdapter],
    data() {
        return {
            axiosRandom: '',
            data: {},
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        notificationCount() { return this.$store.state.notifications.notificationCount },
        requestData() { return this.filterRequest },
        filters: {
            get() {
                return [
                    { type: 'custom-select', effect: 'filter-attribute', request: 'mode', attributes: ['All', 'Saved'], items: ['All', 'Saved'], default: 'All', title: 'Retrieve', forceShow: true  },
                ]
            },
        },
    },
    watch: {
        $route() { this.getData() },
        notificationCount(val) { if(val > 0) this.getData() }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            axios.post(this.notifications(this.$route.params.page), this.requestData)
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.data = response.data
                }
            }).catch(error => {
                this.data = {}
            }).then(() => {
                if(axiosRandom === this.axiosRandom) { this.$store.dispatch('loading/finishPageLoading') }
                if(this.$route.params.page == 1) this.$store.dispatch('notifications/getNotificationCount')
            })
        },
    }
}
</script>

<style scoped>
</style>