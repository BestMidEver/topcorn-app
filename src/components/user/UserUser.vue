<template>
    <div>
        <user-user-section :data="data" :loading="$store.state.loading.pageLoading2" :isFullScreen="true" :filters="filters" :selectedFilters="selectedFilters" class="mt-1"/>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import filterSorterDefaultFilters from '@/components/filterSorter/filterSorterDefaultFilters'
import filterSorterBackendAdapter from '@/components/filterSorter/filterSorterBackendAdapter'
import UserUserSection from '@/components/user/UserUserSection.vue'


export default {
    components: {
        'user-user-section': UserUserSection,
    },
    mixins: [urlGenerate, filterSorterDefaultFilters, filterSorterBackendAdapter],
    props: {
        loading: Boolean
    },
    data() {
        return {
            type: 'user',
            axiosRandom: '',
            data: {}
        }
    },
    computed: {
        dataLength() { return this.data && this.data.data && this.data.data.length || 0 },
        filters: {
            get() {
                return [
                    { type: 'custom-select', effect: 'filter-attribute', request: 'mode', attributes: ['Friends', 'Following', 'Followers'], items: ['Mutual Follow', 'The Profile Owner Is Following', 'Followers'], default: 'The Profile Owner Is Following', title: 'User Interaction', forceShow: true },
                ]
            },
        },
        requestData() { return { id: this.$route.params.id, type: 'friends', ...this.filterRequest } },
    },
    watch: {
        $route() { this.getData() }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.$store.dispatch('loading/startPageLoading2')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/post', { url: this.userInteractionSetUrl(this.$route.params.page), data: this.requestData })
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.data = response.data
                }
            }).catch(error => {
                this.data = {}
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
            })
        }
    },
}
</script>

<style scoped>
</style>
