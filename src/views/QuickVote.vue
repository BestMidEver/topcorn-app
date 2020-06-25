<template>
    <static-modal-container>
        <template slot="content">
            <div class="modal-header p-0">
                <tabs :items="tabs" :itemTypes="tabTypes" :activeType.sync="activeType" class="w-100" :disabled="$store.state.loading.pageLoading"/>
            </div>
            <router-view></router-view>
        </template>
    </static-modal-container>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import StaticModalContainer from '@/components/modals/StaticModalContainer.vue'


export default {
    components: {
        'tabs': Tabs,
        'static-modal-container': StaticModalContainer,
    },
    data() {
        return {
            tabs: ['Movie', 'Series'],
            tabTypes: ['movies', 'series'],
            activeType: this.$route.name.split('-')[1],
        }
    },
    computed: {
        routeWatcher() { return `/quick-vote-${this.activeType}` },
    },
    watch: {
        '$route.name'(val) { this.activeType = val.split('-')[1] },
        routeWatcher(val) { if(val !== this.$route.path) this.$router.replace(val) },
    },
}
</script>

<style scoped>
</style>