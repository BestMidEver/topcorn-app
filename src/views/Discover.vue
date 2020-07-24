<template>
    <div>
        <tabs :items="tabItems" :itemTypes="tabTypes" :activeType.sync="activeTab" class="mb-1"/>
        <router-view></router-view>
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
            tabItems: ['Movies', 'Series', 'People'/* , 'Users' */],
            tabTypes: ['movie', 'series', 'person'/* , 'user' */]
        }
    },
    computed: {
        activeTab: {
            get() { return this.$route.name.split('-')[1] },
            set(val) { this.$router.replace(`/discover/${val}/1`) }
        }
    },
    watch: {
    },
    /* created() {
        $('.body').scrollTop(0)
    }, */
    beforeCreate() {
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
