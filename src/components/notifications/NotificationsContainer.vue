<template>
    <div>
        <template v-if="loading">
            <notification-skeleton v-for="i in 12" :key="i"/>
        </template>
        <template v-if="!loading">
            <notification-row v-for="(notification, i) in data.data" :key="i" :data.sync="notification"/>
        </template>
        <pagination :tcData="data" :loading="loading"/>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import NotificationRow from '@/components/notifications/NotificationRow.vue'
import NotificationSkeleton from '@/components/notifications/NotificationSkeleton.vue'


export default {
    components: {
        'pagination': Pagination,
        'notification-row': NotificationRow,
        'notification-skeleton': NotificationSkeleton,
    },
    props: {
        data: Object
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
    }
}
</script>

<style>

</style>
