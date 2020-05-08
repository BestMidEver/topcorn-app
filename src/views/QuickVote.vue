<template>
    <div class="modal-container">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header p-0">
                    <tabs :items="tabs" :itemTypes="tabTypes" :activeType.sync="activeType" class="w-100"/>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'


export default {
    components: {
        'tabs': Tabs,
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
        routeWatcher(val) { if(val !== this.$route.path) this.$router.replace(val) },
    },
}
</script>

<style scoped>
.fs-container { background-size: 100% 100%!important; }
.modal-dialog-centered::before {
    height: unset;
}
</style>