<template>
    <div class="card-footer p-0">
        <div class="row no-gutters">
            <template v-if="type === 'list'">
                <div class="col">
                    <custom-button type="watch-later" borderRadius="bottom-left" status="active" class="btn-sm btn-block border-0"></custom-button>
                </div>
                <div class="col-7">
                    <custom-button type="bookmark" borderRadius="none" status="active" class="btn-sm btn-block border-0"> Favorite</custom-button>
                </div>
            </template>
            <template v-else>
                <div class="col">
                    <custom-button type="watch-later" borderRadius="bottom-left" :status="watchLaterStatus" class="btn-sm btn-block border-0" @click="$store.dispatch('noModals/watchLater', { data: data, boundedTo: boundedTo, type: dataType })"/>
                </div>
                <div class="col-7">
                    <custom-button type="seen" borderRadius="none" :status="seenStatus" class="btn-sm btn-block border-0"
                        @click="$store.dispatch('modals/openVoteComment', { data: data, boundedTo: boundedTo, type: dataType })"> Seen</custom-button>
                </div>
            </template>
            <div class="col">
                <custom-button type="ban" borderRadius="bottom-right" :status="banStatus" class="btn-sm btn-block border-0" @click="$store.dispatch('noModals/ban', { data: data, boundedTo: boundedTo, type: dataType })"/>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'custom-button': CustomButton,
    },
    props: {
        type: {
            validator: value => ['list'].includes(value)
        },
        data: Object,
        dataType: String,
        boundedTo: Array
    },
    computed: {
        watchLaterStatus() { return this.data.later_id > 0 ? 'active' : '' },
        seenStatus() { return this.data.rate_code > 0 ? `active${this.data.rate_code}` : '' },
        banStatus() { return this.data.ban_id > 0 ? 'active' : '' }
    },
    methods: {
    }
}
</script>

<style scoped>
</style>