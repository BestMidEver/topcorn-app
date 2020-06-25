<template>
    <tabs :items="tabItems" :itemTypes="tabTypes" :activeType.sync="activeType"/>
</template>

<script>
import Tabs from '@/components/Tabs.vue'


export default {
    components: {
        'tabs': Tabs,
    },
    props: {
        seasons: Array,
    },
    data() {
        return {
            tabItems: ['Profile', 'Password', 'Pagination', 'Notifications'],
            tabTypes: ['settings-profile', 'settings-password', 'settings-interface', 'settings-notifications']
        }
    },
    computed: {
        activeType: {
            get() {
                return this.$route.name
            },
            set(val) {
                this.$router.replace({ name: val })
            }
        }
    },
    watch: {
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
